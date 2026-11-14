
import httpx

from fastapi import HTTPException
from app.config import settings


def supabase_request(method: str, endpoint: str, **kwargs):
    if not settings.SUPABASE_URL or not settings.SUPABASE_PUBLISHABLE_KEY:
        raise HTTPException(
            status_code=500,
            detail="Supabase configuration is missing"
        )

    url = f"{settings.SUPABASE_URL.rstrip('/')}/auth/v1/{endpoint}"

    headers = {
        "apikey": settings.SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
        **kwargs.pop("headers", {})
    }

    try:
        response = httpx.request(
            method,
            url,
            headers=headers,
            timeout=15,
            **kwargs
        )
    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Could not connect to Supabase Authentication"
        )

    if response.is_error:
        try:
            error = response.json()
            message = (
                error.get("msg")
                or error.get("message")
                or error.get("error_description")
                or "Authentication request failed"
            )
        except ValueError:
            message = "Authentication request failed"

        status_code = response.status_code

        if status_code == 429:
            raise HTTPException(
                status_code=429,
                detail="Too many authentication requests. Try again later."
            )

        if status_code >= 500:
            raise HTTPException(
                status_code=503,
                detail="Supabase Authentication is temporarily unavailable"
            )

        raise HTTPException(
            status_code=status_code,
            detail=message
        )

    return response.json()


def register_user(email: str, password: str, username: str):
    return supabase_request(
        "POST",
        "signup",
        json={
            "email": email,
            "password": password,
            "data": {"username": username}
        }
    )


def login_user(email: str, password: str):
    return supabase_request(
        "POST",
        "token?grant_type=password",
        json={
            "email": email,
            "password": password
        }
    )



def verify_access_token(access_token: str):
    try:
        return supabase_request(
            "GET",
            "user",
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
    except HTTPException as error:
        if error.status_code in (400, 401, 403):
            raise HTTPException(
                status_code=401,
                detail="Invalid or expired access token"
            ) from error
        raise




def refresh_user_token(refresh_token: str):
    try:
        return supabase_request(
            "POST",
            "token?grant_type=refresh_token",
            json={
                "refresh_token": refresh_token
            }
        )
    except HTTPException as error:
        if error.status_code in (400, 401, 403):
            raise HTTPException(
                status_code=401,
                detail="Invalid or expired refresh token"
            ) from error
        raise

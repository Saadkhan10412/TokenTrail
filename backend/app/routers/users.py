
from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.schemas.user import RegisterRequest, LoginRequest, RefreshRequest
from app.services.auth import register_user, login_user, verify_access_token, refresh_user_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

security = HTTPBearer()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest):
    result = register_user(
        email=data.email,
        password=data.password,
        username=data.username
    )

    user = result.get("user") or result

    return {
        "message": (
            "Registration successful. Please verify your email."
            if not result.get("access_token")
            else "Registration successful."
        ),
        "user_id": user.get("id"),
        "email": user.get("email"),
        "session_created": bool(result.get("access_token"))
    }


@router.post("/login")
def login(data: LoginRequest):
    result = login_user(
        email=data.email,
        password=data.password
    )

    return {
        "message": "Login successful",
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"],
        "token_type": result["token_type"],
        "expires_in": result["expires_in"],
        "user": {
            "id": result["user"]["id"],
            "email": result["user"]["email"]
        }
    }


@router.get("/me")
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    user = verify_access_token(credentials.credentials)

    return {
        "id": user["id"],
        "email": user["email"]
    }


@router.post("/refresh")
def refresh_token(data: RefreshRequest):
    result = refresh_user_token(data.refresh_token)

    return {
        "message": "Token refreshed successfully",
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"],
        "token_type": result["token_type"],
        "expires_in": result["expires_in"],
        "user": {
            "id": result["user"]["id"],
            "email": result["user"]["email"]
        }
    }

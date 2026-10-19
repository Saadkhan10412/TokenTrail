# Contribution Workflow — TokenTrail

## Task workflow
For each implementation task:
1. State the intended outcome.
2. List the exact files to create or change.
3. Implement only the agreed scope.
4. Run the relevant checks.
5. Report what changed, commands run, results, and known limitations.
6. Update `docs/MEMORY.md` and relevant documentation when project status or decisions change.

## Branches and commits
Use small, descriptive commits. Suggested prefixes:
- `docs:` documentation
- `feat:` user-facing feature
- `fix:` bug fix
- `test:` tests
- `refactor:` behavior-preserving restructuring
- `chore:` tooling/configuration

Branching policy can be selected when collaboration needs are clearer.

## Pull request/review checklist
- [ ] Scope matches the agreed task.
- [ ] No secrets or private data are included.
- [ ] Tests/checks were run and results are reported honestly.
- [ ] Responsive and accessible behavior was considered for UI changes.
- [ ] API/database changes include validation and migrations where needed.
- [ ] ML changes include reproducible evaluation.
- [ ] Documentation reflects actual behavior.
- [ ] Paid/uncertain-cost dependencies were not added without approval.

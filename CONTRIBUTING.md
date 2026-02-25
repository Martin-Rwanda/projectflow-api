# Contributing to ProjectFlow API

## Branch Naming

| Type    | Pattern                     | Example                    |
| ------- | --------------------------- | -------------------------- |
| Feature | `feature/short-description` | `feature/auth-jwt`         |
| Bug fix | `fix/short-description`     | `fix/timer-race-condition` |
| Release | `release/version`           | `release/1.0.0`            |
| Hotfix  | `hotfix/short-description`  | `hotfix/token-expiry`      |

Always branch off `develop`. Never branch off `main` except for hotfixes.

## Commit Messages

Format: `type(scope): description`

- Type must be one of: feat, fix, docs, style, refactor, perf, test, chore, revert, ci, build
- Scope is the module name in kebab-case: auth, tasks, sprints, billing, etc.
- Description is lowercase, imperative tense, no period

**Good**: `feat(tasks): add subtask creation with parent validation`
**Bad**: `Added subtask feature`, `FEAT: Tasks`, `fix: Fixed the bug`

## Pull Request Process

1. Branch off `develop`
2. Keep PRs focused — one feature or fix per PR
3. Fill out the PR template completely
4. All CI checks must pass before requesting review
5. At least 1 approval required before merging to `develop`
6. Use squash merge into `develop` to keep history clean
7. Delete branch after merge

## Code Rules

- No business logic in controllers — controllers only validate input and call use cases
- No framework imports in domain layer — domain entities are pure TypeScript
- Every tenant query must be scoped with `org_id`
- Every new endpoint needs Swagger annotations
- Every new migration must be reversible (implement `down()`)

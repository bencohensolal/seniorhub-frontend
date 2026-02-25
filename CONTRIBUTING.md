# CONTRIBUTING.md

## Commit format

Use Commitizen-style messages:

- `type(name): summary`
- blank line
- short description paragraph

Allowed types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.

### Examples

```
feat(auth): add Google OAuth integration

Implement Google OAuth 2.0 authentication flow with token
refresh mechanism. Tokens are stored securely in httpOnly cookies.
```

```
fix(household): resolve invitation acceptance error

Fix bug where invitation acceptance was failing due to missing
token validation. Add proper error handling and user feedback.
```

## Mandatory checks before commit

1. Refresh AGENTS proof:

```bash
python3 scripts/agents_proof.py --refresh
```

2. Run quality checks:

```bash
npm run quality:check
```

3. Ensure documentation consistency:

```bash
python3 scripts/docs_guard.py
```

## Pre-commit hooks

Install and enable hooks:

```bash
python3 -m pip install --user pre-commit
pre-commit install --install-hooks --hook-type pre-commit --hook-type commit-msg
```

## Code style guidelines

### TypeScript

- Use explicit types, avoid `any`
- Prefer interfaces over type aliases for object shapes
- Use strict TypeScript configuration
- Document complex types and functions

### React

- Use functional components with hooks
- Keep components focused and small
- Extract custom hooks for reusable logic
- Use proper key props in lists
- Avoid prop drilling (use composition or context)

### File organization

- One component per file
- Co-locate tests with source files (`.test.tsx` or `.spec.tsx`)
- Group related files in feature directories
- Use barrel exports (`index.ts`) for public APIs

### Naming conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Types/Interfaces: PascalCase (e.g., `User`, `ApiResponse`)

## Testing guidelines

### Unit tests

- Test business logic and utilities thoroughly
- Test component behavior, not implementation details
- Use meaningful test descriptions
- Follow Arrange-Act-Assert pattern

### Component tests

- Test user interactions
- Test different states (loading, error, success)
- Test accessibility features
- Mock external dependencies

### Test coverage

- Aim for >80% coverage for critical paths
- 100% coverage not required, focus on important code
- Don't test trivial code (simple getters, constants)

## Pull request process

1. Create a feature branch from `main`
2. Make your changes with clear, focused commits
3. Ensure all tests pass and code quality checks pass
4. Update documentation if needed
5. Create a pull request with clear description
6. Request review from team members
7. Address review feedback
8. Squash and merge when approved

## Documentation policy

When architecture, workflows, or transversal directives change, update in the same work cycle:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `README.md`
- `CHANGELOG.md`
- `TODO.md`
- `IDEAS.md`

### Documentation standards

- Keep documentation up-to-date with code changes
- Use clear, simple language
- Include code examples where helpful
- Document WHY, not just WHAT
- Keep diagrams simple and up-to-date

## Accessibility checklist

Before merging features with UI changes, verify:

- [ ] Keyboard navigation works properly
- [ ] Focus indicators are visible
- [ ] ARIA labels are present where needed
- [ ] Color contrast meets WCAG AA standards
- [ ] Forms have proper labels and error messages
- [ ] Loading states are announced to screen readers
- [ ] Interactive elements are large enough (44x44px minimum)

## Code review guidelines

### For authors

- Keep PRs small and focused
- Provide context in PR description
- Link related issues
- Self-review before requesting review
- Respond to feedback constructively

### For reviewers

- Review promptly (within 24 hours)
- Be constructive and kind
- Ask questions rather than making demands
- Approve when changes meet quality standards
- Consider both code quality and user experience

## Getting help

- Check existing documentation first
- Ask in team chat for quick questions
- Create an issue for bugs or feature requests
- Reach out to maintainers for architectural questions

## Code of conduct

- Be respectful and professional
- Welcome newcomers and help them learn
- Focus on the code, not the person
- Assume good intentions
- Give credit where it's due

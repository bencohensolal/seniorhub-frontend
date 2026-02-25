# AGENTS.md

## Project objective

Build a modern, accessible web frontend for Senior Hub that provides an intuitive experience for seniors and their caregivers.

## General directives

- Prioritize ease of use and accessibility for seniors over technical complexity.
- Every UX decision must favor readability, immediate understanding, and reduced cognitive load.
- Avoid cluttered interfaces; prefer guided, explicit, and error-tolerant flows.
- Design for real accessibility needs: large touch/click targets, high contrast, clear typography, simple navigation.
- Use a senior engineering posture: maintain clean separation of concerns, high maintainability, and proactively refactor when it reduces complexity.
- Maintain a clear layered architecture (UI components, state management, API integration, business logic).
- Never place API calls directly in components; use dedicated service/hook layers.
- Centralize configuration (environment variables, API endpoints) in a single place.
- Never commit secrets or API keys.
- Ensure a testable and maintainable codebase (single responsibility, focused modules, explicit naming).
- Preserve privacy of personal and health-related data by default.

## Code conventions

- Technical identifiers must be in English.
- User-facing messages must be in English for now.
- Plan internationalization after MVP stabilization.
- Avoid unjustified `any`/implicit types.
- Handle `loading`, `success`, and `error` states explicitly.
- Display user errors in a clear and actionable way.
- Use semantic HTML for accessibility.
- Follow WCAG 2.1 AA standards minimum.

## Minimum quality before merge

- Lint/format checks green.
- Type checking passes.
- Unit tests for critical business logic.
- Manual verification of critical user flows (authentication, household management, key features).
- Up-to-date documentation when architecture/process/UX is impacted.

## Contribution workflow

- Keep commits small and focused.
- One main intention per commit (`feat`, `fix`, `refactor`, `test`, `docs`, `chore`).
- Commit message format is mandatory: `type(name): summary`, blank line, then commit description.
- Any new directive with transversal impact must be added to `AGENTS.md` in the same work cycle.
- `pre-commit` hook is mandatory.
- AGENTS proof is mandatory before commit:
  - `python3 scripts/agents_proof.py --refresh`

## Working with backend dependencies

- **Never commit directly to the backend repository**.
- When a backend API change is needed:
  - Document the requirement in the backend's `TODO.md` file
  - Use checkbox format: `- [ ] Description of needed feature/endpoint`
  - Include clear specification (endpoint, request/response format, behavior)
  - Inform the user that backend update is required
  - Implement temporary workaround in frontend if possible
- Keep frontend and backend repositories synchronized through documented contracts.

## Cross-project coordination

- If a task requires changes in the mobile app, document it in the app's `TODO.md` file.
- When frontend changes impact other components, add corresponding tasks to their TODOs.
- Keep project TODOs in sync for coordinated feature delivery.

## Mandatory documentation maintenance

These files are the reference baseline and must stay consistent:

- `README.md`
- `AGENTS.md`
- `ARCHITECTURE.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `TODO.md`
- `IDEAS.md`

## Architecture maintenance

`ARCHITECTURE.md` is the technical source of truth.
Any structural change must be reflected there in the same change.

## Accessibility requirements

- All interactive elements must be keyboard accessible.
- Color is never the only means of conveying information.
- Text contrast ratios meet WCAG AA standards (4.5:1 for normal text).
- Forms have clear labels and error messages.
- Loading and error states are announced to screen readers.
- Touch/click targets are at least 44x44px.

## API and data directives

- All API calls must include proper error handling.
- Authentication tokens must be stored securely.
- Sensitive data must never be logged.
- API responses must be validated before use.
- Keep API service layer separate from UI components.

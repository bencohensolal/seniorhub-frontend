# TODO.md

Short-term backlog for `seniorhub-frontend`.

## Process

- Any structural evolution (architecture, security, conventions, stack) must be reflected in `README.md`, `AGENTS.md`, and `ARCHITECTURE.md` in the same work cycle.
- Any started task must either be completed or documented here with a clear next step.

## High priority

- [ ] Initialize project with Vite + React + TypeScript
- [ ] Set up basic project structure (directories, config files)
- [ ] Configure ESLint and Prettier
- [ ] Set up Vitest for testing
- [ ] Create base API client with error handling
- [ ] Implement authentication flow and token management
- [ ] Create main layout components (Header, Navigation, Footer)
- [ ] Set up React Router for navigation
- [ ] Configure TanStack Query for data fetching
- [ ] Create environment configuration system

## Authentication & User Management

- [ ] Implement login page
- [ ] Implement logout functionality
- [ ] Add session persistence
- [ ] Add token refresh mechanism
- [ ] Create protected route wrapper
- [ ] Add authentication context provider

## Household Management

- [ ] Create household list page
- [ ] Create household detail page
- [ ] Implement household creation form
- [ ] Implement invitation sending flow
- [ ] Implement invitation acceptance flow
- [ ] Create member management interface
- [ ] Add role management UI

## UI Components

- [ ] Create design system with tokens (colors, spacing, typography)
- [ ] Build Button component with variants
- [ ] Build Card component
- [ ] Build Form components (Input, Select, Checkbox, etc.)
- [ ] Build Modal/Dialog component
- [ ] Build Toast notification system
- [ ] Build Loading spinner/skeleton components
- [ ] Build Error boundary component

## Accessibility

- [ ] Implement keyboard navigation
- [ ] Add ARIA labels to all interactive elements
- [ ] Create focus management utilities
- [ ] Add skip-to-content link
- [ ] Implement high contrast mode
- [ ] Add font size adjustment feature
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)

## Testing

- [ ] Set up testing infrastructure
- [ ] Write tests for API client
- [ ] Write tests for authentication flow
- [ ] Write tests for key components
- [ ] Set up CI pipeline for automated testing

## Developer Experience

- [ ] Add Git hooks (pre-commit, commit-msg)
- [ ] Create development documentation
- [ ] Add code snippets and templates
- [ ] Set up debugging configuration

## Next Phase

- [ ] Implement medication reminders feature
- [ ] Implement appointments feature
- [ ] Implement tasks/activities feature
- [ ] Add real-time notifications
- [ ] Implement PWA capabilities
- [ ] Add offline support
- [ ] Implement internationalization (i18n)
- [ ] Add analytics and monitoring

## Technical debt

- [ ] None for now (initial project setup)

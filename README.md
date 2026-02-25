# SeniorHub Frontend

Modern web frontend for Senior Hub, designed to make daily life easier for seniors with a simple, accessible, and reassuring user experience.

## Product vision

SeniorHub brings essential everyday needs for seniors and caregivers into a unified web platform:

- useful reminders (medication, appointments, tasks)
- quick access to important information
- guided interactions with clear, simple flows
- security and privacy by design
- accessible on any device with a browser

## Current status

The project is currently in the setup and foundation phase.

## Selected stack

- React + TypeScript
- Vite for build and development
- Modern component architecture
- Responsive design for tablets and desktops
- Progressive Web App (PWA) capabilities

## Project structure

- `README.md`: project onboarding
- `AGENTS.md`: cross-cutting contribution rules
- `ARCHITECTURE.md`: technical source of truth
- `CONTRIBUTING.md`: workflow, commit and hook expectations
- `CHANGELOG.md`: release/change history
- `TODO.md`: short-term actionable backlog
- `IDEAS.md`: product ideas / medium-long term

## Quick start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Install contribution hooks

```bash
python3 -m pip install --user pre-commit
pre-commit install --install-hooks --hook-type pre-commit --hook-type commit-msg
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run quality:check
```

## Commit requirements

- Commit format: `type(name): summary`, blank line, description
- Allowed types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Mandatory before commit:

```bash
python3 scripts/agents_proof.py --refresh
```

## Environment configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the required environment variables:

- `VITE_API_URL`: Backend API base URL
- `VITE_APP_ENV`: Environment (development, staging, production)

## API Integration

The frontend communicates with the SeniorHub backend API. Ensure the backend is running and accessible.

Default development API endpoint: `http://localhost:4000`

## Documentation map

- `README.md`: project overview and setup
- `AGENTS.md`: contribution guidelines and principles
- `ARCHITECTURE.md`: technical architecture and decisions
- `CONTRIBUTING.md`: workflow and commit conventions
- `CHANGELOG.md`: version history
- `TODO.md`: current priorities and backlog
- `IDEAS.md`: future features and improvements

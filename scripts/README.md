# Scripts

This directory contains utility scripts for maintaining code quality and enforcing project standards.

## Available scripts

### agents_proof.py

Ensures contributors have read and loaded `AGENTS.md` into context.

**Usage:**
```bash
# Generate/refresh AGENTS proof (run before committing)
python3 scripts/agents_proof.py --refresh

# Check if AGENTS proof exists (used by pre-commit hook)
python3 scripts/agents_proof.py --check
```

**What it does:**
- Creates a `.agents-proof` file as evidence of AGENTS awareness
- Required by pre-commit hooks
- Must be regenerated before each commit

### docs_guard.py

Verifies that all required documentation files exist.

**Usage:**
```bash
python3 scripts/docs_guard.py
```

**What it checks:**
- README.md
- AGENTS.md
- ARCHITECTURE.md
- CONTRIBUTING.md
- CHANGELOG.md
- TODO.md
- IDEAS.md

### check_commit_message.py

Validates commit message format.

**Usage:**
```bash
# Automatically called by commit-msg hook
python3 scripts/check_commit_message.py <commit_msg_file>
```

**Format required:**
```
type(scope): summary

Optional longer description
```

**Allowed types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `test`: Test changes
- `docs`: Documentation changes
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add Google OAuth integration
fix(household): resolve invitation error
docs(readme): update setup instructions
```

## Integration with pre-commit

All scripts are automatically run by pre-commit hooks:

1. **Before commit:**
   - `agents_proof.py --check`
   - `docs_guard.py`

2. **On commit message:**
   - `check_commit_message.py`

## Setup

Make scripts executable:
```bash
chmod +x scripts/*.py
```

Install pre-commit hooks:
```bash
pre-commit install --install-hooks --hook-type pre-commit --hook-type commit-msg
```

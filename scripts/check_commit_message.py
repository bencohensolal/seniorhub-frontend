#!/usr/bin/env python3
"""
Commit message format checker.
Ensures commits follow the format: type(scope): summary
"""

import sys
import re
from pathlib import Path

ALLOWED_TYPES = ['feat', 'fix', 'refactor', 'test', 'docs', 'chore']

def check_commit_message(commit_msg_file):
    """Check if commit message follows the required format."""
    with open(commit_msg_file, 'r') as f:
        commit_msg = f.read().strip()
    
    # Skip merge commits
    if commit_msg.startswith('Merge'):
        print("[COMMIT MSG] ✓ Merge commit, skipping format check")
        return 0
    
    # Expected format: type(scope): summary
    pattern = r'^(feat|fix|refactor|test|docs|chore)\([a-z0-9-]+\): .+$'
    
    if not re.match(pattern, commit_msg.split('\n')[0]):
        print("[COMMIT MSG] ERROR: Invalid commit message format")
        print(f"\nYour message:\n  {commit_msg.split(chr(10))[0]}")
        print("\nRequired format:")
        print("  type(scope): summary")
        print("\nAllowed types:", ', '.join(ALLOWED_TYPES))
        print("\nExamples:")
        print("  feat(auth): add Google OAuth integration")
        print("  fix(household): resolve invitation error")
        print("  docs(readme): update setup instructions")
        sys.exit(1)
    
    print("[COMMIT MSG] ✓ Commit message format valid")
    return 0

def main():
    if len(sys.argv) < 2:
        print("[COMMIT MSG] ERROR: No commit message file provided")
        sys.exit(1)
    
    commit_msg_file = sys.argv[1]
    return check_commit_message(commit_msg_file)

if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""
Documentation consistency guard - ensures core documentation files exist.
"""

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent

REQUIRED_DOCS = [
    "README.md",
    "AGENTS.md",
    "ARCHITECTURE.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "TODO.md",
    "IDEAS.md",
]

def check_documentation():
    """Check if all required documentation files exist."""
    missing_docs = []
    
    for doc in REQUIRED_DOCS:
        doc_path = PROJECT_ROOT / doc
        if not doc_path.exists():
            missing_docs.append(doc)
    
    if missing_docs:
        print("[DOCS GUARD] ERROR: Missing required documentation files:")
        for doc in missing_docs:
            print(f"  - {doc}")
        print("\n[DOCS GUARD] Please ensure all core documentation exists.")
        print("[DOCS GUARD] See CONTRIBUTING.md for documentation requirements.")
        sys.exit(1)
    
    print("[DOCS GUARD] ✓ All required documentation files present")
    return 0

def main():
    return check_documentation()

if __name__ == "__main__":
    sys.exit(main())

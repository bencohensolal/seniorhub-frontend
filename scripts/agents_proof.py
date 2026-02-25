#!/usr/bin/env python3
"""
AGENTS proof system - ensures contributors have loaded AGENTS.md into context.
This creates a .agents-proof file as evidence of AGENTS awareness.
"""

import sys
import os
import argparse
from pathlib import Path

# Path to AGENTS.md and proof file
PROJECT_ROOT = Path(__file__).parent.parent
AGENTS_PATH = PROJECT_ROOT / "AGENTS.md"
PROOF_PATH = PROJECT_ROOT / ".agents-proof"

def generate_proof():
    """Generate AGENTS proof file."""
    if not AGENTS_PATH.exists():
        print(f"[AGENTS PROOF] ERROR: AGENTS.md not found at {AGENTS_PATH}")
        sys.exit(2)
    
    # Create proof file with timestamp
    from datetime import datetime
    timestamp = datetime.now().isoformat()
    
    proof_content = f"""# AGENTS PROOF
# This file certifies that AGENTS.md has been loaded and acknowledged.
# Generated: {timestamp}
# 
# This file is checked by pre-commit hooks to ensure all contributors
# are aware of the project's contribution guidelines and principles.
"""
    
    with open(PROOF_PATH, 'w') as f:
        f.write(proof_content)
    
    print(f"[AGENTS PROOF] ✓ Proof file generated: {PROOF_PATH}")
    print("[AGENTS PROOF] ✓ You have acknowledged AGENTS.md")
    return 0

def check_proof():
    """Check if AGENTS proof exists and is valid."""
    if not AGENTS_PATH.exists():
        print(f"[AGENTS PROOF] ERROR: AGENTS.md not found at {AGENTS_PATH}")
        print("[AGENTS PROOF] Please ensure AGENTS.md exists in the project root.")
        sys.exit(2)
    
    if not PROOF_PATH.exists():
        print("[AGENTS PROOF] ERROR: No AGENTS proof found!")
        print("[AGENTS PROOF] Run: python3 scripts/agents_proof.py --refresh")
        print("[AGENTS PROOF] This ensures you have read and loaded AGENTS.md")
        sys.exit(1)
    
    print("[AGENTS PROOF] ✓ AGENTS proof found")
    print("[AGENTS PROOF] ✓ Commit allowed")
    return 0

def main():
    parser = argparse.ArgumentParser(
        description="AGENTS proof system - ensure AGENTS.md awareness"
    )
    parser.add_argument(
        '--refresh',
        action='store_true',
        help='Generate/refresh AGENTS proof file'
    )
    parser.add_argument(
        '--check',
        action='store_true',
        help='Check if AGENTS proof exists (used by pre-commit hook)'
    )
    
    args = parser.parse_args()
    
    if args.refresh:
        return generate_proof()
    elif args.check:
        return check_proof()
    else:
        # Default: show usage
        parser.print_help()
        print("\nCommon usage:")
        print("  Before commit: python3 scripts/agents_proof.py --refresh")
        print("  Hook check:    python3 scripts/agents_proof.py --check")
        return 0

if __name__ == "__main__":
    sys.exit(main())

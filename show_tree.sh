#!/bin/bash

# Navigate to AiCare repository root
cd "$(dirname "$0")"

# Define directories and files to exclude
EXCLUDE_DIRS=".git|node_modules|dist|coverage|.next|.turbo|.vscode|.DS_Store|package-lock.json|yarn.lock|pnpm-lock.yaml"

# Check if 'tree' command exists
if command -v tree &> /dev/null; then
    echo "Generating directory tree for AiCare (application files only)..."
    tree -a -I "$EXCLUDE_DIRS"
else
    # Fallback using 'find'
    echo "tree command not found. Using find instead..."
    find . -type d \( -name ".git" -o -name "node_modules" -o -name "dist" -o -name "coverage" -o -name ".next" -o -name ".turbo" -o -name ".vscode" \) -prune -o -print | grep -Ev "$EXCLUDE_DIRS"
fi

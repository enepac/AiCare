#!/bin/bash

# Define project root
PROJECT_ROOT="/workspaces/aicare/aicare-app"

# Define output file
OUTPUT_FILE="aicare_code_structure.md"

# Navigate to AiCare repository root
cd "$PROJECT_ROOT" || exit

# Define directories and files to exclude
EXCLUDE_DIRS=".git|node_modules|dist|coverage|.next|.turbo|.vscode|.DS_Store|package-lock.json|yarn.lock|pnpm-lock.yaml"

# Generate tree-style directory structure
echo "## AiCare Codebase Directory Structure" > "$OUTPUT_FILE"
echo '```' >> "$OUTPUT_FILE"

# Display the root directory as 'aicare-app'
echo "aicare-app" >> "$OUTPUT_FILE"

# Check if 'tree' command exists
if command -v tree &> /dev/null; then
    echo "Generating directory tree for AiCare (application files only)..."
    tree -a -I "$EXCLUDE_DIRS" --noreport | sed 's/^/    /' >> "$OUTPUT_FILE"
else
    # Fallback using 'find'
    echo "tree command not found. Using find instead..."
    find . -type d \( -name ".git" -o -name "node_modules" -o -name "dist" -o -name "coverage" -o -name ".next" -o -name ".turbo" -o -name ".vscode" \) -prune -o -print | grep -Ev "$EXCLUDE_DIRS" | sed 's|^\./|    |' >> "$OUTPUT_FILE"
fi

echo '```' >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Append full paths and contents of files
echo "## File Contents" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Define important directories and file extensions (development-critical only)
INCLUDE_DIRS="src public config pages components hooks utils styles"
EXTENSIONS="ts tsx js jsx json css scss html md yml yaml sh"

# Extract file paths and read contents efficiently
git ls-files | grep -E "($(echo $INCLUDE_DIRS | sed 's/ /|/g'))/.*\.($(echo $EXTENSIONS | sed 's/ /|/g'))$" | sort | while IFS= read -r file; do
    echo "### $PROJECT_ROOT/$file" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "Code structure saved in $OUTPUT_FILE"

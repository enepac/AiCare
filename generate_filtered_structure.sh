#!/bin/bash

# Set project root directory
PROJECT_ROOT="/workspaces/aicare/aicare-app"
OUTPUT_FILE="$PROJECT_ROOT/filtered_structure.txt"
GITIGNORE_FILE="$PROJECT_ROOT/.gitignore"

# Ensure we are in the correct project directory
cd "$PROJECT_ROOT" || { echo "Error: Could not navigate to project root"; exit 1; }

# Check if .gitignore exists
if [[ ! -f "$GITIGNORE_FILE" ]]; then
    echo "⚠ Warning: .gitignore file not found. Proceeding without exclusions."
    IGNORE_PATTERNS=()
else
    echo "📂 Processing .gitignore exclusions..."
    IGNORE_PATTERNS=()
    
    while IFS= read -r line; do
        # Ignore comments and empty lines
        [[ -z "$line" || "$line" =~ ^# ]] && continue
        # Convert .gitignore patterns into find exclusion syntax
        IGNORE_PATTERNS+=("-not" "-path" "./$line")
    done < "$GITIGNORE_FILE"
fi

# Find all relevant files while ignoring `.gitignore` patterns
echo "🔍 Scanning project directory while excluding .gitignore files..."
INCLUDED_FILES=$(find . -type f "${IGNORE_PATTERNS[@]}" 2>/dev/null)

# Check if any files were found
if [[ -z "$INCLUDED_FILES" ]]; then
    echo "⚠ No files found after applying .gitignore filters."
    exit 1
fi

# Save filtered structure to output file
echo "✅ Writing filtered directory structure to: $OUTPUT_FILE"
rm -f "$OUTPUT_FILE"

# Generate structured output
{
    echo "🔹 Filtered Directory Structure of AiCare"
    echo "========================================="
    while IFS= read -r file; do
        [[ -f "$file" ]] || continue  # Skip invalid paths
        ABS_PATH=$(realpath "$file")
        echo "📂 File: $ABS_PATH"
        echo "-----------------------------------------"
        cat "$file"
        echo ""
    done <<< "$INCLUDED_FILES"
} >> "$OUTPUT_FILE"

echo "✅ Completed! Open the file: $OUTPUT_FILE"

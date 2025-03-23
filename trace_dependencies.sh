#!/bin/bash

# Check if a file path is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <file-path>"
    exit 1
fi

TARGET_FILE=$(realpath -- "$1")
PROJECT_ROOT="/workspaces/aicare/aicare-app"
SRC_DIR="$PROJECT_ROOT/src"
FILE_LIST="$PROJECT_ROOT/dependency_files.txt"
TS_CONFIG="$PROJECT_ROOT/tsconfig.json"

# Ensure the file exists
if [ ! -f "$TARGET_FILE" ]; then
    echo "Error: File '$TARGET_FILE' does not exist."
    exit 1
fi

echo "🔍 Analyzing dependencies for: $TARGET_FILE"
echo "-----------------------------------------"

rm -f "$FILE_LIST"
touch "$FILE_LIST"

# Function to resolve alias imports (e.g., @/components)
resolve_alias() {
    local import_path="$1"
    
    # Check for TypeScript path alias resolution
    if [[ -f "$TS_CONFIG" ]]; then
        ALIAS_BASE=$(jq -r '.compilerOptions.baseUrl' "$TS_CONFIG")
        IMPORT_PATH_CLEANED=$(echo "$import_path" | sed 's/@\///' | sed 's/~\///')
        ABSOLUTE_PATH="$PROJECT_ROOT/$ALIAS_BASE/$IMPORT_PATH_CLEANED.tsx"
        
        if [[ -f "$ABSOLUTE_PATH" ]]; then
            echo "$ABSOLUTE_PATH"
            return
        fi
    fi

    # Fallback to normal relative path checking
    echo "$import_path"
}

# Extract imports, ignoring external node_modules dependencies
echo "📂 Searching for Internal Dependencies..."
IMPORTS=$(grep -E 'import|require' "$TARGET_FILE" | sed -E 's/import|from|require//g' | tr -d '";' | awk '{print $1}')

for import in $IMPORTS; do
    # Ignore external packages (modules without `/` or `.` in their path)
    if [[ "$import" != *"/"* && "$import" != *"."* ]]; then
        echo "❌ Ignored external module: $import"
        continue
    fi

    # Try to resolve alias-based imports
    RESOLVED_IMPORT=$(resolve_alias "$import")

    # Convert to absolute path if needed
    FILE_PATH=$(find "$SRC_DIR" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.tsx" \) | grep -E "/$RESOLVED_IMPORT(\.js|\.ts|\.tsx)?$" | head -n 1)

    if [[ -n "$FILE_PATH" ]]; then
        echo "✔ Found: $FILE_PATH"
        echo "$FILE_PATH" >> "$FILE_LIST"
    else
        echo "⚠ Not Found in project: $import"
    fi
done

echo "-----------------------------------------"
echo "🔎 Searching for files that reference $TARGET_FILE..."

# Find references by looking for files that import/require the target file
DEPENDENT_FILES=$(grep -rIl --exclude-dir=node_modules --exclude=package-lock.json "$(basename "$TARGET_FILE" .ts)" "$SRC_DIR")

for dep in $DEPENDENT_FILES; do
    echo "✔ Found reference: $dep"
    echo "$dep" >> "$FILE_LIST"
done

# Remove duplicates
sort -u "$FILE_LIST" -o "$FILE_LIST"

echo "-----------------------------------------"
echo "📜 Related Files:"
if [[ -s "$FILE_LIST" ]]; then
    cat "$FILE_LIST"
else
    echo "⚠ No related files found."
fi

echo "-----------------------------------------"
echo "📖 Displaying full source code of related files..."
echo "-----------------------------------------"

# Display source code of all related files
while IFS= read -r file; do
    echo "-----------------------------------------"
    echo "📂 File: $file"
    echo "-----------------------------------------"
    cat "$file"
    echo ""
done < "$FILE_LIST"

# Cleanup
rm "$FILE_LIST"

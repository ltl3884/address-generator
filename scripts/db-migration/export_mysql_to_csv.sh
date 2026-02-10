#!/bin/bash

# Configuration - Default values can be overridden by environment variables
CONTAINER_NAME="${DB_CONTAINER_NAME:-mysql_container}"
DB_USER="${DB_USER:-root}"
DB_PASS="${DB_PASSWORD:-password}" # Suggest changing this or passing via env
DB_NAME="${DB_NAME:-address_generator}"
OUTPUT_FILE="${OUTPUT_FILE:-address_info.csv}"

# Check if docker is available
if ! command -v docker &> /dev/null; then
    echo "Error: docker command not found."
    exit 1
fi

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Error: Container '${CONTAINER_NAME}' is not running."
    echo "Available containers:"
    docker ps --format '{{.Names}}'
    exit 1
fi

echo "Exporting data from table 'address_info' in database '${DB_NAME}'..."

# Run the export command
# 1. docker exec to run mysql
# 2. mysql -B (batch/tab-separated)
# 3. sed to convert TSV to CSV:
#    - s/"/""/g   : Escape existing double quotes by doubling them
#    - s/\t/","/g : Replace tabs with "," (closing quote, comma, opening quote)
#    - s/^/"/     : Add opening quote to start of line
#    - s/$/"/     : Add closing quote to end of line
docker exec -i "$CONTAINER_NAME" mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" -B -e "SELECT * FROM address_info;" | \
sed 's/"/""/g;s/\t/","/g;s/^/"/;s/$/"/' > "$OUTPUT_FILE"

# Check if the file was created and has content
if [ -s "$OUTPUT_FILE" ]; then
    echo "Export successful! Data saved to: $OUTPUT_FILE"
    echo "Rows exported: $(wc -l < "$OUTPUT_FILE")"
else
    echo "Error: Export failed or produced empty file."
    exit 1
fi

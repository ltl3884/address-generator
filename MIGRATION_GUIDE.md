# Migration Guide: MySQL to Supabase

This guide outlines the process for migrating your `address_info` data from a local MySQL Docker container to Supabase (PostgreSQL).

## Prerequisites
- Access to the Ubuntu server running the MySQL container.
- `docker` installed and running on the server.
- Database credentials for the MySQL container.
- A Supabase project with the `AddressInfo` table created (via Prisma migration).

## Phase 1: Export Data (On Ubuntu Server)

1.  **Transfer the script**:
    Copy `scripts/db-migration/export_mysql_to_csv.sh` to your server.
    ```bash
    scp scripts/db-migration/export_mysql_to_csv.sh user@your-server:/path/to/destination/
    ```

2.  **Make it executable**:
    SSH into your server and run:
    ```bash
    chmod +x export_mysql_to_csv.sh
    ```

3.  **Run the export**:
    Set environment variables for your database configuration if they differ from defaults.
    
    **Default values**:
    - Container: `mysql_container`
    - User: `root`
    - Password: `password`
    - DB Name: `address_generator`

    **Example command**:
    ```bash
    export DB_CONTAINER_NAME="your_mysql_container_name"
    export DB_PASSWORD="your_secure_password"
    ./export_mysql_to_csv.sh
    ```

    This will create a file named `address_info.csv` in the current directory.

## Phase 2: Transfer CSV to Local Machine

Download the exported CSV file to your local computer (where you access the Supabase dashboard).

```bash
scp user@your-server:/path/to/destination/address_info.csv ./
```

## Phase 3: Import to Supabase

1.  **Open Supabase Dashboard**: Go to your project's dashboard.
2.  **Navigate to Table Editor**: Select the `address_info` table.
3.  **Import Data**:
    - Click **"Insert"** -> **"Import Data from CSV"**.
    - Upload the `address_info.csv` file.
4.  **Verify Column Mapping**:
    - Ensure columns like `full_name`, `zip_code` match correctly.
    - **Note on NULLs**: The export script quotes all values (e.g., `"NULL"`). Supabase import usually handles this, but verify that empty fields are imported as `NULL` and not the string `"NULL"`.
    - **Note on IDs**: If you are importing existing IDs, ensure "Import Identity Columns" is checked or handled correctly.
5.  **Start Import**.

### Post-Import Checklist

1.  **Cleanup "NULL" Strings** (Important!):
    The export process might treat SQL `NULL` values as the literal string `"NULL"`. Run this SQL to fix them:
    ```sql
    UPDATE address_info SET telephone = NULL WHERE telephone = 'NULL';
    UPDATE address_info SET city = NULL WHERE city = 'NULL';
    UPDATE address_info SET zip_code = NULL WHERE zip_code = 'NULL';
    UPDATE address_info SET state = NULL WHERE state = 'NULL';
    UPDATE address_info SET state_full = NULL WHERE state_full = 'NULL';
    UPDATE address_info SET source_url = NULL WHERE source_url = 'NULL';
    UPDATE address_info SET country = NULL WHERE country = 'NULL';
    UPDATE address_info SET latitude = NULL WHERE latitude = 'NULL';
    UPDATE address_info SET longitude = NULL WHERE longitude = 'NULL';
    ```

2.  **Update Sequence**: After importing, you must update the Primary Key sequence to avoid conflicts with new inserts.
    Run this SQL in the Supabase SQL Editor:
    ```sql
    SELECT setval('address_info_id_seq', (SELECT MAX(id) FROM address_info));
    ```

3.  **Verify Data**: Check a few records to ensure characters (especially non-ASCII if any) and newlines are preserved correctly.

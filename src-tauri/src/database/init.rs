use rusqlite::{Connection, Result};
use std::path::Path;

// connect app database, which contains core infos
pub fn connect_app_database() -> Result<Connection> {
    let conn = Connection::open("app.db")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Database (
            id integer primary key, 
            path text, 
            name text
        )",
        [],
    )?;

    Ok(conn)
}

// connect to data db, which contains data.
pub fn connect_data_db<P: AsRef<Path>>(database_path: P) -> Result<Connection> {
    let conn = Connection::open(database_path)?;
    conn.db_config(rusqlite::config::DbConfig::SQLITE_DBCONFIG_ENABLE_FTS3_TOKENIZER)?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Doctor (
            name text, 
            qualification text 
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Patient (
            id integer primary key,
            pid text,
            created_at text,
            updated_at text,
            bio_data text,
            records text
        )",
        [],
    )?;

    Ok(conn)
}

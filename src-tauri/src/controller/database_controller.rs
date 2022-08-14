use crate::database::init_app_db;
use crate::database::Database;

#[tauri::command]
pub fn read_databases() -> Result<Vec<Database::DatabaseType>, String> {
    let db = init_app_db()?;
    let databases = Database::read_all(&db)?;
    Ok(databases)
}

#[tauri::command]
pub fn add_database(path: String, name: String) -> Result<(), String> {
    let db = init_app_db()?;
    Database::create(&db, path, name)?;
    Ok(())
}

#[tauri::command]
pub fn update_database(id: i32, path: String, name: String) -> Result<(), String> {
    let db = init_app_db()?;
    Database::update(&db, id, path, name)?;
    Ok(())
}

#[tauri::command]
pub fn delete_database(id: i32, path: String, delete_file: bool) -> Result<(), String> {
    let db = init_app_db()?;

    // deleting the .db file.
    if delete_file {
        match std::fs::remove_file(&path) {
            Ok(_) => {}
            Err(_) => return Err(String::from("Failed to delete database file")),
        }
    }

    Database::delete(&db, id, path)?;
    Ok(())
}

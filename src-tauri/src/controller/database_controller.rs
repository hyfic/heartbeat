use crate::database::database_model;
use crate::database::init_app_db;

#[tauri::command]
pub fn read_databases() -> Result<Vec<database_model::DatabaseType>, String> {
    let db = init_app_db()?;
    let databases = database_model::read_all(&db)?;
    Ok(databases)
}

#[tauri::command]
pub fn add_database(path: String, name: String) -> Result<(), String> {
    let db = init_app_db()?;
    database_model::create(&db, path, name)?;
    Ok(())
}

#[tauri::command]
pub fn update_database(id: i32, path: String, name: String) -> Result<(), String> {
    let db = init_app_db()?;
    database_model::update(&db, id, path, name)?;
    Ok(())
}

#[tauri::command]
pub fn delete_database(id: i32, path: String, delete_file: bool) -> Result<(), String> {
    let db = init_app_db()?;

    // deleting the .db file.
    if delete_file {
        match std::fs::remove_file(path) {
            Ok(_) => {}
            Err(_) => return Err(String::from("Failed to delete database file")),
        }
    }

    database_model::delete(&db, id)?;
    Ok(())
}

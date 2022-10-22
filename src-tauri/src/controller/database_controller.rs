// controllers for frontend to invoke backend

use crate::database::database_model;
use crate::database::init_app_db;

#[tauri::command]
pub fn read_databases() -> Result<Vec<database_model::DatabaseType>, String> {
    let db = init_app_db()?;
    database_model::read_all(&db)
}

#[tauri::command]
pub fn add_database(path: String, name: String) -> Result<i64, String> {
    let db = init_app_db()?;
    database_model::create(&db, path, name)
}

#[tauri::command]
pub fn update_database(id: i32, name: String) -> Result<(), String> {
    let db = init_app_db()?;
    database_model::update(&db, id, name)
}

#[tauri::command]
pub fn delete_database(id: i32, path: String, delete_file: bool) -> Result<(), String> {
    let db = init_app_db()?;

    // deleting the .db file from storage.
    if delete_file {
        match std::fs::remove_file(path) {
            Ok(_) => {}
            Err(err) => match err.kind() {
                std::io::ErrorKind::NotFound => {}
                _ => return Err(String::from("Failed to delete database file")),
            },
        }
    }

    // deleting row from app database
    database_model::delete(&db, id)
}

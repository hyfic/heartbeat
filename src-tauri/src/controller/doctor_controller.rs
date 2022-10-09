// doctor controller
// to change doctor data, which is in schema for every data db

use crate::database::doctor_model;
use crate::database::init_data_db;

#[tauri::command]
pub fn read_doctor(database_path: String) -> Result<Vec<doctor_model::DoctorType>, String> {
    let db = init_data_db(database_path)?;
    let doctor = doctor_model::read(&db)?;
    Ok(doctor)
}

#[tauri::command]
pub fn add_doctor(
    database_path: String,
    name: String,
    qualification: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    doctor_model::create(&db, name, qualification)?;
    Ok(())
}

#[tauri::command]
pub fn update_doctor(
    database_path: String,
    name: String,
    qualification: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    doctor_model::update(&db, name, qualification)?;
    Ok(())
}

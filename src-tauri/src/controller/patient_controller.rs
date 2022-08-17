use crate::database::init_data_db;
use crate::database::patient_model;

#[tauri::command]
pub fn create_patient(database_path: String, data: String) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::create(&db, data)?;
    Ok(())
}

#[tauri::command]
pub fn read_patients(database_path: String) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::read_all(&db)?;
    Ok(patients)
}

#[tauri::command]
pub fn read_patient(database_path: String, id: i32) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::read_one(&db, id)?;
    Ok(patients)
}

#[tauri::command]
pub fn update_patient(database_path: String, id: i32, data: String) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::update(&db, id, data)?;
    Ok(())
}

#[tauri::command]
pub fn delete_patient(database_path: String, id: i32) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::delete(&db, id)?;
    Ok(())
}
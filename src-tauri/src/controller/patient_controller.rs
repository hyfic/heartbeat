use crate::database::init_data_db;
use crate::database::patient_model;

#[tauri::command]
pub fn create_patient(
    database_path: String,
    pid: String,
    created_at: String,
    updated_at: String,
    bio_data: String,
    records: String,
) -> Result<i64, String> {
    let db = init_data_db(database_path)?;
    let patient_id = patient_model::create(&db, pid, created_at, updated_at, bio_data, records)?;
    Ok(patient_id)
}

#[tauri::command]
pub fn read_patients(database_path: String, page: i32) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::read_all(&db, page)?;
    Ok(patients)
}

#[tauri::command]
pub fn read_patient(
    database_path: String,
    id: i32,
) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::read_one(&db, id)?;
    Ok(patients)
}

#[tauri::command]
pub fn search_patient(database_path: String, search_query: String, page: i32) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::search_patient(&db, search_query, page)?;
    Ok(patients)
}

#[tauri::command]
pub fn update_patient(
    database_path: String,
    id: i32,
    updated_at: String,
    bio_data: String,
    records: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::update(&db, id, updated_at, bio_data, records)?;
    Ok(())
}

#[tauri::command]
pub fn delete_patient(database_path: String, id: i32) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::delete(&db, id)?;
    Ok(())
}

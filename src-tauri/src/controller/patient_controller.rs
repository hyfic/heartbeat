// controller for handling patients

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
    appointment: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::create(
        &db,
        pid,
        created_at,
        updated_at,
        bio_data,
        records,
        appointment,
    )?;
    Ok(())
}

// read all patients with pagination
#[tauri::command]
pub fn read_patients(
    database_path: String,
    page: i32, // for pagination
) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::read_all(&db, page)?;
    Ok(patients)
}

// read patient with id
#[tauri::command]
pub fn read_one_patient(
    database_path: String,
    id: i32,
) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::read_one(&db, id)?;
    Ok(patients)
}

#[tauri::command]
pub fn search_patients(
    database_path: String,
    search_query: String,
    page: i32,
) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::search_patients(&db, search_query, page)?;
    Ok(patients)
}

// return patients who have appointment scheduled today and tomorrow
#[tauri::command]
pub fn get_appointments(
    database_path: String,
    today: String,
    tomorrow: String,
    page: i32,
) -> Result<Vec<patient_model::PatientType>, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::get_appointments(&db, today, tomorrow, page)?;
    Ok(patients)
}

// return how many appointments are there
#[tauri::command]
pub fn get_appointments_count(
    database_path: String,
    today: String,
    tomorrow: String,
) -> Result<i32, String> {
    let db = init_data_db(database_path)?;
    let patients = patient_model::get_appointments_count(&db, today, tomorrow)?;
    Ok(patients)
}

// update patient data
#[tauri::command]
pub fn update_patient(
    database_path: String,
    id: i32,
    updated_at: String,
    bio_data: String,
    records: String,
    appointment: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::update(&db, id, updated_at, bio_data, records, appointment)?;
    Ok(())
}

#[tauri::command]
pub fn delete_patient(database_path: String, id: i32) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    patient_model::delete(&db, id)?;
    Ok(())
}

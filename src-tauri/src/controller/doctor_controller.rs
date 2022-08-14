use crate::database::init_data_db;
use crate::database::Doctor;

#[tauri::command]
pub fn read_doctor(database_path: String) -> Result<Vec<Doctor::DoctorType>, String> {
    let db = init_data_db(database_path)?;
    let doctor = Doctor::read(&db)?;
    Ok(doctor)
}

#[tauri::command]
pub fn add_doctor(
    database_path: String,
    name: String,
    qualification: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    Doctor::create(&db, name, qualification)?;
    Ok(())
}

#[tauri::command]
pub fn update_doctor(
    database_path: String,
    name: String,
    qualification: String,
) -> Result<(), String> {
    let db = init_data_db(database_path)?;
    Doctor::update(&db, name, qualification)?;
    Ok(())
}

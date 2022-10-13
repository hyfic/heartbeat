#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod controller;
mod database;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // database controllers
            controller::database_controller::read_databases,
            controller::database_controller::add_database,
            controller::database_controller::update_database,
            controller::database_controller::delete_database,
            // doctor controllers
            controller::doctor_controller::read_doctor,
            controller::doctor_controller::add_doctor,
            controller::doctor_controller::update_doctor,
            // patient controller
            controller::patient_controller::create_patient,
            controller::patient_controller::read_patients,
            controller::patient_controller::read_one_patient,
            controller::patient_controller::search_patients,
            controller::patient_controller::get_appointments,
            controller::patient_controller::get_appointments_count,
            controller::patient_controller::update_patient,
            controller::patient_controller::delete_patient,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

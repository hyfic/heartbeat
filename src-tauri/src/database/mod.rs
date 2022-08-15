pub mod database_model;
pub mod doctor_model;
mod init;
pub mod patient_model;

use rusqlite::Connection;

use init::{connect_app_database, connect_data_db};

pub fn init_app_db() -> Result<Connection, String> {
    match connect_app_database() {
        Ok(conn) => Ok(conn),
        Err(err) => {
            eprintln!("{}", err);
            Err(String::from("Failed to connect database"))
        }
    }
}

pub fn init_data_db(database_path: String) -> Result<Connection, String> {
    match connect_data_db(database_path) {
        Ok(conn) => Ok(conn),
        Err(err) => {
            eprintln!("{}", err);
            Err(String::from("Failed to connect database"))
        }
    }
}

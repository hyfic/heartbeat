use rusqlite::Connection;

pub mod database_model;

mod init;

use init::{connect_app_database, connect_data_db};

// connect to app core database
pub fn init_app_db() -> Result<Connection, String> {
    match connect_app_database() {
        Ok(conn) => Ok(conn),
        Err(err) => {
            eprintln!("{}", err);
            Err(String::from("Failed to connect database"))
        }
    }
}

// connect to data db according to path given
pub fn init_data_db(database_path: String) -> Result<Connection, String> {
    match connect_data_db(database_path) {
        Ok(conn) => Ok(conn),
        Err(err) => {
            eprintln!("{}", err);
            Err(String::from("Failed to connect database"))
        }
    }
}

use rusqlite::Connection;
use serde::Serialize;

#[derive(Serialize)]
pub struct DoctorType {
    pub name: String,
    pub qualification: String,
}

pub fn create(db: &Connection, name: String, qualification: String) -> Result<(), String> {
    match db.execute(
        "INSERT INTO Doctor (name, qualification) VALUES (?1, ?2)",
        &[&name, &qualification],
    ) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read(db: &Connection) -> Result<Vec<DoctorType>, String> {
    let mut doctor_vec: Vec<DoctorType> = Vec::new();

    let mut sql_query = match db.prepare("SELECT * FROM Doctor") {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load doctor")),
    };

    let doctor_iter = match sql_query.query_map([], |row| {
        Ok(DoctorType {
            name: row.get(0)?,
            qualification: row.get(1)?,
        })
    }) {
        Ok(doctor_iter) => doctor_iter,
        Err(_) => return Err(String::from("Failed to load doctor")),
    };

    for doctor in doctor_iter {
        match doctor {
            Ok(doctor_data) => doctor_vec.push(doctor_data),
            Err(_) => continue,
        }
    }

    Ok(doctor_vec)
}

pub fn update(db: &Connection, name: String, qualification: String) -> Result<(), String> {
    match db.execute(
        "UPDATE Doctor SET name=(?1), qualification=(?2)",
        &[&name, &qualification],
    ) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to update doctor")),
    };
}

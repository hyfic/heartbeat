use rusqlite::Connection;
use serde::Serialize;

#[derive(Serialize)]
pub struct PatientType {
    pub id: i32,
    pub data: String,
}

pub fn create(db: &Connection, data: String) -> Result<(), String> {
    match db.execute("INSERT INTO Patient (data) VALUES (?1)", &[&data]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read_all(db: &Connection) -> Result<Vec<PatientType>, String> {
    let mut patient_vec: Vec<PatientType> = Vec::new();

    let mut sql_query = match db.prepare("SELECT * FROM Patient") {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load patients")),
    };

    let patient_iter = match sql_query.query_map([], |row| {
        Ok(PatientType {
            id: row.get(0)?,
            data: row.get(1)?,
        })
    }) {
        Ok(patient_iter) => patient_iter,
        Err(_) => return Err(String::from("Failed to load patients")),
    };

    for patient in patient_iter {
        match patient {
            Ok(patient_data) => patient_vec.push(patient_data),
            Err(_) => continue,
        }
    }

    Ok(patient_vec)
}

pub fn read_one(db: &Connection, id: i32) -> Result<Vec<PatientType>, String> {
    let id = format!("{}", id);
    let mut patient_vec: Vec<PatientType> = Vec::new();

    let mut sql_query = match db.prepare("SELECT * FROM Patient WHERE id=(?1)") {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load patient")),
    };

    let patient_iter = match sql_query.query_map(&[&id], |row| {
        Ok(PatientType {
            id: row.get(0)?,
            data: row.get(1)?,
        })
    }) {
        Ok(patient_iter) => patient_iter,
        Err(_) => return Err(String::from("Failed to load patient")),
    };

    for patient in patient_iter {
        match patient {
            Ok(patient_data) => patient_vec.push(patient_data),
            Err(_) => continue,
        }
    }

    Ok(patient_vec)
}

pub fn update(db: &Connection, id: i32, data: String) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("UPDATE Patient SET data=(?1) WHERE id=(?2)", &[&data, &id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to update patient")),
    };
}

pub fn delete(db: &Connection, id: i32) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("DELETE FROM Patient WHERE id=(?1)", &[&id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to delete patient")),
    };
}

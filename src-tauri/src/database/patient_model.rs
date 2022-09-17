use rusqlite::Connection;
use serde::Serialize;

#[derive(Serialize)]
pub struct PatientType {
    pub id: i32,
    pub pid: String,
    pub created_at: String,
    pub updated_at: String,
    pub bio_data: String,
    pub records: String,
}

pub fn create(
    db: &Connection,
    pid: String,
    created_at: String,
    updated_at: String,
    bio_data: String,
    records: String,
) -> Result<i64, String> {
    match db.execute(
        "INSERT INTO Patient (pid, created_at, updated_at, bio_data, records) VALUES (?1, ?2, ?3, ?4, ?5)",
        &[&pid, &created_at, &updated_at, &bio_data, &records],
    ) {
        Ok(_) => {
            let id = db.last_insert_rowid();
            return Ok(id);
        }
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read_all(db: &Connection, page: i32) -> Result<Vec<PatientType>, String> {
    let mut patient_vec: Vec<PatientType> = Vec::new();

    let sql = format!(
        "SELECT * FROM Patient LIMIT 10 OFFSET {} ORDER BY updated_at DESC",
        page * 10
    );

    let mut sql_query = match db.prepare(&sql) {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load patients")),
    };

    let patient_iter = match sql_query.query_map([], |row| {
        Ok(PatientType {
            id: row.get(0)?,
            pid: row.get(1)?,
            created_at: row.get(2)?,
            updated_at: row.get(3)?,
            bio_data: row.get(4)?,
            records: row.get(5)?,
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

pub fn search_patient(db: &Connection, search_query: String) -> Result<Vec<PatientType>, String> {
    let mut patient_vec: Vec<PatientType> = Vec::new();

    let sql = format!(
        "SELECT * FROM Patient LIMIT 10 WHERE data LIKE %'\"name\":\"{}'%",
        search_query
    );

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
            pid: row.get(1)?,
            created_at: row.get(2)?,
            updated_at: row.get(3)?,
            bio_data: row.get(4)?,
            records: row.get(5)?,
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

pub fn update(
    db: &Connection,
    id: i32,
    updated_at: String,
    bio_data: String,
    records: String,
) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute(
        "UPDATE Patient SET updated_at=(?1) bio_data=(?2) records=(?3) WHERE id=(?4)",
        &[&updated_at, &bio_data, &records],
    ) {
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

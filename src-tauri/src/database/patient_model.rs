// model for patients in data db

use rusqlite::Connection;
use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct PatientType {
    pub id: i32,
    pub pid: String, // patient id on hospital/clinic (only for doctors)
    pub created_at: String,
    pub updated_at: String,
    pub bio_data: String,
    pub records: String, // JSON encoded array of records
    pub appointment: String,
}

pub fn create(
    db: &Connection,
    pid: String,
    created_at: String,
    updated_at: String,
    bio_data: String,
    records: String,
    appointment: String,
) -> Result<i64, String> {
    match db.execute(
        "INSERT INTO Patient (pid, created_at, updated_at, bio_data, records, appointment) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        &[&pid, &created_at, &updated_at, &bio_data, &records, &appointment],
    ) {
        Ok(_) => {
            let id = db.last_insert_rowid();
            return Ok(id);
        }
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read_all(db: &Connection, page: i32) -> Result<Vec<PatientType>, String> {
    let sql = format!(
        "SELECT * FROM Patient ORDER BY updated_at DESC LIMIT 10 OFFSET {}",
        (page - 1) * 10
    );

    run_patient_select_query(db, sql) // return result for executed query
}

pub fn read_one(db: &Connection, id: i32) -> Result<Vec<PatientType>, String> {
    let sql = format!("SELECT * FROM Patient WHERE id={}", id);
    run_patient_select_query(db, sql)
}

pub fn search_patients(
    db: &Connection,
    search_query: String,
    page: i32,
) -> Result<Vec<PatientType>, String> {
    let sql = format!(
        "SELECT * FROM Patient WHERE pid='{}' OR bio_data LIKE '%{}%' LIMIT 10 OFFSET {}",
        search_query,
        search_query,
        (page - 1) * 10
    );

    run_patient_select_query(db, sql)
}

pub fn get_appointments(
    db: &Connection,
    date: String,
    page: i32,
) -> Result<Vec<PatientType>, String> {
    // get appointments with given date
    let sql = format!(
        "SELECT * FROM Patient WHERE appointment='{}' LIMIT 10 OFFSET {}",
        date,
        (page - 1) * 10
    );
    run_patient_select_query(db, sql)
}

// return count of appointments
pub fn get_appointments_count(
    db: &Connection,
    today: String,
    tomorrow: String,
) -> Result<i32, String> {
    // fetch the count of data where appointment is between {today} and {tomorrow}, which will return all appointments which is today and tomorrow
    let sql = format!(
        "SELECT COUNT(*) FROM Patient WHERE appointment BETWEEN {} AND {}",
        today, tomorrow
    );

    let mut sql_query = match db.prepare(&sql) {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to get appointments count")),
    };

    struct Appointments {
        length: i32,
    }

    return match sql_query.query_map([], |row| {
        Ok(Appointments {
            length: row.get(0)?,
        })
    }) {
        Ok(data_iter) => {
            for data in data_iter {
                match data {
                    Ok(appointments) => return Ok(appointments.length),
                    Err(_) => return Err(String::from("Failed to get appointments count")),
                }
            }

            Ok(0)
        }
        Err(_) => return Err(String::from("Failed to get appointments count")),
    };
}

pub fn update(
    db: &Connection,
    id: i32,
    updated_at: String,
    bio_data: String,
    records: String,
    appointment: String,
) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute(
        "UPDATE Patient SET updated_at=(?1), bio_data=(?2), records=(?3), appointment=(?4) WHERE id=(?5)",
        &[&updated_at, &bio_data, &records, &appointment,&id],
    ) {
        Ok(_) => return Ok(()),
        Err(err) => {
            println!("{:?}", err);
            return Err(String::from("Failed to update patient"));
        }
    };
}

pub fn delete(db: &Connection, id: i32) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("DELETE FROM Patient WHERE id=(?1)", &[&id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to delete patient")),
    };
}

// pass an sql query, & fetch patients according to that query
fn run_patient_select_query(db: &Connection, sql: String) -> Result<Vec<PatientType>, String> {
    let mut patient_vec: Vec<PatientType> = Vec::new();

    let mut sql_query = match db.prepare(&sql) {
        Ok(query) => query,
        Err(err) => {
            println!("{}", err);
            return Err(String::from("Failed to load patient"));
        }
    };

    let patient_iter = match sql_query.query_map([], |row| {
        Ok(PatientType {
            id: row.get(0)?,
            pid: row.get(1)?,
            created_at: row.get(2)?,
            updated_at: row.get(3)?,
            bio_data: row.get(4)?,
            records: row.get(5)?,
            appointment: row.get(6)?,
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

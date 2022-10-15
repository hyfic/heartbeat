use rusqlite::Connection;
use serde::Serialize;

#[derive(Serialize)]
pub struct DatabaseType {
    pub id: i32,
    pub path: String,
    pub name: String,
}

pub fn create(db: &Connection, path: String, name: String) -> Result<i64, String> {
    match db.execute(
        "INSERT INTO Database (path, name) VALUES (?1, ?2)",
        &[&path, &name],
    ) {
        Ok(_) => {
            let id = db.last_insert_rowid();
            return Ok(id);
        }
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read_all(db: &Connection) -> Result<Vec<DatabaseType>, String> {
    let mut database_vec: Vec<DatabaseType> = Vec::new();

    let mut sql_query = match db.prepare("SELECT * FROM Database") {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load databases")),
    };

    let database_iter = match sql_query.query_map([], |row| {
        Ok(DatabaseType {
            id: row.get(0)?,
            path: row.get(1)?,
            name: row.get(2)?,
        })
    }) {
        Ok(database_iter) => database_iter,
        Err(_) => return Err(String::from("Failed to load databases")),
    };

    for database in database_iter {
        match database {
            Ok(database_data) => database_vec.push(database_data),
            Err(_) => continue,
        }
    }

    Ok(database_vec)
}

pub fn update(db: &Connection, id: i32, name: String) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("UPDATE Database SET name=(?1) WHERE id=(?2)", &[&name, &id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to update database")),
    };
}

pub fn delete(db: &Connection, id: i32) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("DELETE FROM Database WHERE id=(?1)", &[&id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to delete database")),
    };
}

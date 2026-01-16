const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT UNIQUE,
      password TEXT,
      rol TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS turnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha TEXT,
      hora TEXT,
      usuarioId INTEGER,
      disponible INTEGER
    )
  `);
});

module.exports = db;

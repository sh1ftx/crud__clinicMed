import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync('clinica.db');
  return db;
};

export const createTables = async (db) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      idade INTEGER
    );
    CREATE TABLE IF NOT EXISTS consultas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_id INTEGER,
      data TEXT,
      descricao TEXT,
      FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
    );
  `);
};
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const db = await open({
  filename: path.join('sqlite_data', 'database.db'),
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS user_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  `);

export default db;
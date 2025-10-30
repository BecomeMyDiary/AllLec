import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// ✅ สร้างโฟลเดอร์ sqlite_data ถ้ายังไม่มี
const dataDir = path.join(process.cwd(), 'sqlite_data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("📁 Created sqlite_data directory");
}

// ✅ เปิดหรือสร้างฐานข้อมูล
const dbPromise = open({
  filename: path.join(dataDir, 'database.db'),
  driver: sqlite3.Database
});

// ✅ สร้างตารางถ้ายังไม่มี
(async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      access_token TEXT NOT NULL,
      refresh_token TEXT,
      expires_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✅ SQLite database ready at:", path.join(dataDir, 'database.db'));
})();

// ✅ export ฟังก์ชันให้ server.js ใช้งาน
export default {
  run: async (query, params = []) => {
    const db = await dbPromise;
    return db.run(query, params);
  },
  all: async (query, params = []) => {
    const db = await dbPromise;
    return db.all(query, params);
  },
  get: async (query, params = []) => {
    const db = await dbPromise;
    return db.get(query, params);
  }
};

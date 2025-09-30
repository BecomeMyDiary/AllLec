const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();   // โหลดค่าจาก .env

const app = express();
const PORT = process.env.PORT || 3000;

// ใช้ CORS
app.use(cors());
app.use(express.json());

// ใช้ createPool แทน (จัดการ connection อัตโนมัติ)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ================= API =================

// ดึงวิชาทั้งหมด
app.get('/subjects', (req, res) => {
  const sql = 'select s.id, s.name, s.image, f.up_date, f.descri, f.link from subject s left join files f on s.id = f.subj_id';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    const  subjects = {};
    results.forEach(row => {
      if (!subjects[row.id]) {
        subjects[row.id] = {
          id: row.id,
          name: row.name,
          image: row.image,
          files: []
        };
      }
      if(row.up_date){
        subjects[row.id].files.push({
          up_date: row.up_date,
          descri: row.descri,
          link: row.link
        });
      }
    });
    res.json(Object.values(subjects));
  });
});

// ========================================

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

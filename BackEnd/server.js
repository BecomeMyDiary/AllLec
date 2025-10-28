import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import db from './db.js';

// โหลดตัวแปรจาก .env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ตั้งค่า OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// ใช้ CORS + JSON
app.use(cors());
app.use(express.json());


// ================== API ==================

// STEP 1: Login
app.get('/login', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/classroom.courses',
      'https://www.googleapis.com/auth/classroom.announcements',
      'https://www.googleapis.com/auth/classroom.courses.readonly',
      'https://www.googleapis.com/auth/classroom.rosters',
      'https://www.googleapis.com/auth/classroom.rosters.readonly',
      'https://www.googleapis.com/auth/classroom.profile.emails',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/classroom.coursework.me', 
      'https://www.googleapis.com/auth/classroom.coursework.students',
      'https://www.googleapis.com/auth/classroom.courseworkmaterials',
      'openid'
    ]
  });
  res.redirect(url);
});

// STEP 2: Callback
app.get('/oauth2callback', async (req, res) => {
  try {
    const { code } = req.query;

    // แลก code เป็น token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // ดึงข้อมูล user
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const email = userInfo.data.email.toLowerCase();

    // คำนวณวันหมดอายุของ token (แปลงเป็น ISO)
    let expiresAt = null;
    if (tokens.expiry_date) {
      try {
        const exp = Number(tokens.expiry_date);
        expiresAt = new Date(exp < 1e12 ? exp * 1000 : exp).toISOString(); // รองรับ seconds & ms
      } catch {
        expiresAt = null;
      }
    }

    // บันทึก tokens ลง DB
    await db.run(
      `INSERT OR REPLACE INTO user_tokens (email, access_token, refresh_token, expires_at)
       VALUES (?, ?, ?, ?)`,
      [email, tokens.access_token, tokens.refresh_token || null, expiresAt]
    );
    console.log(`✅ Token saved for ${email}`);
    return res.redirect(`http://localhost:5173/allfile?email=${encodeURIComponent(email)}`);
  } catch (err) {
    console.error("❌ Error during OAuth callback:", err.response?.data || err);
    res.status(500).send("Authentication failed");
  }
});

// STEP 3: ดึง courses แบบสด ๆ (ไม่ต้อง sync DB)
app.get('/courses', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).send("❌ Email is required");

    const rows = await db.all("SELECT * FROM user_tokens WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).send("❌ No user tokens found, please login first");

    const user = rows[0];
    oauth2Client.setCredentials({
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiry_date: user.expiry_date
    });

    console.log("🔑 oauth2Client.credentials:", oauth2Client.credentials);

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    const result = await classroom.courses.list({
      courseStates: ['ACTIVE']
    });

  
    console.log("✅ Courses full data:", result.data.courses);
    res.json(result.data.courses || []);
  } catch (err) {
    console.error("❌ Error fetching courses:", err.response?.data || err);
    res.status(500).send("Failed to fetch courses");
  }
});

// STEP 4: ดึง students ของ course
app.get('/students', async (req, res) => {
  try {
    const { email, courseId } = req.query;
    if (!email || !courseId) return res.status(400).send("❌ Email & courseId are required");

    const rows = await db.all("SELECT * FROM user_tokens WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).send("❌ No user tokens found, please login first");

    const user = rows[0];
    oauth2Client.setCredentials({
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiry_date: user.expiry_date
    });

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    const result = await classroom.courses.students.list({ courseId });

    

    
    res.json(result.data.students || []);
  } catch (err) {
    console.error("❌ Error fetching students:", err.response?.data || err);
    res.status(500).send("Failed to fetch students");
  }
});

// ดึงประกาศทั้งหมด
app.get('/announcements', async (req, res) => {
  try {
    const { email, courseId } = req.query;
    if (!email || !courseId) return res.status(400).send("❌ Email & courseId are required");

    const rows = await db.all("SELECT * FROM user_tokens WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).send("❌ No user tokens found, please login first");

    const user = rows[0];
    oauth2Client.setCredentials({
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiry_date: user.expiry_date
    });

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    const result = await classroom.courses.announcements.list({ courseId });
    res.json(result.data.announcements || []);
  } catch (err) {
    console.error("❌ Error fetching announcements:", err.response?.data || err);
    res.status(500).send("Failed to fetch announcements");
  }
});

// ดึงงานในชั้นเรียน
app.get('/coursework', async (req, res) => {
  try {
    const { email, courseId } = req.query;
    if (!email || !courseId) return res.status(400).send("❌ Email & courseId are required");

    const rows = await db.all("SELECT * FROM user_tokens WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).send("❌ No user tokens found, please login first");

    const user = rows[0];
    oauth2Client.setCredentials({
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiry_date: user.expiry_date
    });

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    const result = await classroom.courses.courseWork.list({ courseId });
    res.json(result.data.courseWork || []);
  } catch (err) {
    console.error("❌ Error fetching coursework:", err.response?.data || err);
    res.status(500).send("Failed to fetch coursework");
  }
});

// ดึง "เนื้อหาที่โพสต์" (course materials)
app.get('/materials', async (req, res) => {
  try {
    const { email, courseId } = req.query;
    if (!email || !courseId) return res.status(400).send("❌ Email & courseId are required");

    // ดึง token จาก DB
    const rows = await db.all("SELECT * FROM user_tokens WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).send("❌ No user tokens found, please login first");

    const user = rows[0];
    oauth2Client.setCredentials({
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiry_date: user.expiry_date
    });

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });

    // ดึงเนื้อหาที่ครูโพสต์
    const result = await classroom.courses.courseWorkMaterials.list({
      courseId,
      orderBy: 'updateTime desc'
    });

    const materials = (result.data.courseWorkMaterial || []).map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      materials: item.materials || [],  // ลิงก์หรือไฟล์ต่าง ๆ
      updateTime: item.updateTime
    }));

    res.json(materials);
  } catch (err) {
    console.error("❌ Error fetching materials:", err.response?.data || err);
    res.status(500).send("Failed to fetch materials");
  }
});



// ========================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

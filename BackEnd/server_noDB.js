const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/oauth2callback";

// ================= OAuth Config =================
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// mock: ใส่ token ตรงนี้ (สมมติว่าคุณ login แล้วได้ token มาแล้ว)
oauth2Client.setCredentials({
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  expiry_date: process.env.EXPIRY_DATE
});

// ================= Routes =================
// หน้าเว็บ
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ดึง courses
app.get("/courses", async (req, res) => {
  try {
    const classroom = google.classroom({ version: "v1", auth: oauth2Client });
    const result = await classroom.courses.list();
    res.json(result.data.courses || []);
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).send("Error fetching courses");
  }
});

// ดึง students
app.get("/students/:courseId", async (req, res) => {
  try {
    const classroom = google.classroom({ version: "v1", auth: oauth2Client });
    const result = await classroom.courses.students.list({
      courseId: req.params.courseId,
    });
    res.json(result.data.students || []);
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    res.status(500).send("Error fetching students");
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

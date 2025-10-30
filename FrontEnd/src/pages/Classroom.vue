<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: null,
      courses: [],
      selectedCourse: null,
      showAll: false, // ✅ ตัวควบคุมแสดงทั้งหมดหรือไม่
      announceIcon: new URL('@/assets/picture/announce.png', import.meta.url).href,
      fileIcon: new URL('@/assets/picture/file.png', import.meta.url).href,
      subjectIcon: new URL('@/assets/picture/subject.png', import.meta.url).href,
      classroomIcon: new URL('@/assets/picture/Google_Classroom.svg', import.meta.url).href,
    };

  },
  computed: {
    visibleAnnouncements() {
      if (!this.selectedCourse?.announcements) return [];
      return this.showAll
        ? this.selectedCourse.announcements
        : this.selectedCourse.announcements.slice(0, 2); // ✅ แสดงแค่ 2 ใบแรก
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const emailFromQuery = params.get('email');
    // 2️⃣ ถ้ามี email จาก query (login ครั้งแรก)
    if (emailFromQuery) {
      this.email = emailFromQuery;
      localStorage.setItem('user_email', emailFromQuery); // ✅ เก็บถาวร
    }
    // 3️⃣ ถ้าไม่มี query แต่เคย login แล้ว
    else {
      const savedEmail = localStorage.getItem('user_email');
      if (savedEmail) {
        this.email = savedEmail;
      }
    }
    if (!this.email) {
      console.error("❌ ไม่พบ email ใน URL");
      return;
    }
    axios.get('http://localhost:3000/courses', {
      params: { email: this.email }   // axios จะต่อเป็น ?email=... ให้อัตโนมัติ
    })
      .then(res => {
        this.courses = res.data
        console.log("✅ ดึงข้อมูลสำเร็จ:", this.courses)
      })
      .catch(err => {
        console.error("❌ Error fetching courses:", err)
      })

  },
  methods: {
    async selectCourse(course) {
      this.selectedCourse = course;
      try {
        const res_announc = await axios.get('http://localhost:3000/announcements', {
          params: {
            email: this.email,
            courseId: course.id
          }
        });

        this.selectedCourse.announcements = res_announc.data;
        console.log("✅ ดึงประกาศสำเร็จ:", res_announc.data);

        const res_coursework = await axios.get('http://localhost:3000/coursework', {
          params: {
            email: this.email,
            courseId: course.id
          }
        });

        this.selectedCourse.coursework = res_coursework.data;
        console.log("✅ ดึงงานสำเร็จ:", res_coursework.data);

      } catch (err) {
        console.error("❌ Error fetching announcements:", err);
      }
    },
  },
}




</script>
<template>
  <div>
    <!-- ✅ ส่วนหัว -->
    <div style="font-size: 35px; font-weight: bold; margin-left: 20px; margin-top: 20px;">
      {{ email ? 'Subject' : 'Please login' }}
    </div>

    <!-- ✅ รายวิชา -->
    <div class="container-buttons">
      <div v-for="course in courses" :key="course.id" class="btn-with-text">
        <v-btn rounded="circle"
          style="width:170px; height:170px; display:flex; align-items:center; justify-content:center;"
          @click="selectCourse(course)">
          <v-img :src="subjectIcon" alt="subject icon" width="170" height="170"
            style="border-radius:50%; object-fit:contain;" />
        </v-btn>
        <span class="course-name">{{ course.name }}</span>
      </div>
    </div>

    <v-divider class="my-4" style="margin: 20px;"></v-divider>

    <!-- ✅ ส่วนประกาศ -->
    <div v-if="selectedCourse && selectedCourse.announcements && selectedCourse.announcements.length > 0">
      <h2 class="title" style="margin: 20px;">ประกาศ</h2>

      <div class="announcement-grid" style="margin: 20px;">
        <v-card v-for="(announce, index) in visibleAnnouncements" :key="index" elevation="2" class="announce-card">
          <v-card-item>
            <Icon icon="mdi:bell-badge" color="yellow" width="24" height="24" />
            <div class="card-header">
              <v-avatar style="margin-top: 10px" size="40" rounded="0">
                <v-img :src="announceIcon" alt="Announce icon" />
              </v-avatar>
              <v-card-title class="announce-title">
              {{ new Date(announce.creationTime).toLocaleDateString('th-TH') }}
              </v-card-title>
            </div>
          <v-card-subtitle class="announce-date" style="margin-top: 20px;">
            {{ announce.title || '' }}
          </v-card-subtitle>
        </v-card-item>

          <v-card-text class="announce-text">
            {{ announce.text }}
          </v-card-text>

          <v-card-actions class="announce-actions">
            <v-btn color="green" variant="outlined" :href="announce.alternateLink" target="_blank">
              Go to classroom
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- ✅ ปุ่ม Show All -->
      <div style="text-align: center; margin-bottom: 20px;">
        <v-btn color="blue" variant="tonal" @click="showAll = !showAll">
          {{ showAll ? 'Show Less' : 'Show All' }}
        </v-btn>
      </div>
    </div>

    <!-- ❌ ไม่มีประกาศ -->
    <div v-else-if="selectedCourse" class="no-data">ไม่มีประกาศ</div>

    <v-divider class="my-4" style="margin: 20px"></v-divider>

    <!-- ✅ งานที่มอบหมาย -->
    <div v-if="selectedCourse && selectedCourse.coursework && selectedCourse.coursework.length > 0">
      <h2 style="font-size: 28px; font-weight: bold; margin-top: 40px; margin: 20px;">งานที่มอบหมาย</h2>
      <div class="announcement-list" style="margin-left: 30px;">
        <v-card v-for="(work, index) in selectedCourse.coursework" :key="index"
          style="margin-top: 20px; margin-right: 20px;" elevation="16" class="fixed-card">

          <v-card-subtitle style="margin-top: 6px;">
            {{ new Date(work.creationTime).toLocaleDateString('th-TH') }}
          </v-card-subtitle>
          <div class="card-header">
            <v-avatar style="margin-top: 10px; margin-left: 20px" size="40" rounded="0">
              <v-img :src="fileIcon" alt="File icon" />
            </v-avatar>
            <v-card-text style="font-size: 20px;">{{ work.title }}</v-card-text>
          </div>
          <v-card-text style="font-size: 15px; margin-left: 60px;">{{ work.description }}</v-card-text>


          <v-card-actions>
            <template v-if="work.materials && work.materials.length > 0">
              <v-btn v-for="(file, i) in work.materials" :key="i" color="green" variant="outlined"
                :href="file.driveFile.driveFile.alternateLink" target="_blank">
                {{ file.driveFile.driveFile.title }}
              </v-btn>
            </template>

            <v-btn v-else color="blue" variant="outlined" :href="work.alternateLink" target="_blank">
              Go to classroom
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>




<style>
.container-buttons {
  display: flex;
  flex-direction: row;
  /* เรียงแนวนอน */
  gap: 40px;
  /* ระยะห่างระหว่างปุ่ม */
  overflow-x: auto;
  /* เปิด scrollbar แนวนอน */
  overflow-y: hidden;
  /* ซ่อน scrollbar แนวตั้ง */
  padding: 20px;
  scroll-behavior: smooth;
  /* เลื่อนนุ่มนวล */
  scrollbar-width: thin;
  /* สำหรับ Firefox */
}

/* ✅ Scrollbar สำหรับ Chrome/Edge */
.container-buttons::-webkit-scrollbar {
  height: 8px;
}

.container-buttons::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.container-buttons::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

.btn-with-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  /* ป้องกันปุ่มหด */
}

/* ✅ ปรับชื่อรายวิชาให้สวย */
.course-name {
  width: 120px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
  text-align: center;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* จำกัดไม่เกิน 2 บรรทัด */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ✅ กล่องรวมทั้งหมด */
.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* ✅ ให้ประกาศเรียงเป็นกริดหลายใบ */
.announcement-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* ✅ สองคอลัมน์เท่ากัน */
  gap: 20px;
  padding-bottom: 20px;
}

/* ✅ การ์ดแต่ละใบ */
.announce-card {
  border-radius: 12px;
  height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

/* ✅ หัวข้อกับวันที่ */
.announce-title {
  font-size: 20px;
  font-weight: bold;
}

.announce-date {
  font-size: 14px;
  color: gray;
}

/* ✅ เนื้อหาข้างใน */
.announce-text {
  font-size: 15px;
  line-height: 1.3;
  padding: 10px 16px;
  overflow-y: auto;
}

/* ✅ ปุ่มล่าง */
.announce-actions {
  justify-content: center;
  padding-bottom: 10px;
}

/* ✅ ถ้าไม่มีประกาศ */
.no-data {
  font-size: 18px;
  color: gray;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0px;
  /* ระยะห่างระหว่างรูปกับชื่อ */
}
/* 🔥 เพิ่มส่วนนี้เข้าไปด้านล่างสุดเลย 🔥 */
.fixed-card {
  transition: all 0.25s ease;
  border-radius: 15px;

}

.fixed-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.08);

}

.fixed-card:hover .v-card-title {
  color: #5a99f7;
  transition: color 0.2s ease;
}
.announce-card {
  border-radius: 15px;

  transition: all 0.25s ease;
}

.announce-card:hover {
  transform: scale(1.03);
 box-shadow: 0 6px 20px rgba(255, 255, 255, 0.08);

}

.announce-card:hover .announce-title {
  background: linear-gradient(to right, #FF47D6, #FF78EC, #4564FF, #57E9FF);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  transition: color 0.2s ease;
}
</style>
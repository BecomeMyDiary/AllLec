<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: null,
      drive: [],
      selectedDrive: null,
      showAll: false, // ✅ ตัวควบคุมแสดงทั้งหมดหรือไม่
      announceIcon: new URL('@/assets/picture/announce.png', import.meta.url).href,
      fileIcon: new URL('@/assets/picture/file.png', import.meta.url).href,
      subjectIcon: new URL('@/assets/picture/subject.png', import.meta.url).href,
    };

  },
  computed: {
    visibleDriveFile() {
      if (!this.drive) return [];
      return this.showAll
        ? this.drive
        : this.drive.slice(0, 2); // ✅ แสดงแค่ 2 ใบแรก
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
    axios.get('http://localhost:3000/drive/files', {
      params: { 
        email: this.email,
        folderID: '1nIMzFEqMsZ0jL0I1kt-Ha_qXMeFTmoH_' 
      }   // axios จะต่อเป็น ?email=... ให้อัตโนมัติ
    })
      .then(res => {
        this.drive = res.data
        console.log("✅ ดึงข้อมูลสำเร็จ:", this.drive)
      })
      .catch(err => {
        console.error("❌ Error fetching drive:", err)
      })
    
  },
  methods: {
    selectedDriveFile(drive) {
      this.selectedDrive = drive;
    },
  },
}




</script>
<template>
  <div>
    <!-- ✅ ส่วนประกาศ -->
      <h2 class="title" style="margin: 20px;">งาน</h2>

      <div class="announcement-grid" style="margin: 20px;">
        <v-card v-for="(drive, index) in visibleDriveFile" :key="index" elevation="2" class="announce-card">
          <v-card-item>
            <Icon icon="mdi:bell-badge" color="yellow" width="24" height="24" />
            <div class="card-header">
              <v-avatar style="margin-top: 10px" size="40" rounded="0">
                <v-img :src="fileIcon" alt="File icon" />
              </v-avatar>
              <v-card-title class="announce-title">
              {{ drive.name || '' }}
              </v-card-title>
            </div>
          <v-card-subtitle class="announce-date" style="margin-top: 20px;">
            {{ drive.title || '' }}
          </v-card-subtitle>
        </v-card-item>

          <v-card-text class="announce-text">
            {{ drive.text }}
          </v-card-text>

          <v-card-actions class="announce-actions">
            <v-btn color="green" variant="outlined" :href="drive.webViewLink" target="_blank">
              Go to drive
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

    <v-divider class="my-4" style="margin: 20px"></v-divider>
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
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email : null,
      courses: [],
      selectedCourse: null,
    }
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

      }catch (err) {
        console.error("❌ Error fetching announcements:", err);
      }
    },
  },
}




</script>
<template>
  <div>
    <div
        style="
          font-size: 35px;
          font-weight: bold;
          margin-left: 20px;
          margin-top: 20px;
        "
      >
        {{ email ? 'Subject' : 'Please login' }}
    </div>

    <div class="container-buttons">
      <!-- ปุ่มเลือกวิชา -->
      <div v-for="course in courses" :key="course" class="btn-with-text">
        <v-btn rounded="circle"
          style="width:150px; height:150px; display:flex; align-items:center; justify-content:center;"
          @click="selectCourse(course)">
          <v-img  width="100" height="100" style="border-radius:50%; object-fit:contain;" />
        </v-btn >
        <span style="font-size: 20px; margin-top: 20px; font-weight: bold;">
          {{ course.name }}
        </span>
      </div>
    </div>

    <v-divider class="my-4" style="margin: 20px;"></v-divider>

    <!-- แสดงรายละเอียดเมื่อเลือก -->
    <div v-if="selectedCourse" class="container-info">
      <div v-if="selectedCourse.announcements && selectedCourse.announcements.length>0 ">
        <h2 style="font-size: 28px; font-weight: bold;">ประกาศ</h2>
        <div class = "announcement-list">
          <!-- วน loop แสดงไฟล์ของวิชาที่เลือก -->
          <v-card v-for="(announce, index) in selectedCourse.announcements" :key="index" style=" margin-top: 20px; margin-right: 20px; "
            elevation="16" class="fixed-card">
            <v-card-subtitle class="card-subtitle">
              {{ new Date(announce.creationTime).toLocaleDateString('th-TH') }}
            </v-card-subtitle>
            
            <v-card-text class="line-2" style="overflow-y: auto;">
              {{ announce.text }}
            </v-card-text>

            <v-card-actions class="card-actions wrap">
              <v-btn color="green" variant="outlined" :href="announce.alternateLink" target="_blank">
                Go to classroom
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <div v-else style="font-size: 20px; margin-top: 20px; font-weight: bold; color: gray;">
        ไม่มีประกาศ
      </div>

      <div v-if="selectedCourse.coursework && selectedCourse.coursework.length>0 ">
        <h2 style="font-size: 28px; font-weight: bold; margin-top: 40px;">งานที่มอบหมาย</h2>
        <div class = "announcement-list">
          <!-- วน loop แสดงไฟล์ของวิชาที่เลือก -->
          <v-card v-for="(work, index) in selectedCourse.coursework" :key="index" style=" margin-top: 20px; margin-right: 20px; "
            elevation="16" class="fixed-card">
            <v-card-subtitle style="margin-top: 6px;">{{ new Date(work.creationTime).toLocaleDateString('th-TH') }}</v-card-subtitle>
            <v-card-text style="font-size: 20px; margin-top: 0px; margin-bottom: 0px; line-height: 1;">
              {{ work.title }}
            </v-card-text>
            <v-card-text style="font-size: 15px; margin-top: 0px; line-height: 1.2; overflow-y: auto;">
              {{ work.description }}
            </v-card-text>
              <v-card-actions>
                <template v-if="work.materials && work.materials.length > 0">
                  <v-btn
                    v-for="(file, i) in work.materials"
                    :key="i"
                    color="green"
                    variant="outlined"
                    :href="file.driveFile.driveFile.alternateLink"
                    target="_blank"
                  >
                    {{ file.driveFile.driveFile.title }}
                  </v-btn>
                </template>

                <v-btn
                  v-else
                  color="blue"
                  variant="outlined"
                  :href="work.alternateLink"
                  target="_blank"
                >
                  Go to classroom
                </v-btn>
              </v-card-actions>
            </v-card>
        </div>
      </div>
    </div>
</div>
</template>



<style>
.announcement-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;
}

.container-buttons {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  padding: 35px;
}

.btn-with-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.container-info {
  margin: 20px;
}

.fixed-card {
  width: 360px;
  min-width: 320px;
  max-width: 420px;
  min-height: 220px;
  max-height: 260px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 12px;
  overflow: hidden;
}

.line-2 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scroll-area {
  flex: 1 1 auto;        /* กินพื้นที่ที่เหลือระหว่าง subtitle กับ actions */
  min-height: 0;         /* สำคัญมากให้ flex item ยอมยุบ เพื่อให้ scrollbar ทำงาน */
  overflow-y: auto;      /* ✅ เลื่อนแนวตั้ง */
  overflow-x: hidden;
  padding-right: 6px;    /* กัน scrollbar ทับข้อความ */
  margin-top: 4px;
}

.card-body {
  flex: 1 1 auto;
  min-height: 0;         /* สำคัญมาก เพื่อให้ clamp ทำงานใน flex item */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-actions.wrap {
  display: flex;
  flex-wrap: wrap;       /* ✅ ปุ่มหลายอันจะไม่ดันการ์ดล้น */
  gap: 8px;
  max-height: 84px;      /* กันดันสูงเกิน */
  overflow-y: auto;      /* ถ้ายังเยอะมาก ให้เลื่อนในส่วนปุ่มแทน */
}

.announcement-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;      /* ✅ แสดงสูงสุด 2 บรรทัด */
  line-clamp: 2;              /* ✅ มาตรฐานสำหรับ compatibility */
  -webkit-box-orient: vertical;
  line-height: 1.4em;
  max-height: 2.8em;          /* 2 บรรทัด x 1.4em */
  white-space: normal;        /* ✅ ป้องกันการตัดคำผิดพลาด */
  word-break: break-word;
}


.fixed-card .v-card-actions {
  margin-top: auto;        /* ✅ ให้ปุ่มอยู่ล่างสุด */
  padding-top: 8px;
}
</style>
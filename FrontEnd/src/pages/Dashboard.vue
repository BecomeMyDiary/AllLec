<script>
import axios from "axios";

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
      Dashboard
    </div>

    <div v-for="course in courses" :key="course" class="container">
      <v-card elevation="1" class="fixed-card">
        <v-card-item>
          <v-card-title> Network </v-card-title>
          <v-card-subtitle> Date 13/08/2025 </v-card-subtitle>
        </v-card-item>
        <v-card-text> Midterm 23/08/2025 Lecture </v-card-text>
      </v-card>
    </div>

    <v-divider class="my-4" style="margin: 20px"></v-divider>

    
  </div>
</template>

<style scoped>
.container {
  flex-direction: row; /* วางเป็นแนวนอน */
  align-items: flex-start; /* จัดให้ชิดบน */
  gap: 20px; /* เว้นช่องว่างระหว่างการ์ด */
  padding: 20px; /* เว้นจากขอบ */
}

a {
  color: #1976d2;
  text-decoration: underline;
}

a:hover {
  color: #0d47a1;
}
.fixed-card {
  flex: 1;
  height: 200px; /* หรือ height: 250px; ถ้าต้องการตายตัว */
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email : 'kittithatsuper110020@gmail.com',
      courses: [],
      selectedCourse: null,
    }
  },
  mounted() {
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
        const res = await axios.get('http://localhost:3000/announcements', {
          params: { 
            email: this.email,
            courseId: course.id 
          }
        });
        this.selectedCourse.announcements = res.data;
        console.log("✅ ดึงประกาศสำเร็จ:", res.data);
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
        Subject
    </div>

    <div class="container-buttons">
      <!-- ปุ่มเลือกวิชา -->
      <div v-for="course in courses" :key="course" class="btn-with-text">
        <v-btn rounded="circle"
          style="width:150px; height:150px; display:flex; align-items:center; justify-content:center;"
          @click="selectCourse(course)">
          <v-img  width="100" height="100" style="border-radius:50%; object-fit:contain;" />
        </v-btn @click="loadAnnouncements(course.id)">
        <span style="font-size: 20px; margin-top: 20px; font-weight: bold;">
          {{ course.name }}
        </span>
      </div>
    </div>

    <v-divider class="my-4" style="margin: 20px;"></v-divider>

    <!-- แสดงรายละเอียดเมื่อเลือก -->
    <div v-if="selectedCourse" class="container-info">
      <h2 style="font-size: 28px; font-weight: bold;">{{ selectedCourse.name }}</h2>

      <!-- วน loop แสดงไฟล์ของวิชาที่เลือก -->
      <v-card v-for="(announce, index) in selectedCourse.announcements" :key="index" style="margin-left: 20px; margin-top: 20px"
        elevation="16" class="fixed-card">
        <v-card-subtitle style="margin-top: 20px;">{{ new Date(announce.creationTime).toLocaleDateString('th-TH') }}</v-card-subtitle>
        <v-card-text style="font-size: 20px;">
          {{ announce.text }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" variant="outlined" :href="announce.alternateLink" target="_blank" style="font-size: 20px;">
            Go to classroom
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>



<style>
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
  max-width: 400px;
  width: auto;
  height: auto;
}
</style>
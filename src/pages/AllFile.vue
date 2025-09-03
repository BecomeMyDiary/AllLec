<template>
  <div style="font-size: 35px; font-weight: bold; margin-left: 20px; margin-top: 20px;">
    Subject
  </div>

  <div class="container-buttons">
    <!-- ปุ่มเลือกวิชา -->
    <div v-for="subject in subjects" :key="subject.name" class="btn-with-text">
      <v-btn rounded="circle"
        style="width:150px; height:150px; display:flex; align-items:center; justify-content:center;"
        @click="selectSubject(subject.name)">
        <v-img :src="subject.image" width="100" height="100" style="border-radius:50%; object-fit:contain;" />
      </v-btn>
      <span style="font-size: 20px; margin-top: 20px; font-weight: bold;">
        {{ subject.name }}
      </span>
    </div>
  </div>

  <v-divider class="my-4" style="margin: 20px;"></v-divider>

  <!-- แสดงรายละเอียดเมื่อเลือก -->
  <div v-if="selectedSubject" class="container-info">
    <h2 style="font-size: 28px; font-weight: bold;">{{ selectedSubject.name }}</h2>

    <!-- วน loop แสดงไฟล์ของวิชาที่เลือก -->
    <v-card v-for="(file, index) in selectedSubject.files" :key="index" style="margin-left: 20px; margin-top: 20px"
      elevation="16" class="fixed-card">
      <v-card-subtitle style="margin-top: 20px;">{{ file.date }}</v-card-subtitle>
      <v-card-text style="font-size: 20px;">
        {{ file.lecture }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="outlined" :href="file.driveLink" target="_blank" style="font-size: 20px;">
          Download
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [
        {
          name: 'Database',
          image: '/images/images.jpg',
          files: [
            {
              date: '20/07/2025',
              lecture: 'Lecture 4',
              localPDF: 'C:\\Users\\User\\Desktop\\cp\\P2\\Database\\Lec\\L04_EER_Model_student.pdf',
              driveLink: 'https://drive.google.com/file/d/xxx/view'
            },
            {
              date: '25/07/2025',
              lecture: 'Lecture 5',
              localPDF: 'C:\\Users\\User\\Desktop\\cp\\P2\\Database\\Lec\\L05_Relational_Model.pdf',
              driveLink: 'https://drive.google.com/file/d/yyy/view'
            }
          ]
        },
        {
          name: 'OS',
          image: '/images/images.jpg',
          files: [
            {
              date: '21/07/2025',
              lecture: 'Lecture 5',
              localPDF: 'C:\\Users\\User\\Desktop\\cp\\P2\\OS\\Lec\\L05_OS.pdf',
              driveLink: 'https://youtube.com'
            }
          ]
        }
      ],
      selectedSubject: null
    }
  },
  methods: {
    selectSubject(name) {
      this.selectedSubject = this.subjects.find(s => s.name === name)
    }
  }
}
</script>

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
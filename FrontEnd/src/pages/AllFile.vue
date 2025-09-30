<script>
import axios from 'axios';

export default{
  data(){
    return{
      subjects: [],
      selectedSubject: null,
    };
  },
  //run when load page
  mounted(){
    axios.get('http://localhost:3000/subjects')
      .then(res => {
        this.subjects = res.data;
      })
      .catch(error => {
        console.error('API error:', error);
      });
  },
  //function
  methods: {
    selectSubject(subject) {
      this.selectedSubject = subject;
    },
  }
};
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
      <div v-for="subject in subjects" :key="subject" class="btn-with-text">
        <v-btn rounded="circle"
          style="width:150px; height:150px; display:flex; align-items:center; justify-content:center;"
          @click="selectSubject(subject)">
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
        <v-card-subtitle style="margin-top: 20px;">{{ new Date(file.up_date).toLocaleDateString('th-TH') }}</v-card-subtitle>
        <v-card-text style="font-size: 20px;">
          {{ file.descri }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" variant="outlined" :href="file.link" target="_blank" style="font-size: 20px;">
            Download
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
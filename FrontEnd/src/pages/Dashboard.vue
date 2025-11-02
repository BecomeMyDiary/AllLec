<template>
  <div>
    <div style="
        font-size: 35px;
        font-weight: bold;
        margin-left: 20px;
        margin-top: 20px;
      ">
      Dashboard
    </div>

    <div class="container">
      <v-card class="fixed-card">
        <v-card-item>
          <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
          <div class="card-header">
            <v-avatar style="margin-top: 10px" size="40" rounded="0">
              <v-img :src="announceIcon" alt="Announce icon" />
            </v-avatar>
            <v-card-title>OS</v-card-title>
          </div>

          <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
        </v-card-item>

        <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
      </v-card>

      <v-card class="fixed-card">
        <v-card-item>
          <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
          <div class="card-header">
            <v-avatar style="margin-top: 10px" size="40" rounded="0">
              <v-img :src="announceIcon" alt="Announce icon" />
            </v-avatar>
            <v-card-title>SA</v-card-title>
          </div>

          <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
        </v-card-item>

        <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
      </v-card>

      <v-card class="fixed-card">
        <v-card-item>
          <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
          <div class="card-header">
            <v-avatar style="margin-top: 10px" size="40" rounded="0">
              <v-img :src="announceIcon" alt="Announce icon" />
            </v-avatar>
            <v-card-title>Database</v-card-title>
          </div>
          
        </v-card-item>
        
        <v-card-subtitle>Date 13/08/2025</v-card-subtitle>
        <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
      </v-card>

      <v-card class="fixed-card">
        <v-card-item>
          <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
          <div class="card-header">
            <v-avatar style="margin-top: 10px" size="40" rounded="0">
              <v-img :src="announceIcon" alt="Announce icon" />
            </v-avatar>
            <v-card-title>Network</v-card-title>
          </div>

          <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
        </v-card-item>

        <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
      </v-card>
    </div>



      <v-divider class="my-4" style="margin: 20px"></v-divider>

      <div style="
        font-size: 35px;
        font-weight: bold;
        margin-left: 20px;
        margin-top: 20px;
      ">
        Recent Files
      </div>

      <div class="container">
        <v-card class="fixed-card">
          <v-card-item>
            <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
            <div class="card-header">
              <v-avatar style="margin-top: 10px" size="40" rounded="0">
                <v-img :src="fileIcon" alt="File icon" />
              </v-avatar>
              <v-card-title>Database</v-card-title>
            </div>

            <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
          </v-card-item>

          <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
          <v-btn style="color: green; margin-left: 50px;" variant="outlined">
            Download
          </v-btn>
        </v-card>

        <v-card class="fixed-card">
          <v-card-item>
            <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
            <div class="card-header">
              <v-avatar style="margin-top: 10px" size="40" rounded="0">
                <v-img :src="fileIcon" alt="File icon" />
              </v-avatar>
              <v-card-title>Network</v-card-title>
            </div>

            <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
          </v-card-item>

          <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
          <v-btn style="color: green; margin-left: 50px;" variant="outlined">
            Download
          </v-btn>
        </v-card>

        <v-card  class="fixed-card">
          <v-card-item>
            <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
            <div class="card-header">
              <v-avatar style="margin-top: 10px" size="40" rounded="0">
                <v-img :src="fileIcon" alt="File icon" />
              </v-avatar>
              <v-card-title>Os</v-card-title>
            </div>

            <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
          </v-card-item>

          <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
          <v-btn style="color: green; margin-left: 50px;" variant="outlined">
            Download
          </v-btn>
        </v-card>

        <v-card class="fixed-card">
          <v-card-item>
            <!-- ✅ ครอบไว้ใน div เพื่อจัดเรียงแนวนอน -->
            <div class="card-header">
              <v-avatar style="margin-top: 10px" size="40" rounded="0">
                <v-img :src="fileIcon" alt="File icon" />
              </v-avatar>
              <v-card-title>SA</v-card-title>
            </div>

            <v-card-subtitle style="margin-left: 50px;">Date 13/08/2025</v-card-subtitle>
          </v-card-item>

          <v-card-text style="margin-left: 50px;">Midterm 23/08/2025 Lecture</v-card-text>
          <v-btn style="color: green; margin-left: 50px;" variant="outlined">
            Download
          </v-btn>
        </v-card>
      </div>


    </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
  padding: 20px;
  flex-wrap: wrap;
}

a {
  color: #1976d2;
  text-decoration: underline;
}

a:hover {
  color: #0d47a1;
}

.fixed-card {
  min-height: 200px;
  min-width: 400px;
  border-radius: 15px;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.15),  /* เงาอ่อนตลอดเวลา */
    0 1px 3px rgba(0, 0, 0, 0.08); /* เงาชั้นที่สองดูนุ่มขึ้น */
  transition: all 0.25s ease;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 🔥 เพิ่มส่วนนี้เข้าไปด้านล่างสุดเลย 🔥 */

.fixed-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.25), /* เงาเข้มขึ้นเมื่อ hover */
    0 4px 10px rgba(0, 0, 0, 0.15);
}

.fixed-card:hover .v-card-title {
  color: #ff0000;
  transition: color 0.2s ease;
}
</style>

<script>
export default {
  data() {
    return {
      announceIcon: new URL('@/assets/picture/announce.png', import.meta.url).href,
      fileIcon: new URL('@/assets/picture/file.png', import.meta.url).href
    };
  }
}
</script>
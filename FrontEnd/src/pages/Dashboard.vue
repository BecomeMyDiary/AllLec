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

    <div class="container">
      <v-card elevation="1" class="fixed-card">
        <v-card-item>
          <v-card-title> Network </v-card-title>
          <v-card-subtitle> Date 13/08/2025 </v-card-subtitle>
        </v-card-item>
        <v-card-text> Midterm 23/08/2025 Lecture </v-card-text>
      </v-card>

      <v-card elevation="1" class="fixed-card">
        <v-card-item>
          <v-card-title> Database </v-card-title>
          <v-card-subtitle> Date 13/08/2025 </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          Midterm 31/08/2025 Lecture <br />
          Midterm 07/09/2025 LAB
        </v-card-text>
      </v-card>

      <v-card elevation="1" class="fixed-card">
        <v-card-item>
          <v-card-title> OS </v-card-title>
          <v-card-subtitle> Date 13/08/2025 </v-card-subtitle>
        </v-card-item>
        <v-card-text> Midterm - </v-card-text>
      </v-card>

      <v-card elevation="1" max-width="500" class="fixed-card">
        <v-card-item>
          <v-card-title> SA </v-card-title>
          <v-card-subtitle> Date 13/08/2025 </v-card-subtitle>
        </v-card-item>
        <v-card-text> Midterm 31/08/2025 </v-card-text>
      </v-card>
    </div>

    <v-divider class="my-4" style="margin: 20px"></v-divider>

    <div
      style="
        font-size: 35px;
        font-weight: bold;
        margin-left: 20px;
        margin-top: 20px;
      "
    >
      Recent Files
    </div>

    <div class="container">
      <v-card elevation="1" class="fixed-card">
        <v-card-item>
          <v-card-title> Database </v-card-title>
          <v-card-subtitle> Date 20/07/2025 </v-card-subtitle>
        </v-card-item>
        <v-card-text style="font-size: 20px">
          Lecture 4
          <a href="" download> Download PDF</a>
        </v-card-text>
      <v-card-actions>
        <v-btn
          color="red"
          variant="outlined"
          href="https://drive.google.com/file/d/1N2Dqk2MkGe9uB4eZ__F6K7ndm2_0mQv7/view"
          target="_blank"
          style="font-size: 20px;"
        >
          Download
        </v-btn>

        
    
      </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;    
  flex-direction: row; /* วางเป็นแนวนอน */
  align-items: flex-start; /* จัดให้ชิดบน */
  gap: 20px; /* เว้นช่องว่างระหว่างการ์ด */
  padding: 20px; /* เว้นจากขอบ */
  flex-wrap: wrap; /* ให้การ์ดตัดบรรทัดถ้าหน้าจอเล็ก */
}

a {
  color: #1976d2;
  text-decoration: underline;
}

a:hover {
  color: #0d47a1;
}
.fixed-card {
  min-height: 200px; /* หรือ height: 250px; ถ้าต้องการตายตัว */
  min-width: 400px;
}
</style>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
  console.log('Username:', username.value);
  console.log('Password:', password.value);
};
</script>

<template>
  <div class="login-wrapper">
    <!-- วงกลมตกแต่ง -->
    <div class="circle big top-right"></div>
    <div class="circle medium mid-right"></div>
    <div class="circle small bottom-right"></div>

    <!-- กล่อง Login -->
    <div class="login-box">
      <h1 class="login-title" style="color: black;">Login</h1>
      <p class="login-sub" style="color: black;">
        Welcome back! Login to access the Sweet Marketplace.<br>
        Did you <a href="#" class="forgot-link">forget your password?</a>
      </p>
      <v-form>
        <v-text-field
          v-model="username"
          label="Username"
          variant="underlined"
          density="comfortable"
          color="black"
          hide-details
          class="mb-4"
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="underlined"
          density="comfortable"
          color="black"
          hide-details
          class="mb-6"
        />
        <v-btn
          class="login-btn"
          block
          height="48"
          @click="login"
        >
          CONTINUE
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  position: relative;
  background: white;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* จัด login กลางจอ */
.login-center {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
}

/* วงกลมพื้นหลัง */
.circle {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.big {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #FF2BFD,#FFADFD);
}

.medium {
  width: 300px;
  height: 300px;
  background: rgba(0, 170, 255, 0.7);
}

.small {
  width: 100px;
  height: 100px;
  background: #00bfff;
}

/* ตำแหน่งวงกลม */
.top-right {
  top: -240px;
  right: -170px;
}

.mid-right {
  top: 40%;
  right: -150px;
}

.bottom-right {
  bottom: 50px;
  right: 100px;
}

.v-card {
  border-radius: 20px;
}

.login-btn {
  background: linear-gradient(to right, #7b2ff7, #f107a3, #ff6a00);
  color: white;
  font-weight: bold;
}

.forgot-link {
  color: #f107a3;
  text-decoration: underline;
}

:deep(.v-field-label) {
  color: black;
  opacity: 1;
}

:deep(.v-field__outline) {
  border-color: black;
  border-width: 2px;
  opacity: 1;
}
</style>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
  console.log('Username:', username.value);
  console.log('Password:', password.value);
};

const loginWithGoogle = () => {
  // สมมุติ backend รันอยู่ที่พอร์ต 3000
  window.location.href = 'http://localhost:3000/login';
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
      <h1 class="login-title">Login</h1>
      <p class="login-sub" style="margin-bottom: 30px; text-align: center;">
        Did you <a href="#" class="forgot-link">forget your password?</a>
      </p>
      <v-form >
        <v-text-field
          v-model="username"
          label="Username"
          variant="underlined"
          density="comfortable"
          color="black"
          hide-details
          class="mb-4 always-underlined"
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="underlined"
          density="comfortable"
          color="black"
          hide-details
          class="mb-6 always-underlined"
        />
        <v-btn
          class="login-btn"
          block
          height="48"
          @click="login"
        >
          CONTINUE
        </v-btn>
        <p class="login-sub" style="margin-top: 14px; text-align: center;">Don't have an Account? <a href="#" class="forgot-link">Create account</a></p>
        <v-btn
          class="google-login-mini"
          height="36"
          variant="text"
          @click="loginWithGoogle"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width="18"
            height="18"
            style="margin-right: 6px;"
          />
          Sign in with Google
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

.login-title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black; 
  text-align: center; 
  margin-bottom: 30px;
}

.login-title::after{
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(to right, #7b2ff7, #f107a3, #ff6a00);
  margin: 5px auto;
}

.login-sub {
  color: black;
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
  font-size: 16px;
  margin-top: 40px;
  border-radius: 20px;
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

:deep(.v-field__input) {
  color: black !important;
}


:deep(.always-underlined .v-field__outline::after) {
  --v-field-border-width: 1px; /* กำหนดความหนาของเส้น */
  --v-field-border-opacity: 1; /* ทำให้เส้นทึบ ไม่โปร่งใส */
  transform: scaleX(1); /* บังคับให้เส้นแสดงเต็มความยาว */
  border-color: black !important; /* กำหนดให้เส้นเป็นสีดำ */
}

.login-box{
  width: 460px;       /* ความกว้างคงที่ */
  height: 580px;
  position: relative;
  z-index: 1;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* ปุ่ม Google Login */
.google-login-mini {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
  padding: 0 12px;
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.2s ease-in-out;
}

.google-login-mini:hover {
  background-color: #f7f7f7;
  border-color: #ccc;
}


</style>

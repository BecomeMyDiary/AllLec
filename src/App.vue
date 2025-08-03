<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useTheme } from 'vuetify/lib/composables/theme';
import { ref } from 'vue';

const theme = useTheme();
const notificationCount = ref(2);

</script>
<template>
  <v-layout>

    <v-app-bar height="80">
      <template #title>
        <router-link
          to="/"
          style="
          color: inherit;
          text-decoration: none;
          font-size: 2rem;
          font-weight: bold;
          cursor: pointer;
          "
        >
        AllLec
        </router-link>
      </template>
      <v-text-field 
        v-model="search" 
        placeholder="Search file, course ...."
        density="compact"
        hide-details
        single-line
        prepend-inner-icon="mdi-magnify"
        style="max-width: 400px; margin-left: 20px;"
        class="mx-4"
        ></v-text-field>
      <v-btn @click="theme.toggle()" icon="mdi-moon-waning-crescent"></v-btn>
      <v-btn icon>
        <v-badge
          :content="notificationCount"
          color="red"
          overlap
          v-if="notificationCount > 0"
        >
          <template #badge>
            {{ notificationCount }}
          </template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>

    <v-navigation-drawer>
      <div class="nav-title">
        Navigation
      </div>
      <v-list>
        <v-list-item to="/Dashboard">
          <v-list-item-title>AllLec</v-list-item-title>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" md="12">
            <HelloWorld msg="AllLec Here"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-layout>
</template>

<style scoped>
.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 16px;
  padding-top: 12px;
  padding-bottom: 1px;
  text-align: left;
}
</style>

<script setup>
import { useTheme } from 'vuetify';
import { ref } from 'vue';

const theme = useTheme();
const notificationCount = ref(2);
const search = ref('');
</script>

<template>
    <v-app-bar location="top" flat height="80">
        <template #title>
            <router-link
            to="/"
            class="app-title"
            style="
                background: linear-gradient(to right, #FF47D6, #FF78EC, #4564FF, #57E9FF);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-decoration: none;
                padding-left: 10px;
                font-size: 1.9rem;
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
        <v-btn text to="/">About</v-btn>
    </v-app-bar>
</template>
<style scoped> 
.app-title { 
    color: inherit; 
    text-decoration: none; 
    font-size: 2rem; 
    font-weight: bold; 
    } 
</style>
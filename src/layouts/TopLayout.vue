<script setup>
import { useTheme } from 'vuetify/lib/composables/theme';
import { ref } from 'vue';

const theme = useTheme();
const notificationCount = ref(2);
const search = ref('');
</script>

<template>
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
        <v-btn text to="/">About</v-btn>
    </v-app-bar>
</template>
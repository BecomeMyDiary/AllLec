<script setup>
import TopLayout from '@/layouts/TopLayout.vue'
import LeftLayout from '@/layouts/LeftLayout.vue';
</script>

<template>
    <v-layout>
        <TopLayout />
        <LeftLayout />
        <v-main>
            <router-view />
        </v-main>
    </v-layout>
</template>
<script setup>
import TopLayout from '@/layouts/TopLayout.vue'
import LeftLayout from '@/layouts/LeftLayout.vue';
</script>

<template>
    <v-app>
        <v-layout>
            <TopLayout />
            <LeftLayout />
        </v-layout>
    </v-app>
</template>
<style scoped>
:deep(.v-main__wrap) { padding: 0; }
</style>
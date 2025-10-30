<script setup>
import TopLayout from "@/layouts/TopLayout.vue";
import LeftLayout from "@/layouts/LeftLayout.vue";
</script>

<template>
  <v-app>
    <TopLayout />
    <LeftLayout />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>
<style scoped>
:deep(.v-main__wrap) {
  padding: 0;
}
</style>

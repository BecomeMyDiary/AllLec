<script>
import Dashboard from '@/pages/Dashboard.vue';

export default {
  data() {
    return {
        classroomIcon: new URL('@/assets/picture/classroom.png', import.meta.url).href,
        announceIcon: new URL('@/assets/picture/announce.png', import.meta.url).href,
        driveIcon: new URL('@/assets/picture/drive.png', import.meta.url).href,
    };
  },
}
</script>

<template>
    <v-navigation-drawer location="left" permanent width="260">
        <div class="nav-title">Menu</div>
        <v-list nav>
            <!-- Dashboard -->
            <v-list-item to="/dashboard" link>
                <template v-slot:prepend>
                <v-img
                    :src="announceIcon"
                    alt="Annouce icon"
                    width="24"
                    height="24"
                    class="rounded-sm"
                />
                </template>
                <v-list-item-title class="page-text">
                Dashboard
                </v-list-item-title>
            </v-list-item>

            <!-- Classroom -->
            <v-list-item to="/classroom" link>
                <template v-slot:prepend>
                <v-img
                    :src="classroomIcon"
                    alt="Classroom icon"
                    width="24"
                    height="24"
                    class="rounded-sm"
                />
                </template>
                <v-list-item-title class="page-text">
                Classroom
                </v-list-item-title>
            </v-list-item>
            
            <!-- Google Drive -->
            <v-list-item to="/drive" link>
                <template v-slot:prepend>
                <v-img
                    :src="driveIcon"
                    alt="Drive icon"
                    width="24"
                    height="24"
                    class="rounded-sm"
                />
                </template>
                <v-list-item-title class="page-text">
                Google Drive
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <v-divider class="mt-4"></v-divider>
        <div class="nav-title">Recent Files</div>
    </v-navigation-drawer>
</template>

<style scoped>
.nav-title {
    font-size: 1.6rem;
    padding-left: 30px;
    padding-top: 20px;
    font-weight: normal;
}

:deep(.page-text) {
    margin-left: 16px;
    font-size: 1rem;
    display: flex;
}


.v-list-item {
    padding: 15px 20px;
}
</style>
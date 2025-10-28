<template>
    <v-navigation-drawer location="left" permanent width="260">
        <div class="nav-title">Menu</div>
        <v-list nav>
            <v-list-item to="/dashboard" link>
                <v-list-item-title class="page-text"><v-icon start>mdi-home</v-icon>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item to="/allfile" link>
                <v-list-item-title class="page-text"><v-icon start>mdi-file</v-icon>All Files</v-list-item-title>
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
    font-size: 1rem;
}

.v-list-item {
    padding: 15px 20px;
}
</style>
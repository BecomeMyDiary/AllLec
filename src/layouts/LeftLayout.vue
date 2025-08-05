<template>
    <v-navigation-drawer app permanent>
        <div class="nav-title">Menu</div>
        <v-list density="compact" nav>
            <v-list-item to="/" link>
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item to="/allfile" link>
                <v-list-item-title>All Files</v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard" link>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style>
.nav-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 16px;
    color: #1976d2; /* Vuetify primary color */
}
</style>
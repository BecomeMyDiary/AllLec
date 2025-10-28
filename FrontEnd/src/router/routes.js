export const routes = [
    {path: '/', redirect: '/dashboard'},
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children:[
            {
                path: 'dashboard',
                component: () => import('@/pages/Dashboard.vue'),
            },
            {
                path: 'allfile',
                component: () => import('@/pages/AllFile.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('@/layouts/BlankLayout.vue'),
        children: [
            {
                path: 'login',
                component: () => import('@/pages/Login.vue'),
            },
        ],
    },
]
import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserLayout from '@/layouts/UserLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import {useAuthStore} from '@/stores/authStore.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: UserLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView,
                },
                {
                    path: '/dilna',
                    component: () => import('@/views/DilnaView.vue'),
                },
                {
                    path: '/chhuina',
                    component: () => import('@/views/ChhuinaView.vue')
                },
                {
                    path: '/faq',
                    component: () => import('@/views/FaqView.vue')
                },
                {
                    path: '/downloads',
                    component: () => import('@/views/DownloadView.vue')
                }

            ],
        },
        {
            path: '/success',
            name: 'success',
            component: () => import('@/views/SuccessView.vue')
        },
        {
            path: '/dashboard',
            component: AdminLayout,
            meta: {requiresAuth: true, role: ['Admin', 'Manager']}, // Ensure the parent layout is protected
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Dashboard, // Dashboard should be directly under /dashboard
                },


            ],
        },
        {
            path: '/pending',
            component: AdminLayout,
            meta: {requiresAuth: true, role: ['Admin', 'Manager']}, // Ensure the parent layout is protected
            children: [
                {
                    path: '',
                    component: () => import('@/views/admin/Pending/Index.vue'),
                },
                {
                    path: 'view',
                    component: () => import('@/views/admin/Pending/View.vue'),
                },
            ]
        },
        {
            path: '/history',
            component: AdminLayout,
            meta: {requiresAuth: true, role: ['Manager']}, // Ensure the parent layout is protected
            children: [
                {
                    path: '',
                    component: () => import('@/views/admin/History/Index.vue'),
                },
                // {
                //     path: 'view',
                //     component: () => import('@/views/admin/Pending/View.vue'),
                // },
            ]
        },
        {
            path: '/user',
            component: AdminLayout,
            meta: {requiresAuth: true, role: ['Admin', 'Manager']}, // Ensure the parent layout is protected
            children: [
                {
                    path: '',
                    component: () => import('@/views/admin/Users/UserIndex.vue'),
                },
                {
                    path: 'add',
                    component: () => import('@/views/admin/Users/UserAdd.vue')
                },
                {
                    path: 'edit',
                    component: () => import('@/views/admin/Users/UserEdit.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/admin/LoginView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView.vue'),
        },
    ],
});

// 🔐 Navigation Guard
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.checkAuth(); // Ensure authentication state is updated
    console.log(authStore.isAuthenticated);

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        console.warn('🔒 Access denied: Not authenticated');
        next('/login'); // Redirect to login if not authenticated
    } else if (to.meta.role && !to.meta.role.includes(authStore.userRole)) {
        console.warn(`🚫 Unauthorized access: Role mismatch (${authStore.userRole} not in ${to.meta.role})`);
        next('/'); // Redirect unauthorized users to home
    } else if (to.path === '/login' && authStore.isAuthenticated) {
        console.log('🔄 Redirecting authenticated user away from login');
        next('/dashboard');
    } else {
        console.log('✅ Route allowed:', to.path);
        next(); // Proceed to route
    }
});


export default router;

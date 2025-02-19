import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserLayout from '@/layouts/UserLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import { useAuthStore } from '@/stores/authStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '',
          component: HomeView,
        },
      ],
    },
    {
      path: '/dashboard',
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'Admin' }, // Ensure the parent layout is protected
      children: [
        {
          path: '',
          component: Dashboard, // Dashboard should be directly under /dashboard
        },
        {
          path: '/form/index',
          component: () => import('@/views/admin/Form/Index.vue'),
        }
      ],
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
  } else if (to.meta.role && authStore.userRole !== to.meta.role) {
    console.warn(`🚫 Unauthorized access: Role mismatch (${authStore.userRole} != ${to.meta.role})`);
    next('/'); // Redirect unauthorized users to home
  }else if (to.path === '/login' && authStore.isAuthenticated) {
    console.log('🔄 Redirecting authenticated user away from login');
    next('/dashboard')
  } else {
    console.log('✅ Route allowed:', to.path);
    next(); // Proceed to route
  }
});

export default router;

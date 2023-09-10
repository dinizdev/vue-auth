import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/Home.vue") },
    { path: "/404page", component: () => import("../views/404page.vue") },
    { path: "/Register", component: () => import("../views/Register.vue") },
    {
      path: "/Dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: {
        requireAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      router.push("/404page");
      next("/");
    }
  } else {
    next();
  }
});

export default router;

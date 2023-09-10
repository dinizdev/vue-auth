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
const handle404error = () => {
  setTimeout(() => {
    location.href = "/404page";
  }, 2000);
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      handle404error();
      next("/");
    }
  } else {
    next();
  }
});

export default router;

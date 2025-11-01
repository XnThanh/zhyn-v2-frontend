import { createRouter, createWebHistory } from "vue-router";
import LevelSelect from "../components/LevelSelect.vue";
import TopicSelect from "../components/TopicSelect.vue";
import Practice from "../components/Practice.vue";
import Results from "../components/Results.vue";
import ApiPlayground from "../components/ApiPlayground.vue";
import About from "../components/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: LevelSelect,
  },
  {
    path: "/topic",
    name: "TopicSelect",
    component: TopicSelect,
  },
  {
    path: "/practice",
    name: "Practice",
    component: Practice,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
  {
    path: "/playground",
    name: "Playground",
    component: ApiPlayground,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards for debugging
router.beforeEach((to, from, next) => {
  try {
    console.debug("[Router] Navigating", {
      from: from.name || from.path,
      to: to.name || to.path,
      params: to.params,
      query: to.query,
    });
  } catch {}
  next();
});

router.afterEach((to, from, failure) => {
  if (failure) {
    console.error("[Router] Navigation failed", {
      from: from.name || from.path,
      to: to.name || to.path,
      failure,
    });
  }
});

router.onError((error) => {
  console.error("[Router] Error", {
    error,
    message: error.message,
    stack: error.stack,
  });
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import LevelSelect from "../pages/LevelSelect.vue";
import TopicSelect from "../pages/TopicSelect.vue";
import Practice from "../pages/Practice.vue";
import Results from "../pages/Results.vue";
import ApiPlayground from "../components/ApiPlayground.vue";
import About from "../components/About.vue";
import Landing from "../pages/Landing.vue";
import HelpGuide from "../components/HelpGuide.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: { hideNavbar: true },
  },
  {
    path: "/level",
    name: "LevelSelect",
    component: LevelSelect,
  },
  {
    path: "/topic",
    name: "TopicSelect",
    component: TopicSelect,
    meta: { transition: "slide-left" },
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
  {
    path: "/help",
    name: "Help",
    component: HelpGuide,
    meta: { transition: "slide-up" },
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

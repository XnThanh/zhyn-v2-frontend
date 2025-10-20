import { createRouter, createWebHistory } from "vue-router";
import LevelSelect from "../components/LevelSelect.vue";
import PracticePage from "../components/PracticePage.vue";
import ApiPlayground from "../components/ApiPlayground.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: LevelSelect,
  },
  {
    path: "/practice",
    name: "Practice",
    component: PracticePage,
  },
  {
    path: "/playground",
    name: "Playground",
    component: ApiPlayground,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

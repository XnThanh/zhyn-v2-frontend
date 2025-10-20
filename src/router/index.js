import { createRouter, createWebHistory } from "vue-router";
import LevelSelect from "../components/LevelSelect.vue";
import TopicSelect from "../components/TopicSelect.vue";
import PracticePage from "../components/PracticePage.vue";
import ApiPlayground from "../components/ApiPlayground.vue";

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

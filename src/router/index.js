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

export default router;

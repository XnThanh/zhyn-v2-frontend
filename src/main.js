import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Global Vue error handler
app.config.errorHandler = (err, instance, info) => {
  try {
    console.error("[Vue] Uncaught error", {
      err,
      info,
      component: instance?.$?.type?.name || instance?.$?.type,
    });
  } catch {
    console.error("[Vue] Uncaught error", err);
  }
};

// Global window error handlers
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    console.error("[Window] Error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("[Window] Unhandled Promise Rejection", {
      reason: event.reason,
    });
  });
}

app.use(router).mount("#app");

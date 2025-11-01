// Lightweight API client for JSON POST requests
// Base URL is configurable via VITE_API_BASE_URL; defaults to '/api' for dev proxy

const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

let baseURL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : DEFAULT_BASE_URL;

/**
 * Join base URL and path safely (avoids duplicate slashes)
 * @param {string} base
 * @param {string} path
 */
function joinURL(base, path) {
  if (!base) return path;
  if (!path) return base;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

/**
 * Set the API base URL at runtime (optional)
 * @param {string} url
 */
export function setBaseURL(url) {
  baseURL = url || DEFAULT_BASE_URL;
}

/**
 * Get the current API base URL
 */
export function getBaseURL() {
  return baseURL;
}

/**
 * POST JSON to an API endpoint and return parsed JSON.
 * If server returns { error: string }, we throw an Error with that message.
 * @template T
 * @param {string} path - path relative to baseURL (e.g., '/ZhuyinDictionary/register')
 * @param {any} body - JSON-serializable body
 * @returns {Promise<T>}
 */
export async function post(path, body) {
  const url = joinURL(baseURL, path);
  const isDev = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV;
  const start = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();

  // Dev: log outgoing request
  if (isDev) {
    try {
      console.debug("[API] → POST", url, {
        bodyPreview: JSON.stringify(body)?.slice(0, 500),
      });
    } catch {}
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ?? {}),
    credentials: "include", // in case backend uses cookies/session
  });

  let data;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    // Not JSON
    const duration = ((typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now()) - start;
    console.error("[API] ✖ Parse error", {
      url,
      status: res.status,
      durationMs: Math.round(duration),
      responsePreview: text?.slice(0, 500),
    });
    throw new Error(`Unexpected response format (${res.status}): ${text}`);
  }

  if (!res.ok) {
    const msg = data && data.error ? data.error : `HTTP ${res.status}`;
    const duration = ((typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now()) - start;
    console.error("[API] ✖ HTTP error", {
      url,
      status: res.status,
      durationMs: Math.round(duration),
      message: msg,
      payloadPreview: (() => { try { return JSON.stringify(body)?.slice(0, 500); } catch { return undefined; } })(),
      responsePreview: (() => { try { return JSON.stringify(data)?.slice(0, 500); } catch { return undefined; } })(),
    });
    throw new Error(msg);
  }

  if (data && typeof data === "object" && "error" in data && data.error) {
    const duration = ((typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now()) - start;
    console.error("[API] ✖ API error", {
      url,
      status: res.status,
      durationMs: Math.round(duration),
      apiError: data.error,
    });
    throw new Error(data.error);
  }
  if (isDev) {
    const duration = ((typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now()) - start;
    try {
      console.debug("[API] ✓", url, {
        status: res.status,
        durationMs: Math.round(duration),
      });
    } catch {}
  }
  return /** @type {T} */ (data);
}

export default { post, setBaseURL, getBaseURL };

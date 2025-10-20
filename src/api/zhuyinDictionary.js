import { post } from "./client";

// ZhuyinDictionary API

/** Register a new character and its Zhuyin representation */
export function register({ character, zhuyinRep }) {
  return post("/ZhuyinDictionary/register", { character, zhuyinRep });
}

/** Unregister an existing character */
export function unregister({ character }) {
  return post("/ZhuyinDictionary/unregister", { character });
}

/** Get the Zhuyin representation for a character */
export function getAnswer({ character }) {
  return post("/ZhuyinDictionary/getAnswer", { character });
}

/** Lookup characters by full or prefix Zhuyin representation */
export function lookupZhuyin({ zhuyinRep }) {
  return post("/ZhuyinDictionary/lookupZhuyin", { zhuyinRep });
}

export default { register, unregister, getAnswer, lookupZhuyin };

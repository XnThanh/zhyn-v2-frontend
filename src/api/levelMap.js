import { post } from "./client";

// LevelMap API

/** Create a new learning level */
export function createLevel({ levelName }) {
  return post("/LevelMap/createLevel", { levelName });
}

/** Add a character to a level */
export function addCharacter({ levelName, character }) {
  return post("/LevelMap/addCharacter", { levelName, character });
}

/** Remove a character from a level */
export function removeCharacter({ levelName, character }) {
  return post("/LevelMap/removeCharacter", { levelName, character });
}

/** Generate sentences for a level and topic */
export function generateSentences({ levelName, topic }) {
  return post("/LevelMap/generateSentences", { levelName, topic });
}

export default {
  createLevel,
  addCharacter,
  removeCharacter,
  generateSentences,
};

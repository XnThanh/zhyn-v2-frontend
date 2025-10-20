import { post } from "./client";

// Quiz API

/** Create a new quiz with duration length (number, e.g., milliseconds or seconds as backend expects) */
export function makeQuiz({ length }) {
  return post("/Quiz/makeQuiz", { length });
}

/** End quiz and get summary */
export function endQuiz({ quizId }) {
  return post("/Quiz/endQuiz", { quizId });
}

/** Register a question in a quiz */
export function registerQuestion({ quizId, character, targetZhuyinRep }) {
  return post("/Quiz/registerQuestion", { quizId, character, targetZhuyinRep });
}

/** Start a specific question */
export function startQuestion({ quizId, questionId }) {
  return post("/Quiz/startQuestion", { quizId, questionId });
}

/** Submit an answer for the currently active question */
export function submitAnswer({ quizId, questionId, response }) {
  return post("/Quiz/submitAnswer", { quizId, questionId, response });
}

export default {
  makeQuiz,
  endQuiz,
  registerQuestion,
  startQuestion,
  submitAnswer,
};

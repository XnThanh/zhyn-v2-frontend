<script setup>
import { ref } from "vue";
import apiClient from "../api/client";
import * as dict from "../api/zhuyinDictionary";
import * as quiz from "../api/quiz";
import * as level from "../api/levelMap";

const baseURL = ref(apiClient.getBaseURL());

function updateBaseURL() {
  apiClient.setBaseURL(baseURL.value);
}

// Shared state for displaying results
const loading = ref(false);
const lastResult = ref(null);
const lastError = ref("");

async function run(fn, payload) {
  loading.value = true;
  lastError.value = "";
  lastResult.value = null;
  try {
    const res = await fn(payload);
    lastResult.value = res;
  } catch (e) {
    lastError.value = e?.message || String(e);
  } finally {
    loading.value = false;
  }
}

// ZhuyinDictionary
const character = ref("你");
const zhuyinRep = ref("ㄋㄧˇ");

// Quiz
const length = ref(60);
const quizId = ref("");
const questionId = ref("");
const targetZhuyinRep = ref("ㄋㄧˇ");
const response = ref("");

// LevelMap
const levelName = ref("Level 1");
const topic = ref("greetings");
</script>

<template>
  <div class="api-playground">
    <h2>API Playground</h2>

    <div class="row">
      <label>Base URL</label>
      <input v-model="baseURL" @change="updateBaseURL" />
      <small>Default is '/api' (proxied to http://localhost:8000)</small>
    </div>

    <section>
      <h3>ZhuyinDictionary</h3>
      <div class="row">
        <label>Character</label>
        <input v-model="character" />
        <label>Zhuyin</label>
        <input v-model="zhuyinRep" />
      </div>
      <div class="buttons">
        <button
          :disabled="loading"
          @click="run(dict.register, { character, zhuyinRep })"
        >
          register
        </button>
        <button
          :disabled="loading"
          @click="run(dict.unregister, { character })"
        >
          unregister
        </button>
        <button :disabled="loading" @click="run(dict.getAnswer, { character })">
          getAnswer
        </button>
        <button
          :disabled="loading"
          @click="run(dict.lookupZhuyin, { zhuyinRep })"
        >
          lookupZhuyin
        </button>
      </div>
    </section>

    <section>
      <h3>Quiz</h3>
      <div class="row">
        <label>Length</label>
        <input type="number" v-model.number="length" />
        <label>Quiz ID</label>
        <input v-model="quizId" />
        <label>Question ID</label>
        <input v-model="questionId" />
      </div>
      <div class="row">
        <label>Character</label>
        <input v-model="character" />
        <label>Target Zhuyin</label>
        <input v-model="targetZhuyinRep" />
        <label>Response</label>
        <input v-model="response" />
      </div>
      <div class="buttons">
        <button :disabled="loading" @click="run(quiz.makeQuiz, { length })">
          makeQuiz
        </button>
        <button :disabled="loading" @click="run(quiz.endQuiz, { quizId })">
          endQuiz
        </button>
        <button
          :disabled="loading"
          @click="
            run(quiz.registerQuestion, { quizId, character, targetZhuyinRep })
          "
        >
          registerQuestion
        </button>
        <button
          :disabled="loading"
          @click="run(quiz.startQuestion, { quizId, questionId })"
        >
          startQuestion
        </button>
        <button
          :disabled="loading"
          @click="run(quiz.submitAnswer, { quizId, questionId, response })"
        >
          submitAnswer
        </button>
      </div>
    </section>

    <section>
      <h3>LevelMap</h3>
      <div class="row">
        <label>Level Name</label>
        <input v-model="levelName" />
        <label>Topic</label>
        <input v-model="topic" />
      </div>
      <div class="buttons">
        <button
          :disabled="loading"
          @click="run(level.createLevel, { levelName })"
        >
          createLevel
        </button>
        <button
          :disabled="loading"
          @click="run(level.addCharacter, { levelName, character })"
        >
          addCharacter
        </button>
        <button
          :disabled="loading"
          @click="run(level.removeCharacter, { levelName, character })"
        >
          removeCharacter
        </button>
        <button
          :disabled="loading"
          @click="run(level.generateSentences, { levelName, topic })"
        >
          generateSentences
        </button>
      </div>
    </section>

    <section>
      <h3>Result</h3>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <pre v-if="lastResult">{{ JSON.stringify(lastResult, null, 2) }}</pre>
        <pre v-else-if="lastError" class="error">{{ lastError }}</pre>
        <pre v-else class="muted">No result yet</pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.api-playground {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
section {
  margin-top: 1rem;
}
.row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
label {
  font-size: 0.9rem;
  color: #555;
}
input {
  padding: 0.25rem 0.5rem;
}
.buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
pre {
  background: #111;
  color: #0f0;
  padding: 0.5rem;
  border-radius: 4px;
  max-height: 300px;
  overflow: auto;
}
.error {
  color: #f66;
}
.muted {
  color: #888;
}
</style>

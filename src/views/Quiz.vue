<script setup>
import { ref, computed, onMounted } from 'vue'
import { countries, formatPopulation } from '../data/countries'

const quizTypes = [
  { id: 'flag', name: 'Guess the Flag', icon: '🏳️' },
  { id: 'capital', name: 'Guess the Capital', icon: '🏛️' },
  { id: 'population', name: 'Higher or Lower', icon: '📊' }
]

const selectedQuiz = ref('flag')
const score = ref(0)
const totalQuestions = ref(0)
const currentQuestion = ref(null)
const selectedAnswer = ref(null)
const isAnswered = ref(false)
const gameStarted = ref(false)
const gameEnded = ref(false)
const questionsRemaining = ref(10)

const shuffledCountries = ref([])

function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function generateFlagQuestion() {
  const correct = shuffledCountries.value[totalQuestions.value]
  const otherCountries = countries.filter(c => c.cca3 !== correct.cca3)
  const wrongAnswers = shuffleArray(otherCountries).slice(0, 3)

  return {
    type: 'flag',
    question: 'Which country does this flag belong to?',
    image: correct.flags.svg,
    options: shuffleArray([correct, ...wrongAnswers]),
    correctAnswer: correct.cca3
  }
}

function generateCapitalQuestion() {
  const correct = shuffledCountries.value[totalQuestions.value]
  if (!correct.capital || correct.capital.length === 0) {
    return generateCapitalQuestion() // Skip countries without capitals
  }

  const otherCountries = countries.filter(c => c.cca3 !== correct.cca3 && c.capital?.length > 0)
  const wrongAnswers = shuffleArray(otherCountries).slice(0, 3)

  return {
    type: 'capital',
    question: `What is the capital of ${correct.name.common}?`,
    options: shuffleArray([
      { name: correct.capital[0], cca3: correct.cca3 },
      ...wrongAnswers.map(c => ({ name: c.capital[0], cca3: c.cca3 }))
    ]),
    correctAnswer: correct.cca3
  }
}

function generatePopulationQuestion() {
  const idx = totalQuestions.value * 2
  if (idx + 1 >= shuffledCountries.value.length) {
    return generateFlagQuestion() // Fallback
  }

  const country1 = shuffledCountries.value[idx]
  const country2 = shuffledCountries.value[idx + 1]

  return {
    type: 'population',
    question: 'Which country has a higher population?',
    country1,
    country2,
    correctAnswer: country1.population > country2.population ? country1.cca3 : country2.cca3
  }
}

function generateQuestion() {
  switch (selectedQuiz.value) {
    case 'flag':
      return generateFlagQuestion()
    case 'capital':
      return generateCapitalQuestion()
    case 'population':
      return generatePopulationQuestion()
    default:
      return generateFlagQuestion()
  }
}

function startGame() {
  shuffledCountries.value = shuffleArray(countries)
  score.value = 0
  totalQuestions.value = 0
  questionsRemaining.value = 10
  gameStarted.value = true
  gameEnded.value = false
  nextQuestion()
}

function nextQuestion() {
  if (questionsRemaining.value <= 0) {
    gameEnded.value = true
    return
  }

  selectedAnswer.value = null
  isAnswered.value = false
  currentQuestion.value = generateQuestion()
}

function selectAnswer(answer) {
  if (isAnswered.value) return

  selectedAnswer.value = answer
  isAnswered.value = true
  totalQuestions.value++
  questionsRemaining.value--

  if (answer === currentQuestion.value.correctAnswer) {
    score.value++
  }
}

function getScoreMessage() {
  const percentage = (score.value / 10) * 100
  if (percentage === 100) return '🏆 Perfect Score! Geography Master!'
  if (percentage >= 80) return '🌟 Excellent! You really know your countries!'
  if (percentage >= 60) return '👍 Good job! Keep exploring the world!'
  if (percentage >= 40) return '📚 Not bad! Room for improvement!'
  return '🌍 Keep learning! The world is fascinating!'
}

const accuracy = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <section class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
        Geography Quiz
      </h1>
      <p class="text-slate-600 dark:text-slate-400">
        Test your knowledge of countries around the world
      </p>
    </section>

    <!-- Quiz Selection -->
    <section v-if="!gameStarted" class="space-y-6">
      <div class="card p-6">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Choose a Quiz Type</h2>
        <div class="grid sm:grid-cols-3 gap-4">
          <button
            v-for="quiz in quizTypes"
            :key="quiz.id"
            @click="selectedQuiz = quiz.id"
            class="p-4 rounded-lg border-2 transition-colors text-center"
            :class="selectedQuiz === quiz.id
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'"
          >
            <span class="text-3xl mb-2 block">{{ quiz.icon }}</span>
            <span class="font-medium text-slate-900 dark:text-white">{{ quiz.name }}</span>
          </button>
        </div>
      </div>

      <div class="text-center">
        <button @click="startGame" class="btn btn-primary text-lg px-8 py-3">
          Start Quiz
        </button>
      </div>
    </section>

    <!-- Game Ended -->
    <section v-else-if="gameEnded" class="text-center">
      <div class="card p-8 mb-6">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quiz Complete!</h2>
        <div class="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          {{ score }}/10
        </div>
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-4">
          {{ accuracy }}% Accuracy
        </p>
        <p class="text-lg text-slate-700 dark:text-slate-300">
          {{ getScoreMessage() }}
        </p>
      </div>

      <div class="flex justify-center gap-4">
        <button @click="startGame" class="btn btn-primary">
          Play Again
        </button>
        <button @click="gameStarted = false" class="btn btn-secondary">
          Choose Different Quiz
        </button>
      </div>
    </section>

    <!-- Active Game -->
    <section v-else>
      <!-- Score Bar -->
      <div class="card p-4 mb-6 flex justify-between items-center">
        <div class="text-slate-600 dark:text-slate-400">
          Question <span class="font-semibold text-slate-900 dark:text-white">{{ 11 - questionsRemaining }}</span> of 10
        </div>
        <div class="text-slate-600 dark:text-slate-400">
          Score: <span class="font-semibold text-primary-600 dark:text-primary-400">{{ score }}</span>
        </div>
      </div>

      <!-- Question -->
      <div class="card p-6 mb-6">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
          {{ currentQuestion?.question }}
        </h2>

        <!-- Flag Question -->
        <div v-if="currentQuestion?.type === 'flag'" class="text-center">
          <img
            :src="currentQuestion.image"
            :alt="'Mystery flag'"
            class="w-64 h-40 object-cover mx-auto rounded-lg shadow-lg mb-6"
          />
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="option in currentQuestion.options"
              :key="option.cca3"
              @click="selectAnswer(option.cca3)"
              class="p-4 rounded-lg border-2 transition-colors font-medium"
              :class="{
                'border-slate-200 dark:border-slate-700 hover:border-primary-300': !isAnswered,
                'border-green-500 bg-green-50 dark:bg-green-900/20': isAnswered && option.cca3 === currentQuestion.correctAnswer,
                'border-red-500 bg-red-50 dark:bg-red-900/20': isAnswered && selectedAnswer === option.cca3 && option.cca3 !== currentQuestion.correctAnswer,
                'opacity-50': isAnswered && option.cca3 !== currentQuestion.correctAnswer && selectedAnswer !== option.cca3
              }"
              :disabled="isAnswered"
            >
              {{ option.name.common }}
            </button>
          </div>
        </div>

        <!-- Capital Question -->
        <div v-else-if="currentQuestion?.type === 'capital'" class="text-center">
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="option in currentQuestion.options"
              :key="option.cca3"
              @click="selectAnswer(option.cca3)"
              class="p-4 rounded-lg border-2 transition-colors font-medium"
              :class="{
                'border-slate-200 dark:border-slate-700 hover:border-primary-300': !isAnswered,
                'border-green-500 bg-green-50 dark:bg-green-900/20': isAnswered && option.cca3 === currentQuestion.correctAnswer,
                'border-red-500 bg-red-50 dark:bg-red-900/20': isAnswered && selectedAnswer === option.cca3 && option.cca3 !== currentQuestion.correctAnswer,
                'opacity-50': isAnswered && option.cca3 !== currentQuestion.correctAnswer && selectedAnswer !== option.cca3
              }"
              :disabled="isAnswered"
            >
              {{ option.name }}
            </button>
          </div>
        </div>

        <!-- Population Question -->
        <div v-else-if="currentQuestion?.type === 'population'" class="text-center">
          <div class="grid grid-cols-2 gap-6">
            <button
              @click="selectAnswer(currentQuestion.country1.cca3)"
              class="card p-4 transition-colors"
              :class="{
                'hover:ring-2 hover:ring-primary-500': !isAnswered,
                'ring-2 ring-green-500': isAnswered && currentQuestion.country1.cca3 === currentQuestion.correctAnswer,
                'ring-2 ring-red-500': isAnswered && selectedAnswer === currentQuestion.country1.cca3 && currentQuestion.country1.cca3 !== currentQuestion.correctAnswer
              }"
              :disabled="isAnswered"
            >
              <img :src="currentQuestion.country1.flags.svg" class="w-full h-32 object-cover rounded mb-3"/>
              <p class="font-semibold text-slate-900 dark:text-white">{{ currentQuestion.country1.name.common }}</p>
              <p v-if="isAnswered" class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {{ formatPopulation(currentQuestion.country1.population) }}
              </p>
            </button>
            <button
              @click="selectAnswer(currentQuestion.country2.cca3)"
              class="card p-4 transition-colors"
              :class="{
                'hover:ring-2 hover:ring-primary-500': !isAnswered,
                'ring-2 ring-green-500': isAnswered && currentQuestion.country2.cca3 === currentQuestion.correctAnswer,
                'ring-2 ring-red-500': isAnswered && selectedAnswer === currentQuestion.country2.cca3 && currentQuestion.country2.cca3 !== currentQuestion.correctAnswer
              }"
              :disabled="isAnswered"
            >
              <img :src="currentQuestion.country2.flags.svg" class="w-full h-32 object-cover rounded mb-3"/>
              <p class="font-semibold text-slate-900 dark:text-white">{{ currentQuestion.country2.name.common }}</p>
              <p v-if="isAnswered" class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {{ formatPopulation(currentQuestion.country2.population) }}
              </p>
            </button>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <div v-if="isAnswered" class="text-center">
        <button @click="nextQuestion" class="btn btn-primary">
          {{ questionsRemaining > 0 ? 'Next Question' : 'See Results' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

// LayoutTextFlip component props
const text = ref('Welcome to')
const words = ref(['Careerly', 'Your Future', 'Success', 'Growth'])
const duration = ref(3000)

const currentIndex = ref(0)

let intervalId: number | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % words.value.length
  }, duration.value)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center pt-20 px-4 pb-10">
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
      class="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row"
    >
      <!-- LayoutTextFlip Component -->
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <Motion
          layoutId="subtext"
          class="text-2xl font-bold tracking-tight drop-shadow-lg md:text-7xl"
        >
          {{ text }}
        </Motion>

        <Motion
          layout
          class="relative w-fit overflow-hidden rounded-md border border-transparent bg-blue-600 px-4 py-2 font-sans text-xl font-bold tracking-tight text-white shadow-sm ring shadow-black/10 ring-blue/10 drop-shadow-lg md:text-6xl"
        >
          <AnimatePresence mode="popLayout">
            <Motion
              :key="currentIndex"
              :initial="{ y: -40, filter: 'blur(10px)' }"
              :animate="{ y: 0, filter: 'blur(0px)' }"
              :exit="{ y: 50, filter: 'blur(10px)', opacity: 0 }"
              :transition="{ duration: 0.5 }"
              class="inline-block whitespace-nowrap"
            >
              {{ words[currentIndex] }}
            </Motion>
          </AnimatePresence>
        </Motion>
      </div>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.3, ease: 'easeOut' }"
      class="mt-4 text-center text-lg text-neutral-900 max-w-2xl"
    >
      Your gateway to exciting career opportunities. Experience the power of modern career
      development that brings your professional dreams to life.
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
      :whileHover="{ scale: 1.05, y: -2 }"
      :whileTap="{ scale: 0.98 }"
    >
      <router-link
        to="/"
        class="mt-8 inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Explore Jobs
        <Motion
          :animate="{ x: [0, 4, 0] }"
          :transition="{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }"
          class="ml-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Motion>
      </router-link>
    </Motion>
  </div>
</template>

<style scoped></style>

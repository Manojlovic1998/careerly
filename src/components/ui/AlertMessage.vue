<script setup lang="ts">
interface Props {
  type?: 'error' | 'warning' | 'info' | 'success'
  title: string
  message?: string
  showRetry?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'error',
  showRetry: false,
})

const emit = defineEmits<{
  retry: []
}>()

const typeClasses = {
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
}

const buttonClasses = {
  error: 'bg-red-600 hover:bg-red-700',
  warning: 'bg-yellow-600 hover:bg-yellow-700',
  info: 'bg-blue-600 hover:bg-blue-700',
  success: 'bg-green-600 hover:bg-green-700',
}
</script>

<template>
  <div :class="['border rounded-lg p-6 text-center', typeClasses[type]]">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <p v-if="message" class="mb-4">{{ message }}</p>
    <button
      v-if="showRetry"
      @click="emit('retry')"
      :class="['px-4 py-2 text-white rounded-lg transition-colors', buttonClasses[type]]"
    >
      Try Again
    </button>
  </div>
</template>

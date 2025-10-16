<script setup lang="ts">
interface Props {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  message: 'Loading...',
  size: 'md',
})

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div :class="['animate-spin rounded-full border-b-2 border-blue-600', sizeClasses[size]]"></div>
    <span class="ml-3 text-gray-600">{{ message }}</span>
  </div>
</template>

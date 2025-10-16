<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useSearch } from '@/composables/useSearch'

const searchInput = ref<HTMLInputElement | null>(null)
const isMobileMenuOpen = ref(false)
const isSearchFocused = ref(false)
const searchValue = ref('')

// Use the search composable
const { searchQuery: globalSearchQuery, setSearchQuery } = useSearch()

// Watch for changes in global search query and update local search value
watch(
  globalSearchQuery,
  (newValue) => {
    searchValue.value = newValue
  },
  { immediate: true },
)

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleSearchFocus = () => {
  isSearchFocused.value = true
}

const handleSearchBlur = () => {
  isSearchFocused.value = false
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchValue.value = target.value

  // If the input is cleared, immediately update the global search state
  if (target.value === '') {
    setSearchQuery('')
  }
}

const handleSearchSubmit = (event: Event) => {
  event.preventDefault()
  if (searchValue.value.trim()) {
    setSearchQuery(searchValue.value.trim())
  }
}

const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearchSubmit(event)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between py-4">
      <!-- Mobile menu button -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-300 hover:text-gray-900 hover:border-gray-500"
        aria-label="Toggle navigation"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Logo -->
      <router-link
        to="/"
        class="text-xl font-bold text-white px-4 py-2 bg-blue-600 hover:text-gray-100 rounded-md"
      >
        Careerly
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex lg:items-center lg:justify-between w-full">
        <!-- Search Form -->
        <div class="flex-1 flex justify-center">
          <form @submit="handleSearchSubmit" class="relative max-w-md" role="search">
            <div class="relative">
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
              <input
                ref="searchInput"
                v-model="searchValue"
                @focus="handleSearchFocus"
                @blur="handleSearchBlur"
                @input="handleSearchInput"
                @keydown="handleSearchKeydown"
                class="w-full pl-10 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                type="search"
                placeholder="Search jobs..."
                aria-label="Search"
              />
              <kbd
                v-show="!isSearchFocused && !searchValue"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs text-gray-600"
              >
                Ctrl+K
              </kbd>
            </div>
          </form>
        </div>

        <!-- Navigation Links -->
        <div class="flex space-x-6">
          <router-link
            to="/job-board"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-blue-600 bg-blue-50"
          >
            Job Board
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation Menu -->
    <div :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }" class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
        <!-- Mobile Search -->
        <form @submit="handleSearchSubmit" class="mb-4" role="search">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
            <input
              v-model="searchValue"
              @keydown="handleSearchKeydown"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              type="search"
              placeholder="Search jobs..."
              aria-label="Search"
            />
          </div>
        </form>

        <!-- Mobile Navigation Links -->
        <router-link
          to="/job-board"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          active-class="text-blue-600 bg-blue-50"
          @click="isMobileMenuOpen = false"
        >
          Job Board
        </router-link>
      </div>
    </div>
  </header>

  <!-- Main content area where routes will be rendered -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <router-view />
  </main>
</template>

<style scoped>
/* Additional styles can be added here */
</style>

import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Global search state
const globalSearchQuery = ref('')

export function useSearch() {
  const router = useRouter()
  const route = useRoute()

  // Update search query and navigate to job board if not already there
  const setSearchQuery = (query: string) => {
    globalSearchQuery.value = query

    // If not on job board, navigate there with search query
    if (route.path !== '/job-board') {
      router.push({
        path: '/job-board',
        query: { search: query },
      })
    } else {
      // Update URL query param
      router.replace({
        path: '/job-board',
        query: { ...route.query, search: query || undefined },
      })
    }
  }

  // Initialize search from URL query params
  const initializeSearchFromRoute = () => {
    const searchParam = route.query.search as string
    if (searchParam) {
      globalSearchQuery.value = searchParam
    }
  }

  // Clear search
  const clearSearch = () => {
    globalSearchQuery.value = ''
    router.replace({
      path: route.path,
      query: { ...route.query, search: undefined },
    })
  }

  return {
    searchQuery: globalSearchQuery,
    setSearchQuery,
    clearSearch,
    initializeSearchFromRoute,
  }
}

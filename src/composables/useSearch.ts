import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ROUTES } from '@/constants'

// Global search state
const globalSearchQuery = ref('')

/**
 * Composable for managing global search state and URL synchronization
 */
export function useSearch() {
  const router = useRouter()
  const route = useRoute()

  /**
   * Update search query and navigate to job board if not already there
   */
  const setSearchQuery = (query: string) => {
    const trimmedQuery = query.trim()
    globalSearchQuery.value = trimmedQuery

    try {
      // If not on job board, navigate there with search query
      if (route.name !== ROUTES.JOB_BOARD) {
        router.push({
          name: ROUTES.JOB_BOARD,
          query: { search: trimmedQuery || undefined },
        })
      } else {
        // Update URL query param
        router.replace({
          name: ROUTES.JOB_BOARD,
          query: { ...route.query, search: trimmedQuery || undefined },
        })
      }
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  /**
   * Initialize search from URL query params
   */
  const initializeSearchFromRoute = () => {
    const searchParam = route.query.search as string
    if (searchParam && typeof searchParam === 'string') {
      globalSearchQuery.value = searchParam.trim()
    }
  }

  /**
   * Clear search query and update URL
   */
  const clearSearch = () => {
    globalSearchQuery.value = ''
    try {
      router.replace({
        path: route.path,
        query: { ...route.query, search: undefined },
      })
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return {
    searchQuery: globalSearchQuery,
    setSearchQuery,
    clearSearch,
    initializeSearchFromRoute,
  }
}

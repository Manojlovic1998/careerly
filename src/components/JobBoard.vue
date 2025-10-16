<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import Fuse from 'fuse.js'
import { jobService } from '@/services/jobService'
import { useSearch } from '@/composables/useSearch'
import type { JobItem } from '@/models/job'

// Reactive state
const jobs = ref<JobItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const totalJobs = ref(0)

// Use shared search state
const { searchQuery, setSearchQuery, initializeSearchFromRoute } = useSearch()

// Fuse.js configuration
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'company.name', weight: 0.25 },
    { name: 'descr', weight: 0.2 },
    { name: 'skills', weight: 0.15 },
    { name: 'employment_type', weight: 0.05 },
    { name: 'experience', weight: 0.05 },
    { name: 'locations.location.text', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
}

// Create Fuse instance
const fuse = ref<Fuse<JobItem> | null>(null)

// Computed property for filtered jobs
const filteredJobs = computed(() => {
  if (!searchQuery.value || !fuse.value) {
    return jobs.value
  }

  const results = fuse.value.search(searchQuery.value)
  return results.map((result) => result.item)
})

// Watch for search query changes
watch(
  searchQuery,
  (newQuery) => {
    if (newQuery.length > 0) {
      console.log(`Searching for: "${newQuery}"`)
      console.log(`Found ${filteredJobs.value.length} results`)
    }
  },
  { immediate: false },
)

// Fetch jobs function
const fetchJobs = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await jobService.getJobs({
      format: 'json',
    })

    jobs.value = response
    totalJobs.value = response.length

    // Initialize Fuse.js with the fetched jobs
    fuse.value = new Fuse(jobs.value, fuseOptions)

    console.log(`Loaded ${jobs.value.length} jobs and initialized search`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch jobs'
    console.error('Error fetching jobs:', err)
  } finally {
    loading.value = false
  }
}

// Load jobs on component mount
onMounted(() => {
  // Initialize search from URL first
  initializeSearchFromRoute()
  fetchJobs()
})

// Utility function to format salary
const formatSalary = (salary: JobItem['salary']) => {
  if (!salary.salary_min && !salary.salary_max) return 'Salary not specified'

  const currency = salary.currency || 'USD'
  const min = salary.salary_min ? `${currency} ${salary.salary_min.toLocaleString()}` : ''
  const max = salary.salary_max ? `${currency} ${salary.salary_max.toLocaleString()}` : ''

  if (min && max) return `${min} - ${max}`
  if (min) return `From ${min}`
  if (max) return `Up to ${max}`
  return 'Salary not specified'
}

// Utility function to format location
const formatLocation = (locations: JobItem['locations']) => {
  if (!locations || locations.length === 0) return 'Location not specified'
  return locations.map((loc) => loc.location.text).join(', ')
}

// Handle search input changes
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  setSearchQuery(target.value)
}
</script>

<template>
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 flex items-center align-middle mt-20">
        Positions you might like

        <!-- info hover -->
        <span class="relative group flex items-center ml-1.5">
          <div
            class="inline-flex items-center justify-center w-5.5 h-5.5 ml-1 text-sm font-medium text-blue-500 hover:text-blue-700 border border-blue-500 hover:border-blue-700 rounded-full cursor-pointer"
          >
            ?
          </div>
          <span
            class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-64 p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            Discover roles that fit your skills, experience, and goals. Ranked by best match using
            our smart scoring system. Update your profile to fine-tune your matches.
          </span>
        </span>
      </h2>

      <!-- Search Input -->
      <div class="mb-6">
        <div class="relative max-w-md">
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
            v-model="searchQuery"
            @input="handleSearchInput"
            type="search"
            placeholder="Search jobs by title, company, skills, or location..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <!-- Job count -->
      <div class="flex items-center justify-between">
        <p v-if="!loading && totalJobs > 0" class="text-black-600">
          <span v-if="searchQuery">
            Showing {{ filteredJobs.length }} of {{ totalJobs }} positions
            <span class="text-gray-500">for "{{ searchQuery }}"</span>
          </span>
          <span v-else> Showing {{ jobs.length }} of {{ totalJobs }} positions </span>
        </p>

        <!-- Clear search -->
        <button
          v-if="searchQuery"
          @click="setSearchQuery('')"
          class="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear search
        </button>
      </div>
    </div>
  </div>
  <!-- Container Fluid -->
  <div class="container-fluid">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600">Loading jobs...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h3 class="text-lg font-semibold text-red-800 mb-2">Error Loading Jobs</h3>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button
        @click="fetchJobs()"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- Jobs List -->
    <div v-else-if="filteredJobs?.length > 0" class="grid grid-cols-1 md:grid-cols-2 py-10 gap-1.5">
      <!-- Job Card -->
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="bg-white rounded-lg border border-gray-200 relative group block p-3 h-full w-full"
      >
        <!-- Job Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1 flex flex-row items-center gap-4">
            <!-- Company Logo -->
            <a :href="job.company.website" target="_blank" rel="noopener noreferrer">
              <img
                v-if="job.company.logo"
                :src="job.company.logo"
                :alt="job.company.name + ' logo'"
                class="w-12 h-12 rounded-lg object-cover"
              />
            </a>
            <div>
              <h3 class="text-xl font-semibold text-gray-900" v-if="job.title">
                {{ job.title }}
              </h3>
              <!-- Location -->
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="flex items -center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ formatLocation(job.locations) }}
                </span>
              </div>

              <!-- <div class="flex items-center space-x-4 text-sm text-gray-600">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ job.company.name }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ formatLocation(job.locations) }}
              </span>
            </div> -->
            </div>
          </div>
        </div>
        <!-- Company Name -->

        <div class="mb-4 relative">
          <img
            :src="job.company.cover"
            :alt="job.company.name + ' cover image'"
            class="w-full h-44 object-cover rounded-lg"
          />
          <span
            class="absolute top-2 left-2 text-sm font-semibold transform px-2 py-1 bg-blue-100 text-blue-800 bg-opacity-50 rounded-md"
          >
            {{ job.company.name }}
          </span>
        </div>
        <div class="flex flex-col items-start">
          <!-- No content wrap -->
          <span
            v-if="job.contact"
            class="flex flex-row items-center bottom-2 left-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200"
          >
            <span class="font-bold flex-inline mr-0.5"> Recruiter: </span>
            <img
              v-if="job.contact.photo"
              :src="job.contact.photo"
              :alt="job.contact.name + ' avatar'"
              class="w-6 h-6 rounded-full object-cover ml-2"
            />
            {{ job.contact.name }}
          </span>
        </div>
        <!-- Job Details -->
        <div class="mb-4 mt-4">
          <div
            class="text-gray-700 line-clamp-3 prose prose-sm max-w-none"
            v-html="job.company.descr"
          ></div>
        </div>

        <!-- Job Meta -->
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center space-x-2 text-gray-800">
            <span
              class="flex flex-row items-center px-3 py-1 bg-white/90 text-gray-800 rounded-full border border-gray-300 shadow-sm"
            >
              {{ job.employment_type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) }}
            </span>
            <span
              class="flex flex-row items-center px-3 py-1 bg-white/90 text-gray-800 rounded-full border border-gray-300 shadow-sm"
            >
              {{ job.experience.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) }}
            </span>
            <span
              class="font-medium flex flex-row items-center text-gray-900 bg-white/90 px-3 py-1 rounded-full border border-gray-300 shadow-sm"
            >
              {{ formatSalary(job.salary) }}
            </span>
          </div>
          <!-- View More Button -->
          <router-link
            :to="{ name: 'job-detail', params: { slug: job.slug } }"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View More
          </router-link>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div v-if="searchQuery && jobs.length > 0">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
        <p class="text-gray-600 mb-4">
          No jobs match your search for "<span class="font-medium">{{ searchQuery }}</span
          >"
        </p>
        <button
          @click="setSearchQuery('')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Clear Search
        </button>
      </div>
      <div v-else>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Jobs Found</h3>
        <p class="text-gray-600">There are currently no job positions available.</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

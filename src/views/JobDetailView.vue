<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jobService } from '@/services/jobService'
import type { JobItem } from '@/models/job'

const route = useRoute()
const router = useRouter()

// Reactive state
const job = ref<JobItem | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Get job slug from route params
const jobSlug = route.params.slug as string

// Fetch job details
const fetchJobDetails = async () => {
  if (!jobSlug) {
    error.value = 'Job not found'
    return
  }

  loading.value = true
  error.value = null

  try {
    // For now, we'll use the existing getJobs method and find by slug
    // In a real API, you'd have a getJobBySlug method
    const response = await jobService.getJobs({ format: 'json' })
    const foundJob = response.find((j: JobItem) => j.slug === jobSlug)

    if (foundJob) {
      job.value = foundJob
    } else {
      error.value = 'Job not found'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch job details'
    console.error('Error fetching job details:', err)
  } finally {
    loading.value = false
  }
}

// Load job on component mount
onMounted(() => {
  fetchJobDetails()
})

// Utility functions
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

const formatLocation = (locations: JobItem['locations']) => {
  if (!locations || locations.length === 0) return 'Location not specified'
  return locations.map((loc) => loc.location.text).join(', ')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Back Button -->
    <button
      @click="goBack"
      class="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Jobs
    </button>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600">Loading job details...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h3 class="text-lg font-semibold text-red-800 mb-2">Error Loading Job</h3>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button
        @click="fetchJobDetails()"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- Job Details -->
    <div v-else-if="job" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header Section -->
      <div class="relative">
        <!-- Company Cover Image -->
        <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <img
            v-if="job.company.cover"
            :src="job.company.cover"
            :alt="job.company.name + ' cover image'"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-30" v-if="!job.company.cover"></div>
        </div>

        <!-- Job Header Info -->
        <div class="relative -mt-16 mx-6">
          <div class="flex items-end space-x-6">
            <!-- Company Logo -->
            <div class="flex-shrink-0">
              <img
                v-if="job.company.logo"
                :src="job.company.logo"
                :alt="job.company.name + ' logo'"
                class="w-24 h-24 rounded-lg border-4 border-white shadow-lg object-cover bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="px-6 py-6">
        <!-- Job Title and Company -->
        <div class="flex-1 pb-4">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
          <div class="flex items-center space-x-4 text-gray-600">
            <span class="text-lg font-medium">{{ job.company.name }}</span>
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
          </div>
        </div>
        <!-- Job Meta Information -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-600 mb-1">Employment Type</h3>
            <p class="text-lg font-semibold text-gray-900">
              {{ job.employment_type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) }}
            </p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-600 mb-1">Experience Level</h3>
            <p class="text-lg font-semibold text-gray-900">
              {{ job.experience.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) }}
            </p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-600 mb-1">Salary Range</h3>
            <p class="text-lg font-semibold text-green-600">{{ formatSalary(job.salary) }}</p>
          </div>
        </div>

        <!-- Job Description -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <div class="prose prose-lg max-w-none text-gray-700" v-html="job.descr"></div>
        </div>

        <!-- Skills Required -->
        <div v-if="job.skills" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Skills Required</h2>
          <div class="prose max-w-none text-gray-700" v-html="job.skills"></div>
        </div>

        <!-- Company Information -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">About {{ job.company.name }}</h2>
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="prose max-w-none text-gray-700 mb-4" v-html="job.company.descr"></div>
            <div v-if="job.company.website" class="mt-4">
              <a
                :href="job.company.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Visit Company Website
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div v-if="job.contact" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div class="bg-blue-50 rounded-lg p-6 flex items-center space-x-4">
            <img
              v-if="job.contact.photo"
              :src="job.contact.photo"
              :alt="job.contact.name + ' photo'"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ job.contact.name }}</h3>
              <p class="text-gray-600">Recruiter</p>
              <div class="mt-2 space-y-1">
                <a
                  :href="`mailto:${job.contact.email}`"
                  class="block text-blue-600 hover:text-blue-800"
                >
                  {{ job.contact.email }}
                </a>
                <p v-if="job.contact.phone" class="text-gray-600">{{ job.contact.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Job Meta Details -->
        <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Job Function</h3>
            <p class="text-gray-700">{{ job.function }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Posted Date</h3>
            <p class="text-gray-700">{{ formatDate(job.dt_created) }}</p>
          </div>
        </div>

        <!-- Apply Section -->
        <div class="border-t pt-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Ready to Apply?</h3>
              <p class="text-gray-600">Click the button below to apply for this position</p>
            </div>
            <a
              :href="job.urls.apply"
              target="_blank"
              rel="noopener noreferrer"
              class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for job detail view */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: inherit;
}
</style>

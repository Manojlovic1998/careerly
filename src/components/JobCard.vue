<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { JobItem } from '@/models/job'
import { formatSalary, formatLocation, formatJobField } from '@/utils/formatters'

interface Props {
  job: JobItem
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
  >
    <!-- Company Header -->
    <div class="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
      <img
        v-if="job.company.cover"
        :src="job.company.cover"
        :alt="job.company.name + ' cover'"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>

    <!-- Card Content -->
    <div class="p-6 relative -mt-8">
      <!-- Company Logo -->
      <div class="flex items-start space-x-4 mb-4">
        <img
          v-if="job.company.logo"
          :src="job.company.logo"
          :alt="job.company.name + ' logo'"
          class="w-16 h-16 rounded-lg border-2 border-white shadow-lg object-cover bg-white flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{{ job.title }}</h3>
          <p class="text-gray-600 font-medium">{{ job.company.name }}</p>
          <p class="text-sm text-gray-500 flex items-center mt-1">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            {{ formatLocation(job.locations) }}
          </p>
        </div>
      </div>

      <!-- Job Description -->
      <div class="mb-4">
        <div
          class="text-gray-700 text-sm line-clamp-3 prose prose-sm max-w-none"
          v-html="job.descr"
        ></div>
      </div>

      <!-- Job Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {{ formatJobField(job.employment_type) }}
        </span>
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          {{ formatJobField(job.experience) }}
        </span>
        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          {{ formatSalary(job.salary) }}
        </span>
      </div>

      <!-- View More Button -->
      <div class="flex justify-end">
        <RouterLink
          :to="{ name: 'job-detail', params: { slug: job.slug } }"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View More
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>

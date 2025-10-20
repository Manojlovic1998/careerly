// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JobItem, JobListResponse } from '@/models/job'

// Base API configuration
const API_BASE_URL = 'https://feed.jobylon.com'
const API_UID = import.meta.env.VITE_API_UID

// API endpoints
const ENDPOINTS = {
  JOBS: '/feeds',
} as const

// Request options interface
export interface JobListParams {
  format: 'json'
}

class JobService {
  private async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data as T
    } catch (error) {
      console.error('API request failed:', error)
      throw new Error(
        `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  /**
   * Fetch a list of jobs with optional filtering and pagination
   */
  async getJobs(
    params: JobListParams = {
      format: 'json',
    },
  ): Promise<JobListResponse> {
    const searchParams = new URLSearchParams()

    // Add parameters to search params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString())
      }
    })

    const url = `${API_BASE_URL}${ENDPOINTS.JOBS}/${API_UID}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

    return this.fetchWithErrorHandling<JobListResponse>(url)
  }
}

// Create and export a singleton instance
export const jobService = new JobService()

// Export the class for testing or custom instances
export default JobService

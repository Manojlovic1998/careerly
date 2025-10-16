import type { JobItem } from '@/models/job'

/**
 * Format salary information for display
 */
export const formatSalary = (salary: JobItem['salary']): string => {
  if (!salary.salary_min && !salary.salary_max) return 'Salary not specified'

  const currency = salary.currency || 'USD'
  const min = salary.salary_min ? `${currency} ${salary.salary_min.toLocaleString()}` : ''
  const max = salary.salary_max ? `${currency} ${salary.salary_max.toLocaleString()}` : ''

  if (min && max) return `${min} - ${max}`
  if (min) return `From ${min}`
  if (max) return `Up to ${max}`
  return 'Salary not specified'
}

/**
 * Format location information for display
 */
export const formatLocation = (locations: JobItem['locations']): string => {
  if (!locations || locations.length === 0) return 'Location not specified'
  return locations.map((loc) => loc.location.text).join(', ')
}

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format employment type and experience for display
 */
export const formatJobField = (field: string): string => {
  return field.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

/**
 * Generate a readable job summary
 */
export const generateJobSummary = (job: JobItem): string => {
  const location = formatLocation(job.locations)
  const salary = formatSalary(job.salary)
  const employmentType = formatJobField(job.employment_type)

  return `${job.title} at ${job.company.name} • ${location} • ${employmentType} • ${salary}`
}

export interface Company {
  id: number
  slug: string
  name: string
  website: string
  logo: string
  cover: string
  descr: string
}

export interface Contact {
  name: string
  email: string
  phone: string
  photo: string | null
}

export interface Location {
  text: string
  city?: string
  country?: string
}

export interface JobLocation {
  location: Location
}

export interface Owner {
  id: number
  name: string
  email: string
}

export interface Salary {
  currency: string | null
  salary_min: number | null
  salary_max: number | null
}

export interface JobUrls {
  ad: string
  apply: string
}

export interface JobItem {
  id: number
  title: string
  slug: string
  descr: string
  skills: string
  company: Company
  contact: Contact
  locations: JobLocation[]
  owner: Owner
  salary: Salary
  urls: JobUrls
  employment_type: string
  experience: string
  function: string
  dt_created: string
  dt_modified: string
  visibility: string
  language: string
}

// Additional utility types that might be useful
export type JobEmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
export type JobExperience = 'entry-level' | 'mid-level' | 'senior-level' | 'executive'
export type JobVisibility = 'public' | 'private' | 'draft'

// Response wrapper for API calls
export type JobListResponse = JobItem[]

export interface JobDetailResponse {
  job: JobItem
}

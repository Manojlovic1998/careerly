// Search configuration
export const SEARCH_CONFIG = {
  FUSE_OPTIONS: {
    keys: [
      { name: 'title', weight: 0.3 },
      { name: 'company.name', weight: 0.2 },
      { name: 'descr', weight: 0.1 },
      { name: 'skills', weight: 0.2 },
      { name: 'function', weight: 0.1 },
      { name: 'locations.location.text', weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    shouldSort: true,
    findAllMatches: true,
    minMatchCharLength: 2,
  },
  DEBOUNCE_DELAY: 300,
}

// UI Constants
export const UI_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  SEARCH_SHORTCUT: ['Ctrl', 'K'],
  LOADING_SPINNER_DELAY: 200,
} as const

// API Configuration
export const API_CONFIG = {
  DEFAULT_FORMAT: 'json',
  REQUEST_TIMEOUT: 10000,
} as const

// Route Names
export const ROUTES = {
  HOME: 'home',
  JOB_BOARD: 'job-board',
  JOB_DETAIL: 'job-detail',
} as const

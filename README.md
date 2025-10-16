# Careerly 🚀

A modern job board application built with Vue 3, TypeScript, and Tailwind CSS. Find your next career opportunity with intelligent search and beautiful UI.

## ✨ Features

- **🔍 Smart Search**: Powered by Fuse.js for intelligent job filtering across multiple fields
- **📱 Responsive Design**: Beautiful mobile-first UI with Tailwind CSS
- **⚡ Fast Performance**: Built with Vue 3 Composition API and Vite
- **🎯 Type Safe**: Full TypeScript integration for better development experience
- **🔗 Deep Linking**: Shareable URLs with search state preservation
- **🎨 Motion Effects**: Smooth animations and transitions
- **♿ Accessible**: Keyboard navigation and screen reader friendly

## 🛠 Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Search**: Fuse.js for fuzzy search
- **Routing**: Vue Router
- **Animation**: Motion-v for text animations
- **Testing**: Vitest + Cypress
- **Linting**: ESLint + Prettier

## 📦 Project Structure

```
src/
├── components/         # Reusable components
│   ├── ui/            # UI components (buttons, alerts, etc.)
│   └── JobBoard.vue   # Main job listing component
├── views/             # Page components
├── composables/       # Vue composables for shared logic
├── services/          # API services
├── models/            # TypeScript interfaces
├── utils/             # Utility functions
├── constants/         # Application constants
└── router/           # Vue Router configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js ^20.19.0 || >=22.12.0
- npm or yarn

### Installation

1. **Clone the repository**

   ```sh
   git clone <repository-url>
   cd careerly
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start development server**

   ```sh
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

```sh
# Development
npm run dev              # Start development server with hot reload

# Building
npm run build           # Build for production
npm run preview         # Preview production build locally

# Testing
npm run test:unit       # Run unit tests with Vitest
npm run test:e2e        # Run E2E tests with Cypress (production)
npm run test:e2e:dev    # Run E2E tests with Cypress (development)

# Code Quality
npm run lint            # Lint and fix with ESLint
npm run format          # Format code with Prettier
npm run type-check      # Type check with vue-tsc
```

## 🎯 Usage

### Job Search

- Use the search bar in the navigation (Ctrl+K shortcut)
- Search across job titles, companies, descriptions, and skills
- Results update in real-time with intelligent fuzzy matching

### Job Details

- Click "View More" on any job card to see detailed information
- View company information, requirements, and contact details
- Apply directly through the provided application link

### Navigation

- Browse jobs on the main board
- Use browser back/forward for navigation
- Share URLs with preserved search state

## 🏗 Architecture

### Components

- **UI Components**: Reusable styled components in `/components/ui/`
- **Business Components**: Feature-specific components
- **Views**: Page-level components for routing

### State Management

- **Composables**: Shared reactive state using Vue 3 Composition API
- **Local State**: Component-specific reactive data

### Utilities

- **Formatters**: Common formatting functions for display
- **Constants**: Application-wide configuration
- **Services**: API interaction layer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **Careerly Custom License (CCL)**.

**Key Points:**

- ✅ **Free for Open Source**: Use freely in open source projects
- ✅ **Commercial Use**: Permitted for most commercial entities
- ❌ **Restricted Entity**: Jobylon AB and associated companies are prohibited from commercial use
- 📝 **Full Terms**: See [LICENSE](./LICENSE) file for complete terms

The license allows free use for everyone except Jobylon AB and its affiliates, who are explicitly prohibited from using this software for commercial purposes unless granted explicit written permission.

## 🔗 Recommended IDE Setup

- **VS Code** + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **Browser Extensions**: Vue.js devtools for Chrome/Firefox

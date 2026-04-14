# Todo List & Dynamic Form Builder

A production-grade React application featuring an interactive Todo List dashboard and an advanced Dynamic Form Builder. Built emphasizing scalability, performance, accessibility, and visual aesthetics.



## Features

1. **Todo List Dashboard (`/todos`)**
   - Fetches and displays Todo data from the JSONPlaceholder API.
   - Filter by user and status (Completed/Pending).
   - Real-time debounced search by Todo title. 
   - **Persistent Routing:** Filter parameters are meticulously preserved across navigations using `localStorage`. When you leave the Todo page and come back, your filters and search are intact.
   - Pagination out of the box with zero layout-shift (thanks to `keepPreviousData`).
   - Skeleton loading patterns and interactive Intersection Observer animations for aesthetic reveals.

2. **Dynamic Form Builder (`/form-builder`)**
   - Define custom form schemas (Text, Email, Dropdowns, Checkboxes, etc.) on the fly.
   - Add/Remove options dynamically for Select and Radio inputs.
   - All schemas are automatically synced and persisted to `localStorage`.
   - **Live Preview (`/form-preview`):** Instantly renders the dynamic JSON schema back into a fully accessible and validated HTML form. Outputs the structured response directly to the DevTools console on submission.

## Tech Stack

- **React 18** (Functional approach with Hooks)
- **Vite** (Build Tool & Dev server)
- **React Router v6** (Client-side routing)
- **TanStack Query v5** (Server-state caching and synchronization) 
- **Axios** (API requests)
- **Vanilla CSS Modules** (Scoped, collision-free styling with modern variables)

---

## Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository / Navigate to the folder**
   ```bash
   cd scratch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **View the Application**
   Open your browser and navigate to `http://localhost:5173`.

---

## Architectural Approach & Best Practices

### 1. State Management & Data Fetching strategy
Instead of relying strictly on vanilla `useEffect` hooks and an overloaded global Context, this project relies heavily on **TanStack Query** (React Query). 

- **Why TanStack Query?** The primary challenge of the Todo list is fetching two endpoints (`/todos` and `/users`) and merging them while preventing redundant network traffic. TanStack Query caches the responses and implements `stale-while-revalidate` logic behind the scenes. This guarantees immediate interface loading during navigation routines and inherently supports pagination via `keepPreviousData` (preventing flickering).
- **Persistent Local State:** The dynamic filter parameters (Search string, User ID, Status) and the Form Builder schemas are synced to `localStorage`. To preserve separation of concerns, this is managed structurally through strict custom hooks (`useTodos.js` and `useFormBuilder.js`) rather than leaking storage logic directly into UI components.

### 2. Separation of Concerns & Folder Structure
To ensure scalability, the project is structured with strict feature isolation:
```text
src/
 ├── app/              # Setup definitions (Router, App root, QueryClient)
 ├── components/       
 │    ├── common/      # Reusable generic UI (Pagination, Skeleton, Layouts)
 │    ├── todos/       # Feature-specific scope for Todos
 │    └── form-builder/# Feature-specific scope for Form Builder
 ├── hooks/            # Business logic abstraction (useDebounce, useTodos)
 ├── pages/            # High-level composition bounds + Error Boundaries
 ├── services/         # Axios intercepts
 ├── styles/           # Global tokens and resets
 └── utils/            # Pure, side-effect free logic (constants, filters)
```
UI elements strictly focus on rendering props (Presentation Layer), while Custom Hooks handle data management and `localStorage` syncing (Business logic).

### 3. Styling & Aesthetics
Rather than pulling in an aggressive utility library like Tailwind, the application utilizes raw **CSS Modules**. 
- **Tokens**: There is a single `variables.css` file establishing our design system tokens (colors, spacing rhythm, fonts, transition cubic-beziers). 
- **Glassmorphism & Depth**: Deep dark mode with calculated subtle glows, active hover-lifts, and backdrop filters applied strictly to modularized `.module.css` documents. 

### 4. Code Quality & UX Elements
- **Error Boundaries**: Every top-level page route is wrapped in an `ErrorBoundary` class component so rendering failures in one subtree won't crash the entire routing tree.
- **Micro-Animations**: Uses Intersection Observer to fade / pop elements dynamically as they enter the browser viewport.
- **Accessibility (a11y)**: Elements leverage proper semantic HTML5 tagging, full `aria-labels`, `role` assignments, and a `skip-link` for keyboard navigation. 


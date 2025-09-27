## Setup Instructions

1. Clone the repository

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies

```bash
npm install
```

3. Environment configuration

Create a .env file in the root directory.

Add the following environment variables:

```bash
NEXTAUTH_SECRET=<random-string>
```

4. Run the development server

```bash
npm run dev
```

5. Access the app

Open http://localhost:3000 in your browser.

## Frameworks and Libraries Used

Next.js 13+ (App Router): React framework with latest routing and server/client components.

React Hook Form validation: For form validations.

Shadcn UI: UI components library used for layout, table, buttons, dropdowns, select, calendar, modal, badges, etc.

Tailwind CSS: Utility-first CSS framework for styling and layout.

Dayjs: Lightweight date parsing and manipulation.

React Query (@tanstack/react-query): Data fetching and caching library.

NextAuth: Authentication framework for access control and session management.

Axios: HTTP client for API requests.

Additional helper utilities for colors, fonts, etc.

## Assumptions and Notes

All UI components (Table, Badge, Select, DropdownMenu, Calendar, Button, Skeleton) are customized or generated from the Shadcn UI library.

Authentication redirects are managed using NextAuth and Next.js Middleware or client-side session checks.

Timesheet API returns paginated, filtered data based on page, limit, status, and date range query parameters.

The pagination UI is reactive to certain page count and limits.

Mobile responsiveness is achieved using Tailwind responsive utilities (sm:, md: breakpoints) and scrollable containers.

The solution assumes a modern browser supporting React 18 features and Next.js 13.

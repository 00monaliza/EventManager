import type { Event } from '@/types/event'

export const mockEvents: Event[] = [
  {
    id: '1a2b3c4d-0001-0000-0000-000000000001',
    title: 'React Summit 2025',
    description:
      'Annual React conference featuring talks on the latest trends in the React ecosystem, including Server Components, concurrent features, and performance optimization.',
    date: '2025-06-15T10:00:00.000Z',
    category: 'Conference',
    status: 'Planned',
    isFavorite: true,
    createdAt: '2025-01-10T08:00:00.000Z',
  },
  {
    id: '1a2b3c4d-0002-0000-0000-000000000002',
    title: 'TypeScript Deep Dive Webinar',
    description:
      'A deep dive into advanced TypeScript patterns including conditional types, template literal types, and the new satisfies operator.',
    date: '2025-05-20T14:00:00.000Z',
    category: 'Webinar',
    status: 'Planned',
    isFavorite: false,
    createdAt: '2025-01-15T09:00:00.000Z',
  },
  {
    id: '1a2b3c4d-0003-0000-0000-000000000003',
    title: 'Q1 Engineering Retrospective',
    description:
      'Quarterly retrospective meeting to discuss team velocity, technical debt, and process improvements for the upcoming quarter.',
    date: '2025-03-28T11:00:00.000Z',
    category: 'Meeting',
    status: 'Completed',
    isFavorite: false,
    createdAt: '2025-01-20T10:00:00.000Z',
  },
  {
    id: '1a2b3c4d-0004-0000-0000-000000000004',
    title: 'Next.js 16 Launch Event',
    description:
      'Official launch event for Next.js 16, covering new features, migration guides, and live demos from the core team.',
    date: '2025-07-10T18:00:00.000Z',
    category: 'Conference',
    status: 'Planned',
    isFavorite: true,
    createdAt: '2025-02-01T12:00:00.000Z',
  },
  {
    id: '1a2b3c4d-0005-0000-0000-000000000005',
    title: 'Introduction to Zustand',
    description:
      'Beginner-friendly webinar on state management with Zustand — covers store setup, slices, devtools, and persistence.',
    date: '2025-02-14T15:00:00.000Z',
    category: 'Webinar',
    status: 'Completed',
    isFavorite: true,
    createdAt: '2025-01-25T08:30:00.000Z',
  },
  {
    id: '1a2b3c4d-0006-0000-0000-000000000006',
    title: 'Product Roadmap Sync',
    description:
      'Monthly product and engineering alignment meeting to review roadmap priorities and upcoming milestones.',
    date: '2025-04-05T10:30:00.000Z',
    category: 'Meeting',
    status: 'Cancelled',
    isFavorite: false,
    createdAt: '2025-02-10T09:00:00.000Z',
  },
  {
    id: '1a2b3c4d-0007-0000-0000-000000000007',
    title: 'CSS Architecture Workshop',
    description:
      'Hands-on workshop exploring modern CSS architecture strategies: CSS Modules, CSS-in-JS alternatives, and the cascade layer system.',
    date: '2025-08-22T09:00:00.000Z',
    category: 'Conference',
    status: 'Planned',
    isFavorite: false,
    createdAt: '2025-02-20T11:00:00.000Z',
  },
  {
    id: '1a2b3c4d-0008-0000-0000-000000000008',
    title: 'Accessibility in Web Apps',
    description:
      'Webinar on building fully accessible web applications — ARIA roles, keyboard navigation, screen reader testing, and WCAG 2.2 compliance.',
    date: '2025-03-10T13:00:00.000Z',
    category: 'Webinar',
    status: 'Completed',
    isFavorite: false,
    createdAt: '2025-02-28T14:00:00.000Z',
  },
]

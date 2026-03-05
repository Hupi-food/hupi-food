# AGENTS.md - Hupi Food Development Guidelines

## Build, Lint, and Test Commands

```bash
# Development
npm run dev          # Start Vite dev server with HMR

# Production build
npm run build        # Build for production (output in dist/)

# Preview production build locally
npm run preview      # Serve the built app locally

# Note: No test framework is currently configured
# Note: No linting (ESLint) is currently configured
```

## Project Overview

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 + inline styles (hybrid approach)
- **Routing**: React Router 7
- **Backend**: Supabase
- **UI Libraries**: MUI, Radix UI (shadcn/ui-style components), Emotion

## Code Style Guidelines

### File Organization

```
src/
├── app/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (buttons, inputs, etc.)
│   │   ├── shared/       # Shared components (BottomNav, HupiBoxCard, etc.)
│   │   └── *.tsx         # Page-specific components
│   ├── views/
│   │   ├── auth/         # Login, Register, etc.
│   │   ├── customer/     # Customer-facing screens
│   │   ├── store/        # Store owner screens
│   │   └── admin/        # Admin screens
│   ├── contexts/         # React contexts (AuthContext)
│   └── data/             # Mock data files
├── lib/                  # Utilities (supabase client)
├── styles/               # Global CSS (tailwind, fonts, theme)
└── imports/              # SVG imports
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HomeScreen.tsx`, `Button.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS classes**: kebab-case (Tailwind)

### TypeScript Guidelines

- Always define prop types for components using TypeScript interfaces or types
- Use `React.FC<Props>` for functional components when needed
- Avoid `any`; use proper types or `unknown` with type guards

```typescript
// Good
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  className?: string;
}

// Avoid
const Button = (props) => { ... }
```

### Imports

- React imports: `import React from "react"` (for JSX transform)
- Use absolute imports from src root: `@/components/ui/button`
- Group imports: external libs → internal components → utilities → styles
- Use barrel exports (index.ts) for cleaner imports

```typescript
// Preferred
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/contexts/AuthContext';

// Alternative (if path aliases not configured)
import { Button } from './components/ui/button';
```

### Styling Guidelines

1. **Tailwind First**: Use Tailwind classes for styling
2. **Inline Styles**: Acceptable for dynamic values or simple overrides
3. **Component Variants**: Use `cva` (class-variance-authority) for variant components

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

### Component Structure

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function Component({ className, children, ...props }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {children}
    </div>
  );
}
```

### Error Handling

- Use try/catch for async operations
- Display user-friendly error messages via toast notifications (sonner)
- Log errors to console in development
- Handle Supabase auth errors gracefully

```typescript
try {
  const { data, error } = await supabase.from('boxes').select('*');
  if (error) throw error;
  return data;
} catch (err) {
  console.error('Error fetching boxes:', err);
  toast.error('Failed to load boxes');
}
```

### React Patterns

- Use functional components exclusively
- Use hooks for state management (`useState`, `useEffect`, `useMemo`, `useCallback`)
- Memoize expensive computations with `useMemo`
- Use `useCallback` for callback functions passed to child components
- Leverage React Router's `useNavigate`, `useParams`, `useLocation`

### Tailwind CSS 4

- Uses `@import 'tailwindcss'` syntax
- Custom theme in `src/styles/theme.css`
- Use arbitrary values sparingly: `w-[200px]`
- Use `tw-merge` (`cn` utility) for merging Tailwind classes

### UI Components (shadcn/ui style)

The project uses Radix UI primitives wrapped in custom components:
- Find reusable components in `src/app/components/ui/`
- Always include `data-slot` attribute for Radix component detection
- Use the provided `cn` utility for class merging

### Performance Tips

- Lazy load routes with `React.lazy()` and `Suspense`
- Use `useMemo` for filtered/sorted data
- Avoid inline object definitions in render
- Use `ImageWithFallback` for images with fallback support

### Accessibility

- Use semantic HTML elements
- Include `aria-label` for icon-only buttons
- Ensure proper focus states (Tailwind's `focus-visible`)
- Use Radix UI primitives for accessible interactive components

### Dark Mode

- Use `next-themes` for theme management
- Apply dark mode classes: `dark:bg-background`
- Test both light and dark themes

## Environment Variables

Create `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Key Dependencies

- `@mui/material` - Material UI components
- `@radix-ui/*` - Accessible UI primitives
- `lucide-react` - Icons
- `recharts` - Charts
- `sonner` - Toast notifications
- `react-hook-form` - Form handling
- `date-fns` - Date utilities
- `motion` - Animations

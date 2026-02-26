# Quick Start Guide

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- React Router
- TanStack Query (React Query)
- Axios
- Testing libraries

### 2. Create environment file

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:4000
VITE_APP_ENV=development
```

### 3. Start development server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Quality checks
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript compiler
npm run test             # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage
npm run quality:check    # Run all quality checks

# Formatting
npm run format           # Check code formatting
npm run format:write     # Fix code formatting
```

## 🔧 Pre-commit Setup

Install pre-commit hooks:

```bash
# Install pre-commit
python3 -m pip install --user pre-commit

# Install hooks
pre-commit install --install-hooks --hook-type pre-commit --hook-type commit-msg
```

## 📋 Before Each Commit

```bash
# Generate AGENTS proof
python3 scripts/agents_proof.py --refresh

# Run quality checks
npm run quality:check
```

## 🏗️ Project Structure

```
src/
├── app/                    # App initialization
│   ├── App.tsx            # Main app component
│   └── config/
│       └── env.ts         # Environment configuration
├── pages/                  # Route pages (to be added)
├── components/             # Reusable components
│   ├── common/            # Generic components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── hooks/                 # Custom React hooks
│   └── api/              # API query hooks
├── services/              # API services
│   └── api.ts            # Base API client
├── types/                 # TypeScript types
│   ├── auth.types.ts
│   ├── api.types.ts
│   └── domain.types.ts
├── utils/                 # Utility functions
├── styles/               # Global styles
│   └── global.css
├── test/                 # Test setup
│   └── setup.ts
├── main.tsx              # App entry point
└── vite-env.d.ts         # Vite types
```

## 🔗 Backend Integration

The frontend is configured to proxy API requests to the backend:

- **Development**: `http://localhost:4000`
- **API calls**: Prefix with `/api` (e.g., `/api/v1/health`)

Make sure the backend is running before starting development.

## 🧪 Current Status

This is a basic implementation with:
- ✅ Project structure and configuration
- ✅ Basic UI with mock authentication
- ✅ API client setup
- ✅ TypeScript types for API contracts
- ✅ Global styles and design tokens
- ⏳ Full authentication (Google OAuth) - to be implemented
- ⏳ Complete component library - to be implemented
- ⏳ All feature pages - to be implemented

## 🎨 Design System

The app uses CSS variables for consistent styling:

```css
/* Colors */
--color-primary: #4f46e5
--color-secondary: #10b981
--color-background: #f9fafb

/* Spacing */
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem

/* Typography */
--font-size-base: 1rem
--font-size-lg: 1.125rem
--font-size-xl: 1.25rem
```

See `src/styles/global.css` for complete design tokens.

## 🐛 Troubleshooting

### TypeScript errors about missing modules

Run `npm install` to install dependencies.

### Port 5173 already in use

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
```

Or change the port in `vite.config.ts`:

```ts
export default defineConfig({
  server: {
    port: 3000, // or any other port
  },
});
```

### API connection errors

1. Ensure the backend is running on `http://localhost:4000`
2. Check `.env` file has correct `VITE_API_URL`
3. Verify backend health endpoint: `curl http://localhost:4000/health`

## 📚 Next Steps

1. Install dependencies: `npm install`
2. Start backend API (see backend README)
3. Start frontend: `npm run dev`
4. Open browser at `http://localhost:5173`
5. Sign in (currently mocked) and explore the UI

## 🤝 Contributing

See `CONTRIBUTING.md` for contribution guidelines and workflow.

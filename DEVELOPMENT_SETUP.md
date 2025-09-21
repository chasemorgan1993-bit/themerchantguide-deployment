# Development Setup Guide

This document outlines the development tooling and processes set up for The Merchant Guide Next.js application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development with type checking
npm run dev
# OR start with Turbopack
npm run dev:turbo

# Check code quality
npm run check-all

# Build for production
npm run build
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:turbo` | Start development server with Turbopack |
| `npm run build` | Build for production (includes type-check) |
| `npm run build:skip-checks` | Build without pre-checks (faster) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run type-check:watch` | Run TypeScript in watch mode |
| `npm run check-all` | Run both lint and type-check |

## 🔧 Development Tools Configured

### 1. Pre-commit Hooks (Husky + lint-staged)
Automatically runs on every commit:
- ESLint with auto-fix
- TypeScript type checking
- Prettier formatting

### 2. VS Code Configuration
Auto-configured in `.vscode/`:
- **settings.json**: Auto-format on save, ESLint integration
- **extensions.json**: Recommended extensions
- **tasks.json**: Quick development tasks

**Recommended Extensions:**
- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense

### 3. Code Formatting (Prettier)
- Consistent code style across the project
- Auto-formats on save (in VS Code)
- Runs in pre-commit hooks

### 4. Type Safety (TypeScript)
- Strict type checking enabled
- No `any` types allowed in production code
- Real-time error checking in IDE

## 🤖 Automated CI/CD (GitHub Actions)

The `.github/workflows/ci.yml` runs on every push/PR:

1. **Lint & Type Check** - Ensures code quality
2. **Build** - Verifies the app builds successfully
3. **Deploy** - (Optional) Auto-deploy on main branch

## 🛡️ Error Prevention

### Build Process
```bash
npm run build
```
This command now:
1. Runs TypeScript type checking first
2. Only builds if no type errors
3. Catches issues before deployment

### Pre-commit Protection
Every commit automatically:
- Fixes ESLint issues
- Validates TypeScript types
- Formats code with Prettier
- **Prevents commit if errors exist**

## 🎯 Best Practices

### For Development
1. **Use type-check watch mode** during development:
   ```bash
   npm run type-check:watch
   ```

2. **Run checks before pushing**:
   ```bash
   npm run check-all
   ```

3. **Use proper TypeScript types** - avoid `any`

4. **Remove console.log** statements before committing

### For Code Reviews
- CI/CD must pass before merging
- Check the GitHub Actions status
- Ensure proper TypeScript interfaces are used

## 🔍 Troubleshooting

### Pre-commit Hook Issues
If pre-commit fails:
```bash
# Fix ESLint issues manually
npm run lint:fix

# Check TypeScript errors
npm run type-check

# Then try committing again
git add .
git commit -m "your message"
```

### Build Failures
```bash
# Skip checks for emergency builds (not recommended)
npm run build:skip-checks

# Or fix issues first
npm run check-all
```

### VS Code Setup
1. Install recommended extensions when prompted
2. Reload VS Code after extension installation
3. Check that auto-format on save is working

## 📁 Configuration Files

| File | Purpose |
|------|---------|
| `.husky/pre-commit` | Pre-commit hook script |
| `.vscode/settings.json` | VS Code workspace settings |
| `.vscode/extensions.json` | Recommended VS Code extensions |
| `.vscode/tasks.json` | VS Code development tasks |
| `.prettierrc` | Prettier configuration |
| `.prettierignore` | Files to exclude from Prettier |
| `.github/workflows/ci.yml` | GitHub Actions CI/CD |
| `package.json` | npm scripts and lint-staged config |

## 🎉 Benefits

✅ **Catch errors early** - Before they reach production
✅ **Consistent code style** - Across the entire team
✅ **Type safety** - Prevent runtime errors
✅ **Automated quality checks** - No manual oversight needed
✅ **Better IDE experience** - Real-time error highlighting
✅ **Faster debugging** - Issues caught at development time

---

**Note**: This setup ensures that the issues we fixed (TypeScript errors, console.log statements, incorrect Link usage) won't happen again in future development.
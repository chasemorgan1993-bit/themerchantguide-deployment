# Migrating TheMerchantGuide Next.js to Netlify

This guide will help you migrate from Render to Netlify to eliminate slow cold starts and improve performance.

## Why This Migration Fixes Your Slow Loading

**Current Problem (Render):**
- Free tier spins down after 15 minutes of inactivity
- First visitor waits 30-50 seconds for cold start
- Unpredictable performance

**After Migration (Netlify):**
- ✅ No cold starts
- ✅ Always-on, instant loading
- ✅ Global CDN for fast worldwide access
- ✅ Free forever for your usage level

---

## Prerequisites

- [x] Netlify account (use your existing one)
- [x] GitHub account
- [x] Supabase account (already configured)
- [x] Code pushed to GitHub repository

---

## Step-by-Step Migration (15-20 minutes)

### Step 1: Prepare Your Repository

1. **Ensure your code is in a Git repository**
   ```bash
   cd /Users/chasemorgan/themerchantguide-nextjs

   # Check git status
   git status

   # If not initialized, initialize git
   git init
   git add .
   git commit -m "Prepare for Netlify deployment"
   ```

2. **Push to GitHub** (if not already there)
   ```bash
   # If you don't have a remote yet
   git remote add origin https://github.com/YOUR_USERNAME/themerchantguide-nextjs.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

1. **Go to Netlify Dashboard**
   - Visit https://app.netlify.com
   - Log in to your account

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub repos (if not already done)
   - Select your `themerchantguide-nextjs` repository

3. **Configure Build Settings**

   Netlify should auto-detect Next.js, but verify these settings:

   - **Branch to deploy:** `main` (or `master`)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** (leave empty, handled by plugin)

   These are already configured in your `netlify.toml` file!

4. **Add Environment Variables**

   Click "Show advanced" → "Add environment variables"

   Add these from your `.env.local` file:

   | Variable Name | Value |
   |---------------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Copy from `.env.local` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Copy from `.env.local` |
   | `SUPABASE_SERVICE_ROLE_KEY` | Copy from `.env.local` |
   | `MAILCHIMP_API_KEY` | Copy from `.env.local` |
   | `MAILCHIMP_AUDIENCE_ID` | Copy from `.env.local` |
   | `MAILCHIMP_SERVER_PREFIX` | Copy from `.env.local` |

5. **Deploy Site**
   - Click "Deploy site"
   - Wait 2-3 minutes for initial deployment
   - Netlify will give you a URL like `https://random-name-123.netlify.app`

### Step 3: Install Netlify Next.js Plugin

The plugin is configured in `netlify.toml`, but you need to enable it:

1. **In Netlify Dashboard:**
   - Go to "Site settings" → "Build & deploy" → "Build plugins"
   - Search for "@netlify/plugin-nextjs"
   - Click "Install"

   OR Netlify will auto-install it on first deploy since it's in your `netlify.toml`

### Step 4: Test Your Deployment

1. **Visit your Netlify URL**
   - Check all pages load correctly
   - Test the fee calculator
   - Verify database connection works
   - Submit the newsletter form

2. **Check Performance**
   - Reload multiple times - should be instant every time
   - No more cold starts!

### Step 5: Update Your Domain (Optional)

If you want to use `themerchantguide.com`:

1. **In Netlify Dashboard:**
   - Go to "Domain management" → "Add custom domain"
   - Enter `themerchantguide.com`
   - Follow DNS instructions to point your domain to Netlify

2. **Enable HTTPS**
   - Netlify automatically provisions SSL certificate
   - Takes ~1 minute after DNS propagates

### Step 6: Remove Render Deployment (Optional)

Once everything works on Netlify:

1. Go to Render dashboard
2. Delete your `themerchantguide` service
3. Save $7/month if you were paying for always-on

---

## What Changed?

### Files Added/Modified

1. **netlify.toml** (new)
   - Build configuration
   - Headers for security
   - Cache settings for performance
   - Next.js plugin configuration

2. **package.json** (no changes needed)
   - Already has correct build script

3. **next.config.ts** (no changes needed)
   - Already compatible with Netlify

### Environment Variables

All your environment variables from `.env.local` need to be added to Netlify dashboard (see Step 2.4 above).

---

## Automatic Deployments

After initial setup, deployments are automatic:

1. Make code changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Netlify automatically rebuilds and deploys (2-3 minutes)
4. Check deployment status at https://app.netlify.com

---

## Troubleshooting

### Build Fails

**Check build logs:**
- Go to Netlify dashboard → "Deploys" → Click failed deploy
- Read error messages

**Common fixes:**
```bash
# Test build locally first
cd /Users/chasemorgan/themerchantguide-nextjs
npm run build

# If it works locally but fails on Netlify, check:
# 1. Environment variables are set correctly
# 2. Node version matches (should be 20)
# 3. All dependencies are in package.json
```

### Site Loads But Shows Errors

**Database connection issues:**
- Verify Supabase environment variables are set correctly
- Check Supabase dashboard to ensure database is accessible

**API routes not working:**
- Make sure `@netlify/plugin-nextjs` is installed
- Check function logs in Netlify dashboard

### Environment Variables Not Working

- Double-check variable names match exactly (case-sensitive)
- Prefix public variables with `NEXT_PUBLIC_`
- Trigger a new deploy after adding variables

---

## Performance Comparison

| Metric | Render (Free) | Netlify (Free) |
|--------|---------------|----------------|
| **Cold Start** | 30-50 seconds | None |
| **Warm Response** | ~500ms | ~100ms |
| **Always On** | ❌ No | ✅ Yes |
| **Global CDN** | ❌ No | ✅ Yes |
| **Build Time** | 3-4 min | 2-3 min |
| **Free Tier** | 750 hrs/month | Unlimited |

---

## Cost Breakdown

### Netlify Free Tier Includes:
- ✅ 100 GB bandwidth/month (plenty for your site)
- ✅ 300 build minutes/month (plenty - each build is ~2 min)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Deploy previews

### When You'd Need to Upgrade ($19/month):
- Over 100 GB bandwidth/month (unlikely - need ~50k+ visitors)
- Over 300 build minutes/month (unlikely - that's 150 deploys)
- Need team features

**For your current traffic: Stay on free tier forever!**

---

## Rollback Plan

If something goes wrong, you can quickly rollback:

**Option 1: Rollback in Netlify**
- Netlify dashboard → "Deploys" → Find working deploy → Click "Publish deploy"

**Option 2: Temporarily point domain back to Render**
- Update DNS to point to Render
- Takes 5-10 minutes for DNS to propagate

**Option 3: Deploy old Hugo site**
- Your Hugo site still works and can be quickly redeployed

---

## Next Steps After Migration

1. **Monitor Performance**
   - Use Netlify Analytics (optional, $9/month)
   - Or use Google Analytics (free)

2. **Set Up Deploy Notifications**
   - Netlify dashboard → "Settings" → "Deploy notifications"
   - Get notified when builds succeed/fail

3. **Create Branch Previews**
   - Push to a feature branch
   - Netlify automatically creates preview URL
   - Test before merging to main

4. **Custom Domain**
   - Point `themerchantguide.com` to Netlify
   - Enable HTTPS (automatic)

---

## Support Resources

- **Netlify Docs:** https://docs.netlify.com/frameworks/next-js/overview/
- **Netlify Support:** https://answers.netlify.com/
- **Next.js Docs:** https://nextjs.org/docs/deployment
- **Supabase Docs:** https://supabase.com/docs

---

## Quick Command Reference

```bash
# Local development
npm run dev

# Test production build locally
npm run build
npm start

# Deploy to Netlify (automatic via Git)
git add .
git commit -m "Update message"
git push

# Check if site is ready for deployment
npm run check-all  # Runs lint and type-check
```

---

## Summary

**Time Required:** 15-20 minutes
**Cost:** $0/month (free tier)
**Benefits:**
- ✅ Eliminates 30-50 second cold starts
- ✅ Always-on, instant loading
- ✅ Global CDN for better worldwide performance
- ✅ Automatic deployments from GitHub
- ✅ Free HTTPS certificate
- ✅ No credit card required for free tier

**Risk:** Very low - can rollback instantly if needed

---

Ready to migrate? Follow the steps above or let me know if you need help with any specific step!

# Netlify Migration Checklist

Use this checklist to track your migration progress.

## Pre-Migration

- [ ] Code is committed to Git
- [ ] Code is pushed to GitHub
- [ ] I have access to Netlify account
- [ ] I have my Supabase credentials ready (.env.local file)

## Netlify Setup

- [ ] Logged into https://app.netlify.com
- [ ] Clicked "Add new site" → "Import an existing project"
- [ ] Connected GitHub repository
- [ ] Selected `themerchantguide-nextjs` repository
- [ ] Verified build settings:
  - Branch: `main`
  - Build command: `npm run build`
  - Publish directory: `.next`

## Environment Variables

Add these in Netlify dashboard (Site settings → Environment variables):

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `MAILCHIMP_API_KEY`
- [ ] `MAILCHIMP_AUDIENCE_ID`
- [ ] `MAILCHIMP_SERVER_PREFIX`

## First Deployment

- [ ] Clicked "Deploy site"
- [ ] Waited for deployment to complete (2-3 minutes)
- [ ] Received Netlify URL (e.g., https://random-name-123.netlify.app)

## Testing

- [ ] Homepage loads correctly
- [ ] Blog page works
- [ ] Compare page works
- [ ] Fee calculator functions
- [ ] Newsletter signup works
- [ ] No console errors in browser
- [ ] Site loads instantly (no cold starts!)

## Optional: Custom Domain

- [ ] Added custom domain in Netlify
- [ ] Updated DNS settings
- [ ] HTTPS certificate issued (automatic)
- [ ] Domain points to Netlify

## Cleanup

- [ ] Verified everything works on Netlify
- [ ] Deleted or paused Render deployment
- [ ] Updated any documentation with new URL

## Post-Migration

- [ ] Set up deploy notifications
- [ ] Monitor site performance
- [ ] Test automatic deployments (push a small change)

---

## Quick Reference

**Netlify Dashboard:** https://app.netlify.com
**Your Site URL:** _______________ (fill in after deployment)
**GitHub Repo:** _______________
**Time Estimate:** 15-20 minutes

---

## If Something Goes Wrong

1. Check build logs in Netlify dashboard
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. Check NETLIFY_MIGRATION_GUIDE.md troubleshooting section
5. Can always rollback to previous deploy in Netlify dashboard

---

## After Migration Success

✅ No more slow cold starts!
✅ Site loads instantly
✅ Free hosting forever (for your traffic level)
✅ Automatic deployments from GitHub
✅ Global CDN for better performance

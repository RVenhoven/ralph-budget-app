# Deployment Guide

## What Changed

You now have:
- ✅ Backend API handlers in `/api/` folder
- ✅ Updated React components that fetch real data
- ✅ Error handling and loading states
- ✅ Subscriptions/recurring expense table
- ✅ Live Lunch Money integration

## How to Deploy

### Step 1: Update Your Local Project

Download and extract the latest code:

```bash
# Navigate to your project
cd ralph-budget-app

# Replace files with updated versions:
# - package.json (added axios dependency)
# - src/App.jsx (fetches real data)
# - src/App.css (new styles)
# - src/components/LoadingSpinner.jsx (NEW)
# - src/components/ErrorBanner.jsx (NEW)
# - src/components/SummaryCard.jsx (updated)
# - api/budgets.js (NEW)
# - api/transactions.js (NEW)
# - api/subscriptions.js (NEW)
# - api/summary.js (NEW)
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs the new `axios` package.

### Step 3: Test Locally (Optional)

```bash
npm run dev
```

Visit `http://localhost:5173` to test.

**Note:** Local testing won't work with Lunch Money API (no API key). Test on Vercel instead.

### Step 4: Push to GitHub

Option A - Command line:
```bash
git add .
git commit -m "Add Lunch Money API integration - real data sync"
git push
```

Option B - GitHub web interface:
1. Go to your GitHub repository
2. Click "Add file" → "Upload files"
3. Upload all updated files
4. Commit with message: "Add Lunch Money API integration"

### Step 5: Automatic Deployment

Vercel will **automatically detect the push** and redeploy:
- Build runs automatically
- Dependencies install (npm install)
- Site deploys to ralph-budget-app.vercel.app
- Takes ~2-3 minutes

### Step 6: Verify Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click `ralph-budget-app` project
3. Wait for "Deployment Complete"
4. Click the URL: https://ralph-budget-app.vercel.app
5. Should see loading spinner → dashboard with data

## Deployment Checklist

Before pushing, verify:

- ✅ API key is in Vercel Environment Variables (`LUNCH_MONEY_API_KEY`)
- ✅ You have budgets set up in Lunch Money
- ✅ At least one transaction exists in Lunch Money (current month)
- ✅ Lunch Money account is active (not paused)
- ✅ All files are included in the update:
  - `/api/*.js` files (new)
  - Updated `src/App.jsx`
  - Updated `src/App.css`
  - New components in `src/components/`
  - Updated `package.json`

## Troubleshooting Deployment

**Deployment failed - "npm install error"**
- Check package.json is valid JSON
- Verify no typos in dependencies

**Site loads but shows error banner**
- Check Vercel logs: Dashboard → Deployments → Latest → Logs
- Verify `LUNCH_MONEY_API_KEY` is set correctly
- Check that Lunch Money account is active

**No data appears**
- Check browser console (F12) for API errors
- Verify Lunch Money has budgets and transactions
- Wait 1-2 minutes for first load (Vercel can be slow on first call)

**"API key not configured"**
- Go to Vercel Settings → Environment Variables
- Add `LUNCH_MONEY_API_KEY` with your new key
- Trigger a redeployment

## Redeployment

To redeploy without code changes:
1. Vercel Dashboard → `ralph-budget-app`
2. Deployments tab
3. Click "..." on latest deployment
4. "Redeploy"

This is useful if you update the API key without code changes.

## Next Steps

Once deployment is verified:
1. ✅ Test on mobile
2. 📊 Check if all budgets load
3. 🔍 Review data accuracy
4. 📋 Build Sonja's widget version (phase 2)

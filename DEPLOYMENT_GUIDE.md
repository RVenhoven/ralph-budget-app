# Deployment & Troubleshooting Guide

## 🔧 What Was Fixed

The API domain was incorrect in all 4 backend files:

**OLD (Wrong):** `https://dev.lunchmoney.app/v1/...`
**NEW (Correct):** `https://api.lunchmoney.app/v1/...`

This caused all API calls to return 500 errors. This updated ZIP file contains the fix applied to all files:
- `api/budgets.js`
- `api/transactions.js`
- `api/subscriptions.js`
- `api/summary.js`

## 📋 Step-by-Step Deployment

### Step 1: Extract the ZIP File
```
1. Download ralph-budget-app-FIXED.zip
2. Extract it to a folder on your computer
3. Open the folder in your file explorer
```

### Step 2: Upload Files to GitHub

**Option A: Web Upload (Easiest)**
```
1. Go to https://github.com/RVenhoven/ralph-budget-app
2. Click the "Code" button
3. Click "Upload files"
4. Drag and drop the contents of the extracted folder
   (or click "choose your files" and select them)
5. Commit with message: "Fix: Update Lunch Money API domain from dev to api"
6. Click "Commit changes"
```

**Option B: Git Command Line (If you have Git installed)**
```bash
cd path/to/ralph-budget-app
git add .
git commit -m "Fix: Update Lunch Money API domain from dev to api"
git push origin main
```

### Step 3: Wait for Vercel Auto-Deploy

1. After pushing to GitHub, go to https://vercel.com
2. Your project will automatically start deploying
3. You'll see a "Building..." status
4. Wait 2-3 minutes for deployment to complete
5. Status changes to "Ready" when done

### Step 4: Test the Dashboard

1. Open https://ralph-budget-app.vercel.app
2. You should see:
   - Dashboard loads without error banner
   - Budget cards appear
   - Subscription cards appear
   - Summary card shows totals
3. Click "🔄 Refresh" to verify it fetches new data

## ✅ Verification Checklist

- [ ] Files extracted from ZIP
- [ ] Files uploaded to GitHub (4 API files updated)
- [ ] GitHub shows new commit
- [ ] Vercel deployment completed (shows "Ready")
- [ ] Dashboard loads without errors
- [ ] Budget data displays
- [ ] Refresh button works

## 🆘 If Something Goes Wrong

### Dashboard Still Shows Error

**Check 1: Vercel Environment Variable**
1. Go to https://vercel.com/dashboard
2. Select ralph-budget-app project
3. Click "Settings" → "Environment Variables"
4. Verify `LUNCH_MONEY_API_KEY` is set
5. If missing, add it and click "Redeploy"

**Check 2: Verify Files Were Uploaded**
1. Go to https://github.com/RVenhoven/ralph-budget-app
2. Click "api" folder
3. Click "budgets.js"
4. Look for the line with `https://api.lunchmoney.app` (should have "api" not "dev")
5. If still shows "dev", re-upload the files

**Check 3: Check the Browser Console**
1. Open the dashboard in your browser
2. Press F12 to open Developer Tools
3. Click "Console" tab
4. Look for red error messages
5. Copy the error and share it

### Deployment Stuck or Failed

1. Go to https://vercel.com/ralph-budget-app
2. Click "Deployments"
3. If latest shows "Failed", click on it
4. Look at the error in "Build Logs"
5. Most likely: files not uploaded correctly
6. Solution: Try uploading again from this ZIP file

## 📞 Questions?

If you encounter any issues:
1. Check this guide's troubleshooting section
2. Verify the API key is correct in Vercel
3. Make sure the GitHub files match this ZIP (especially api/ folder)
4. All 4 API files must have `https://api.lunchmoney.app` (not "dev")

## 🚀 Next Steps After Successful Deployment

Once the dashboard is working:

1. **Customize the display** - Edit src/App.jsx to show more/fewer budgets
2. **Add more features** - Budget vs actual analysis, date range filtering
3. **Build Sonja's version** - Create Android-optimized dashboard
4. **Set up alerts** - Notify when budgets are exceeded

Enjoy your working financial dashboard! 💰

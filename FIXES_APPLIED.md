# Fixes Applied to This Build

## Problem
All API calls to Lunch Money were returning 500 errors because the API domain was incorrect.

## Root Cause
The code was using the **development API endpoint** instead of the **production API endpoint**.

## Solution Applied

### File: `api/budgets.js`
- ❌ **OLD:** `https://dev.lunchmoney.app/v1/budgets`
- ✅ **NEW:** `https://api.lunchmoney.app/v1/budgets`

### File: `api/transactions.js`
- ❌ **OLD:** `https://dev.lunchmoney.app/v1/transactions`
- ✅ **NEW:** `https://api.lunchmoney.app/v1/transactions`

### File: `api/subscriptions.js`
- ❌ **OLD:** `https://dev.lunchmoney.app/v1/recurring_expenses`
- ✅ **NEW:** `https://api.lunchmoney.app/v1/recurring_expenses`

### File: `api/summary.js`
- ❌ **OLD:** Both fetch calls used `https://dev.lunchmoney.app/v1/...`
- ✅ **NEW:** Both fetch calls now use `https://api.lunchmoney.app/v1/...`

## What This Means
- The dashboard will now connect to the correct Lunch Money API server
- API calls will no longer return 500 errors
- Your real budget data will load correctly
- The dashboard is ready to be deployed to Vercel

## Verification
To verify the fixes were applied:
1. Open each file in the `api/` folder
2. Look for fetch URLs
3. They should all contain `api.lunchmoney.app` (not `dev.lunchmoney.app`)
4. If any still show "dev", the fix wasn't applied correctly

## No Other Changes
All other files remain unchanged:
- React components work the same way
- Styling is identical
- Configuration files are the same
- Only the API domain URLs were corrected

## Deployment
See `DEPLOYMENT_GUIDE.md` for step-by-step instructions to upload this to GitHub and Vercel.

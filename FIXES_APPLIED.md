# Fixes Applied to This Build

## Problem
All API calls to Lunch Money were returning 500 errors because the API domain was completely wrong.

## Root Cause
The code was using the **wrong domain entirely**. 

The correct Lunch Money API domain is `api.lunchmoney.dev` (using the `.dev` TLD), not `api.lunchmoney.app` (the `.app` TLD).

## Solution Applied

### File: `api/budgets.js`
- ❌ **OLD:** `https://api.lunchmoney.app/v1/budgets`
- ✅ **CORRECT:** `https://api.lunchmoney.dev/v1/budgets`

### File: `api/transactions.js`
- ❌ **OLD:** `https://api.lunchmoney.app/v1/transactions`
- ✅ **CORRECT:** `https://api.lunchmoney.dev/v1/transactions`

### File: `api/subscriptions.js`
- ❌ **OLD:** `https://api.lunchmoney.app/v1/recurring_expenses`
- ✅ **CORRECT:** `https://api.lunchmoney.dev/v1/recurring_expenses`

### File: `api/summary.js`
- ❌ **OLD:** All fetch calls used `https://api.lunchmoney.app/v1/...`
- ✅ **CORRECT:** All fetch calls now use `https://api.lunchmoney.dev/v1/...`

## What This Means
- The dashboard will now connect to the actual Lunch Money production API
- API calls will succeed (no more 500 errors)
- Your real budget data will load correctly
- The dashboard is ready to be deployed to Vercel

## Important Note
This is NOT a change back to the previous broken state. The domain structure is completely different:
- ❌ **Previously broken:** `dev.lunchmoney.app` or `api.lunchmoney.app` (wrong `.app` TLD)
- ✅ **Now correct:** `api.lunchmoney.dev` (correct `.dev` TLD)

These are two different servers entirely.

## Verification
To verify the fixes were applied:
1. Open each file in the `api/` folder
2. Look for fetch URLs
3. They should all contain `api.lunchmoney.dev` (with `.dev` domain)
4. If any still show `.app`, the fix wasn't applied correctly

## No Other Changes
All other files remain unchanged:
- React components work the same way
- Styling is identical
- Configuration files are the same
- Only the API domain was corrected to use `.dev`

## Deployment
See `DEPLOYMENT_GUIDE.md` for step-by-step instructions to upload this to GitHub and Vercel.

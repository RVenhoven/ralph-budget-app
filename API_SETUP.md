# Lunch Money API Integration

## Overview

This dashboard is now connected to **Lunch Money API** for real-time financial data.

## Backend Endpoints

All endpoints are serverless functions deployed to Vercel under `/api/`:

### GET `/api/budgets`
Fetches all budget categories and targets from Lunch Money.

**Response:**
```json
{
  "budgets": [
    {
      "id": 123,
      "category": "Groceries",
      "target": 600,
      "spent": 200,
      "status": "on-track"
    }
  ]
}
```

### GET `/api/transactions`
Fetches transactions for the current month.

**Response:**
```json
{
  "transactions": [
    {
      "id": 1,
      "amount": -45.50,
      "category": "Groceries",
      "date": "2026-09-13",
      "payee": "Albert Heijn"
    }
  ]
}
```

### GET `/api/subscriptions`
Fetches recurring/subscription items.

**Response:**
```json
{
  "subscriptions": [
    {
      "id": 456,
      "name": "Netflix",
      "amount": 12.99,
      "frequency": "monthly",
      "nextDate": "2026-09-20"
    }
  ],
  "summary": {
    "monthlyTotal": 45.99,
    "annualTotal": 551.88,
    "count": 4
  }
}
```

### GET `/api/summary`
Fetches dashboard summary data (every dollar has a job).

**Response:**
```json
{
  "budgets": [
    {
      "category": "Groceries",
      "targetAmount": 600,
      "spent": 200,
      "remaining": 400,
      "percentage": 33.3,
      "status": "on-track"
    }
  ],
  "summary": {
    "totalBudget": 3000,
    "totalSpent": 1250,
    "totalRemaining": 1750,
    "percentageSpent": 41.7
  }
}
```

## Environment Setup

The API key is stored securely in **Vercel Environment Variables**:

```
LUNCH_MONEY_API_KEY = [your API key]
```

**Never commit this key to Git.**

### To add/update the key:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `ralph-budget-app` project
3. Settings → Environment Variables
4. Add/update `LUNCH_MONEY_API_KEY`
5. Redeploy

## Frontend Integration

The React frontend fetches data via axios:

```javascript
const response = await axios.get('/api/budgets')
const budgets = response.data.budgets
```

All API calls are made from `src/App.jsx` on component mount and when the user clicks "Refresh Data".

## Error Handling

API errors are caught and displayed to the user via the `<ErrorBanner />` component. Check the browser console for detailed error logs.

## Testing Locally

### Prerequisites
- Node.js 16+
- npm

### Setup
```bash
npm install
npm run dev
```

The app will run on `http://localhost:5173`.

**Note:** Local development won't have access to the `LUNCH_MONEY_API_KEY` environment variable. You can:
1. Add it to a `.env.local` file (don't commit!)
2. Or test via the deployed Vercel URL

## Lunch Money API Docs

Official docs: https://lunchmoney.dev

Key endpoints used:
- `GET /v1/budgets`
- `GET /v1/transactions`
- `GET /v1/recurring_expenses`

## Next Steps

1. ✅ API is now connected
2. ✅ Backend serverless functions are deployed
3. 🔄 Frontend fetches real data
4. 📊 Dashboard shows live Lunch Money data
5. 🎯 Next: Build Sonja's widget version

## Troubleshooting

**"API key not configured"**
- Check that `LUNCH_MONEY_API_KEY` is set in Vercel Environment Variables
- Redeploy the project after adding the key

**"Lunch Money API error: 401"**
- API key is invalid or expired
- Regenerate a new key in Lunch Money Settings → Developer API

**"No data loading"**
- Check that you have budgets set up in Lunch Money
- Verify that transactions exist for this month
- Check browser console for detailed errors

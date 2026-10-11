# Ralph's Financial Dashboard

A modern, responsive financial dashboard that integrates with Lunch Money API to provide real-time budget tracking and expense analysis.

## Features

✅ **Budget Categories** - Track spending against budgets
✅ **"Every Dollar" Summary** - Zero-based budgeting visualization  
✅ **Subscriptions & Recurring Costs** - Monitor sinking funds and recurring expenses
✅ **Real-time Data** - Live data from Lunch Money API
✅ **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Vercel Serverless Functions
- **API:** Lunch Money API v1
- **Styling:** CSS3 with Gradients & Animations

## Project Structure

```
ralph-budget-app/
├── api/                          # Vercel serverless functions
│   ├── budgets.js               # Fetch budgets from Lunch Money
│   ├── transactions.js          # Fetch current month transactions
│   ├── subscriptions.js         # Fetch recurring expenses
│   └── summary.js               # Calculate dashboard summary
├── src/
│   ├── App.jsx                  # Main dashboard component
│   ├── App.css                  # Dashboard styling
│   ├── main.jsx                 # React entry point
│   └── components/
│       ├── BudgetCard.jsx       # Individual budget display
│       ├── SinkingFundCard.jsx  # Recurring cost display
│       ├── SummaryCard.jsx      # "Every Dollar" summary
│       ├── LoadingSpinner.jsx   # Loading state
│       └── ErrorBanner.jsx      # Error display
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment config
└── README.md                   # This file
```

## API Setup

### 1. Get Your Lunch Money API Key

1. Go to https://lunchmoney.app
2. Login to your account
3. Navigate to Settings → Developers
4. Copy your API key (starts with `sk_`)

### 2. Set Environment Variable in Vercel

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add a new variable:
   - **Name:** `LUNCH_MONEY_API_KEY`
   - **Value:** Your API key from step 1
4. Redeploy the project

## Deployment

### One-Time Setup

```bash
# 1. Clone or download the project
git clone https://github.com/RVenhoven/ralph-budget-app.git
cd ralph-budget-app

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

### Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects the build configuration
5. Click "Deploy"
6. Add environment variable: `LUNCH_MONEY_API_KEY`
7. Click "Redeploy"

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Troubleshooting

### "Failed to load dashboard" Error

1. Check that `LUNCH_MONEY_API_KEY` is set in Vercel Environment Variables
2. Verify the API key starts with `sk_`
3. Make sure your Lunch Money account is active
4. Check the browser console for detailed error messages

### API Returns 401

- Your API key may be expired or incorrect
- Generate a new API key in Lunch Money Settings
- Update it in Vercel Environment Variables
- Redeploy the project

## Next Steps

- Add filtering by date range
- Implement budget vs actual variance analysis
- Create Android widget for Sonja
- Add expense categorization
- Build savings goals tracker

## Author

Ralph Venhoven

## License

MIT

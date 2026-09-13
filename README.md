# Ralph's Household Finance Dashboard

A financial management dashboard for household budgeting, goal tracking, and periodic cost allocation using the "every dollar has a job" methodology.

## Features

- 📊 Budget tracking with progress visualization
- 🎯 Savings goals and renovation fund tracking
- 🚐 Periodic/yearly cost allocation (sinking funds)
- 📱 Mobile-responsive design
- 🔄 Ready for Lunch Money API integration

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS (no dependencies)
- **Deployment**: Vercel

## Local Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ralph-budget-app.git
cd ralph-budget-app
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

Output goes to `dist/` directory

## Deployment to Vercel

### Option A: Via GitHub (Recommended)

1. Push this repository to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ralph-budget-app.git
git push -u origin main
```

2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your app is live! (URL will be shown)

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

## Project Structure

```
ralph-budget-app/
├── src/
│   ├── components/
│   │   ├── BudgetCard.jsx        # Budget display component
│   │   ├── SinkingFundCard.jsx    # Periodic costs component
│   │   └── SummaryCard.jsx        # Summary display component
│   ├── App.jsx                    # Main dashboard component
│   ├── App.css                    # Dashboard styling
│   └── main.jsx                   # React entry point
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
└── README.md                       # This file
```

## Current Data

Using dummy data for proof of concept:
- **Groceries**: €200 spent of €600 budget
- **Kitchen Renovation**: €4,000 of €40,000 goal
- **Caravaning Stalling**: €280 saved of €420 (due in 4 months)

## Next Steps

1. ✅ Deploy to Vercel
2. 🔄 Integrate Lunch Money API
3. 📱 Build Sonja's widget version
4. 🔔 Add push notifications
5. 🔐 Implement user authentication

## Contributing

This is a personal project for Ralph's household budget management.

## License

MIT

---

**Dashboard Status**: Proof of Concept (v0.1)  
**Last Updated**: September 2026  
**Ready for**: Lunch Money integration (coming soon)

import { useState } from 'react'
import './App.css'
import BudgetCard from './components/BudgetCard'
import SinkingFundCard from './components/SinkingFundCard'
import SummaryCard from './components/SummaryCard'

export default function App() {
  const [budgets] = useState([
    {
      id: 'groceries',
      name: 'Groceries',
      emoji: '🛒',
      spent: 200,
      budget: 600,
      category: 'budget',
      status: 'on-track',
      statusLabel: 'On track'
    },
    {
      id: 'kitchen',
      name: 'Kitchen Renovation',
      emoji: '🏠',
      spent: 4000,
      budget: 40000,
      category: 'goal',
      status: 'long-term',
      statusLabel: 'Long-term goal'
    }
  ])

  const [sinkingFunds] = useState([
    {
      id: 'caravaning',
      name: 'Caravaning Stalling',
      emoji: '🚐',
      saved: 280,
      goal: 420,
      monthsUntilDue: 4,
      monthlyAllocation: 35,
      status: 'on-schedule'
    }
  ])

  const groceriesBudget = budgets.find(b => b.id === 'groceries')
  const percentSpent = Math.round((groceriesBudget.spent / groceriesBudget.budget) * 100)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Household Financial Dashboard</h1>
          <p className="header-subtitle">Ralph & Sonja's Budget Control System</p>
        </div>
      </header>

      <main className="main-content">
        <section className="dashboard-section">
          <h2 className="section-title">Current Budgets & Goals</h2>
          <div className="cards-grid">
            {budgets.map(budget => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Periodic Costs - Monthly Allocation</h2>
          <div className="cards-grid">
            {sinkingFunds.map(fund => (
              <SinkingFundCard key={fund.id} fund={fund} />
            ))}
            <div className="placeholder-card">
              <div className="placeholder-label">Insurance (annual)</div>
              <div className="placeholder-value">€75 / month</div>
              <div className="placeholder-note">Example periodic cost</div>
            </div>
            <div className="placeholder-card">
              <div className="placeholder-label">Car Service (yearly)</div>
              <div className="placeholder-value">€67 / month</div>
              <div className="placeholder-note">€800 estimated annual</div>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Every Dollar Summary</h2>
          <div className="summary-grid">
            <SummaryCard
              label="Allocated This Month"
              value="€825"
              detail="Groceries (€200) + Sinking (€110) + Savings (€515)"
              type="success"
            />
            <SummaryCard
              label="Unallocated"
              value="€0"
              detail="Every dollar has a job ✓"
              type="warning"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Vercel Deployment Ready • Dashboard v0.1 • Lunch Money Integration Coming Soon</p>
      </footer>
    </div>
  )
}

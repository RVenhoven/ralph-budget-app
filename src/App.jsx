import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import BudgetCard from './components/BudgetCard'
import SinkingFundCard from './components/SinkingFundCard'
import SummaryCard from './components/SummaryCard'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBanner from './components/ErrorBanner'

export default function App() {
  const [budgets, setBudgets] = useState([])
  const [sinkingFunds, setSinkingFunds] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [budgetsRes, summaryRes, subscriptionsRes] = await Promise.all([
        axios.get('/api/budgets'),
        axios.get('/api/summary'),
        axios.get('/api/subscriptions')
      ])

      // Process budgets data
      const budgetsData = budgetsRes.data.budgets || []
      const processedBudgets = budgetsData.map(budget => ({
        id: budget.id,
        name: budget.category || 'Budget',
        emoji: getEmojiForCategory(budget.category),
        spent: budget.spent || 0,
        budget: budget.target || 0,
        category: 'budget',
        status: budget.status || 'on-track',
        statusLabel: getStatusLabel(budget.status),
        percentage: Math.round((budget.spent / budget.target) * 100)
      }))
      setBudgets(processedBudgets)

      // Process summary
      setSummary(summaryRes.data.summary || {})

      // Process subscriptions
      setSubscriptions(subscriptionsRes.data.subscriptions || [])

      // TODO: Process sinking funds from transactions with specific tags
      // For now, use placeholder
      setSinkingFunds([
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
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load dashboard data. Please check your Lunch Money connection.')
    } finally {
      setLoading(false)
    }
  }

  const getEmojiForCategory = (category) => {
    const emojiMap = {
      'Groceries': '🛒',
      'Utilities': '⚡',
      'Entertainment': '🎮',
      'Transportation': '🚗',
      'Insurance': '🛡️',
      'Dining': '🍽️',
      'Shopping': '🛍️',
      'Healthcare': '🏥',
      'Kitchen Fund': '🏠',
      'Vacation': '🏖️',
      'Emergency Fund': '🆘',
      'Investments': '📈'
    }
    return emojiMap[category] || '📊'
  }

  const getStatusLabel = (status) => {
    const labels = {
      'on-track': 'On track',
      'warning': 'Approaching limit',
      'over': 'Over budget'
    }
    return labels[status] || 'Active'
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Household Financial Dashboard</h1>
          <p className="header-subtitle">Ralph & Sonja's Budget Control System • Live Data</p>
          <button onClick={fetchData} className="refresh-btn">
            🔄 Refresh Data
          </button>
        </div>
      </header>

      <main className="main-content">
        {error && <ErrorBanner message={error} />}

        <section className="dashboard-section">
          <h2 className="section-title">Current Budgets & Goals</h2>
          {budgets.length > 0 ? (
            <div className="cards-grid">
              {budgets.map(budget => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No budgets found. Set up budgets in Lunch Money.</p>
          )}
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Periodic Costs - Monthly Allocation</h2>
          <div className="cards-grid">
            {sinkingFunds.map(fund => (
              <SinkingFundCard key={fund.id} fund={fund} />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Subscriptions & Recurring Expenses</h2>
          {subscriptions.length > 0 ? (
            <div className="subscriptions-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                    <th>Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.slice(0, 5).map(sub => (
                    <tr key={sub.id}>
                      <td>{sub.name}</td>
                      <td>€{sub.amount.toFixed(2)}</td>
                      <td>{sub.frequency}</td>
                      <td>{sub.nextDate || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="subscriptions-summary">
                Monthly: €{subscriptions.filter(s => s.frequency === 'monthly').reduce((sum, s) => sum + s.amount, 0).toFixed(2)} | 
                Annual: €{subscriptions.reduce((sum, s) => sum + s.amount * (s.frequency === 'yearly' ? 1 : 12), 0).toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="empty-state">No recurring expenses found.</p>
          )}
        </section>

        {summary && (
          <section className="dashboard-section">
            <h2 className="section-title">Every Dollar Summary</h2>
            <div className="summary-grid">
              <SummaryCard
                label="Total Budgeted"
                value={`€${summary.totalBudget?.toFixed(2) || '0.00'}`}
                detail={`Across ${summary.budgetCount || 0} categories`}
                type="info"
              />
              <SummaryCard
                label="Total Spent"
                value={`€${summary.totalSpent?.toFixed(2) || '0.00'}`}
                detail={`${summary.percentageSpent?.toFixed(1) || 0}% of budget`}
                type="warning"
              />
              <SummaryCard
                label="Remaining"
                value={`€${summary.totalRemaining?.toFixed(2) || '0.00'}`}
                detail="Available to allocate"
                type={summary.totalRemaining >= 0 ? 'success' : 'error'}
              />
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Live Lunch Money Integration • Dashboard v0.2 • Last refreshed: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  )
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetCard from './components/BudgetCard';
import SinkingFundCard from './components/SinkingFundCard';
import SummaryCard from './components/SummaryCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBanner from './components/ErrorBanner';
import './App.css';

function App() {
  const [budgets, setBudgets] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [budgetsRes, subsRes, summaryRes] = await Promise.all([
        axios.get('/api/budgets'),
        axios.get('/api/subscriptions'),
        axios.get('/api/summary'),
      ]);

      setBudgets(budgetsRes.data.budgets || []);
      setSubscriptions(subsRes.data.recurring_expenses || []);
      setSummary(summaryRes.data);
    } catch (err) {
      setError(`Failed to load dashboard: ${err.message}`);
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app">
      <header className="header">
        <h1>💰 Financial Dashboard</h1>
        <button onClick={fetchData} className="refresh-btn">
          🔄 Refresh
        </button>
      </header>

      {error && <ErrorBanner message={error} />}

      <main className="dashboard">
        {summary && <SummaryCard summary={summary} />}

        <section className="section">
          <h2>Budget Categories</h2>
          <div className="cards-grid">
            {budgets.slice(0, 3).map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Subscriptions & Recurring Costs</h2>
          <div className="cards-grid">
            {subscriptions.slice(0, 5).map((sub) => (
              <SinkingFundCard key={sub.id} item={sub} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

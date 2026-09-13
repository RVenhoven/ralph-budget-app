export default function BudgetCard({ budget }) {
  const percentageSpent = Math.round((budget.spent / budget.budget) * 100)
  const remaining = budget.budget - budget.spent
  
  let statusClass = 'badge-success'
  if (budget.status === 'long-term') {
    statusClass = 'badge-info'
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-emoji">{budget.emoji}</span>
        <h3 className="card-title">{budget.name}</h3>
      </div>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'baseline' }}>
          <span className="card-amount">€{budget.spent.toLocaleString()}</span>
          <span className="card-subtext">of €{budget.budget.toLocaleString()}</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
          />
        </div>
      </div>

      <div className="card-stats">
        <span className="card-stat">Spent: {percentageSpent}%</span>
        <span className="card-stat">Remaining: €{remaining.toLocaleString()}</span>
      </div>

      <div className={`card-badge ${statusClass}`}>
        {budget.statusLabel}
      </div>
    </div>
  )
}

export default function SinkingFundCard({ fund }) {
  const percentageSaved = Math.round((fund.saved / fund.goal) * 100)
  const remaining = fund.goal - fund.saved

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-emoji">{fund.emoji}</span>
        <h3 className="card-title">{fund.name}</h3>
      </div>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'baseline' }}>
          <span className="card-amount">€{fund.saved.toLocaleString()}</span>
          <span className="card-subtext">of €{fund.goal.toLocaleString()}</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(percentageSaved, 100)}%`, background: 'linear-gradient(90deg, #eb6834 0%, #eda100 100%)' }}
          />
        </div>
      </div>

      <div className="card-stats">
        <span className="card-stat">Saved: {percentageSaved}%</span>
        <span className="card-stat">Need: €{remaining.toLocaleString()}</span>
      </div>

      <div className="card-badge badge-info">
        → Due in {fund.monthsUntilDue} months
      </div>

      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '0.5px solid #e1e0d9', fontSize: '11px', color: '#52514e' }}>
        <strong>€{fund.monthlyAllocation}/month</strong> allocation
      </div>
    </div>
  )
}

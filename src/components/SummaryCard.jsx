export default function SummaryCard({ summary }) {
  return (
    <div className="card summary-card">
      <h2>Every Dollar Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="label">Total Budgeted</span>
          <span className="value">${summary.totalBudgeted?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Spent</span>
          <span className="value spent">${summary.totalSpent?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-item">
          <span className="label">Monthly Recurring</span>
          <span className="value">${summary.monthlyRecurring?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-item">
          <span className="label">Remaining</span>
          <span className={`value ${summary.remaining >= 0 ? 'positive' : 'negative'}`}>
            ${summary.remaining?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>
    </div>
  );
}

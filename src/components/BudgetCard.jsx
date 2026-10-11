export default function BudgetCard({ budget }) {
  const spent = budget.spent_amount || 0;
  const expected = budget.expected_spend || 1;
  const percentage = Math.min((spent / expected) * 100, 100);

  return (
    <div className="card budget-card">
      <h3>{budget.name}</h3>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="budget-stats">
        <span>${spent.toFixed(2)} / ${expected.toFixed(2)}</span>
        <span className={percentage > 100 ? 'over-budget' : ''}>
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

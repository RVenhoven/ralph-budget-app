export default function SinkingFundCard({ item }) {
  return (
    <div className="card sinking-fund-card">
      <h3>{item.name}</h3>
      <div className="fund-info">
        <span className="amount">${item.amount?.toFixed(2) || '0.00'}</span>
        <span className="frequency">{item.frequency || 'monthly'}</span>
      </div>
    </div>
  );
}

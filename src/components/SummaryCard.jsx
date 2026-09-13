export default function SummaryCard({ label, value, detail, type }) {
  const className = type === 'success' ? 'success-bg' : 'warning-bg'

  return (
    <div className={`summary-card ${className}`}>
      <div className="summary-label">{label}</div>
      <div className="summary-value">{value}</div>
      <div className="summary-detail">{detail}</div>
    </div>
  )
}

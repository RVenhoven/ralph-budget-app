export default function SummaryCard({ label, value, detail, type = 'info' }) {
  const typeClass = type === 'success' ? 'success-bg' : type === 'error' ? 'error-bg' : 'info-bg'

  return (
    <div className={`summary-card ${typeClass}`}>
      <div className="summary-label">{label}</div>
      <div className="summary-value">{value}</div>
      <div className="summary-detail">{detail}</div>
    </div>
  )
}

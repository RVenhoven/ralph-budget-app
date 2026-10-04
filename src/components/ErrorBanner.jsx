export default function ErrorBanner({ message }) {
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <div className="error-content">
        <strong>Error Loading Data</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}

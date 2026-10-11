export default function ErrorBanner({ message }) {
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <span className="error-message">{message}</span>
    </div>
  );
}

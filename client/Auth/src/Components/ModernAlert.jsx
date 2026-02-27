export default function ModernAlert({ text, type, onClose }) {
  if (!text) return null;

  return (
    <div className={`modern-alert ${type}`}>
      <span>{text}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
}

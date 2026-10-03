import { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  useEffect(() => { const timer = setTimeout(onClose, 4200); return () => clearTimeout(timer); }, [onClose]);
  return <div className={`toast toast-${type}`} role="status"><span>{type === 'error' ? '!' : '✓'}</span>{message}<button onClick={onClose} aria-label="Dismiss notification">×</button></div>;
}
export default Toast;

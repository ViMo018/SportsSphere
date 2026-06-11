function Toast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  return (
    <div className={`toast toast-${toast.type}`}>
      <p>{toast.message}</p>

      <button type="button" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}

export default Toast;
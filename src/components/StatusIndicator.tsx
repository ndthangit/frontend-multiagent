interface StatusIndicatorProps {
  active: boolean;
  message: string;
}

export default function StatusIndicator({ active, message }: StatusIndicatorProps) {
  if (!active) return null;

  return (
    <div className="status-indicator-bar">
      <div className="status-spinner"></div>
      <span>{message}</span>
    </div>
  );
}

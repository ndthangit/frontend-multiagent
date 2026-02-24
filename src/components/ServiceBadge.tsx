interface ServiceBadgeProps {
  serviceName: string;
  icon: string;
}

export default function ServiceBadge({ serviceName, icon }: ServiceBadgeProps) {
  return (
    <div className="service-badge">
      <span className="service-badge-icon">{icon}</span>
      <span className="service-badge-text">via {serviceName}</span>
      <svg className="service-badge-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0C2.69 0 0 2.69 0 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM4.8 9L2.4 6.6l.85-.85L4.8 7.3 8.75 3.35l.85.85L4.8 9z" fill="currentColor"/>
      </svg>
    </div>
  );
}

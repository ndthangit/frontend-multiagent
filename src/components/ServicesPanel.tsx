import type { Service } from '../types';

interface ServicesPanelProps {
  services: Service[];
  onConnect: (service: Service) => void;
}

export default function ServicesPanel({ services, onConnect }: ServicesPanelProps) {
  return (
    <div className="services-panel">
      <div className="services-header">
        <h2>Connected Services</h2>
        <button className="collapse-btn">−</button>
      </div>
      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <div className="service-icon">{service.icon}</div>
            <div className="service-info">
              <h3>{service.name}</h3>
              <div className="service-status">
                <div className={`status-indicator ${service.connected ? 'connected' : 'disconnected'}`}></div>
                <span>{service.connected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
            {!service.connected && (
              <button
                className="service-connect-btn"
                onClick={() => onConnect(service)}
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="connect-service-btn">+ Connect New Service</button>
    </div>
  );
}

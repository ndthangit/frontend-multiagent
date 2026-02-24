import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { services as initialServices } from '../data/mockData';
import type { Service } from '../types';

interface ServicesContextType {
  services: Service[];
  updateServiceConnection: (serviceId: string, connected: boolean) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState(initialServices);

  const updateServiceConnection = (serviceId: string, connected: boolean) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId ? { ...service, connected } : service
      )
    );
  };

  return (
    <ServicesContext.Provider value={{ services, updateServiceConnection }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'calendar' | 'file' | 'text';
    data?: any;
    services?: Array<{ name: string; icon: string }>;
  };
}

export interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  permissions?: string[];
}

export interface TaskStatus {
  active: boolean;
  message: string;
}

export interface OAuthState {
  isOpen: boolean;
  service: Service | null;
}

export interface AgentAction {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  service?: string;
  operation: string;
  config: Record<string, any>;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  trigger: AgentAction;
  actions: AgentAction[];
  createdAt: Date;
  lastRun?: Date;
  runCount: number;
}

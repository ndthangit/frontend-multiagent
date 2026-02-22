import type { Conversation, Service, Agent } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Google Calendar',
    icon: '📅',
    connected: true,
    permissions: [
      'See, edit, share, and permanently delete all the calendars you can access using Google Calendar',
      'View and edit events on all your calendars'
    ]
  },
  {
    id: '2',
    name: 'Google Drive',
    icon: '💾',
    connected: true,
    permissions: [
      'See, edit, create, and delete all of your Google Drive files',
      'View and manage metadata of files in your Google Drive'
    ]
  },
  {
    id: '3',
    name: 'Gmail',
    icon: '✉️',
    connected: true,
    permissions: [
      'Read, compose, send, and permanently delete all your email from Gmail',
      'Manage drafts and send emails'
    ]
  },
  {
    id: '4',
    name: 'Slack',
    icon: '💬',
    connected: false,
    permissions: [
      'Access your workspace\'s profile information',
      'Post messages and upload files',
      'View messages and other content in public channels'
    ]
  },
  {
    id: '5',
    name: 'Notion',
    icon: '📝',
    connected: false,
    permissions: [
      'Read content from your Notion workspace',
      'Update and create new pages',
      'Access comments and discussions'
    ]
  },
];

export const pastConversations: Conversation[] = [
  {
    id: '1',
    title: 'Generated Report - May 5',
    date: 'May 5, 2024',
    messages: []
  },
  {
    id: '2',
    title: 'Planned Vacation - April 28',
    date: 'April 28, 2024',
    messages: []
  },
  {
    id: '3',
    title: 'Meeting Notes - April 25',
    date: 'April 25, 2024',
    messages: []
  },
  {
    id: '4',
    title: 'Project Alpha Setup',
    date: 'April 20, 2024',
    messages: []
  }
];

export const currentConversation: Conversation = {
  id: 'current',
  title: 'Current Session',
  date: 'Today',
  messages: [
    {
      id: 'm1',
      role: 'user',
      content: 'Check my schedule for tomorrow and find any conflicts with a 2-hour deep work block.',
      timestamp: new Date('2024-05-10T10:00:00')
    },
    {
      id: 'm2',
      role: 'assistant',
      content: 'You have a meeting from 10-11 AM. I can schedule your deep work block from 2-4 PM. Should I proceed?',
      timestamp: new Date('2024-05-10T10:00:15'),
      metadata: {
        type: 'calendar',
        data: {
          events: [
            { time: '10:00 AM - 11:00 AM', title: 'Team Standup' },
            { time: '11:30 AM - 12:00 PM', title: 'Coffee Chat with Sarah' }
          ]
        },
        services: [{ name: 'Google Calendar', icon: '📅' }]
      }
    },
    {
      id: 'm3',
      role: 'user',
      content: 'Yes, and find the project brief PDF in my Drive related to this.',
      timestamp: new Date('2024-05-10T10:01:00')
    },
    {
      id: 'm4',
      role: 'assistant',
      content: "Scheduled. I found 'Project_Alpha_Brief.pdf' in your Drive. Here's a summary of the key objectives...",
      timestamp: new Date('2024-05-10T10:01:20'),
      metadata: {
        type: 'file',
        data: {
          fileName: 'Project_Alpha_Brief.pdf',
          summary: [
            'Develop new customer onboarding flow',
            'Reduce time-to-value by 40%',
            'Launch beta by Q3 2024',
            'Target 500 beta users'
          ]
        },
        services: [
          { name: 'Google Calendar', icon: '📅' },
          { name: 'Google Drive', icon: '💾' }
        ]
      }
    }
  ]
};

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Daily Email Summary',
    description: 'Automatically summarize important emails every morning and send to Slack',
    icon: '📧',
    enabled: true,
    trigger: {
      id: 'trigger-1',
      type: 'trigger',
      service: 'Gmail',
      operation: 'New email received',
      config: { time: '9:00 AM', filter: 'is:important' }
    },
    actions: [
      {
        id: 'action-1',
        type: 'action',
        service: 'AI',
        operation: 'Summarize content',
        config: { maxLength: 200 }
      },
      {
        id: 'action-2',
        type: 'action',
        service: 'Slack',
        operation: 'Send message',
        config: { channel: '#general' }
      }
    ],
    createdAt: new Date('2024-05-01'),
    lastRun: new Date('2024-05-10T09:00:00'),
    runCount: 42
  },
  {
    id: 'agent-2',
    name: 'Meeting Prep Assistant',
    description: 'Find relevant files in Drive before each calendar meeting',
    icon: '📅',
    enabled: true,
    trigger: {
      id: 'trigger-2',
      type: 'trigger',
      service: 'Google Calendar',
      operation: 'Before event',
      config: { timeBefore: '30 minutes' }
    },
    actions: [
      {
        id: 'action-3',
        type: 'action',
        service: 'Google Drive',
        operation: 'Search files',
        config: { query: 'meeting title keywords' }
      },
      {
        id: 'action-4',
        type: 'action',
        service: 'AI',
        operation: 'Create summary',
        config: { includeLinks: true }
      }
    ],
    createdAt: new Date('2024-04-15'),
    lastRun: new Date('2024-05-09T14:30:00'),
    runCount: 28
  },
  {
    id: 'agent-3',
    name: 'Weekly Report Generator',
    description: 'Compile weekly activity report from Calendar and Drive',
    icon: '📊',
    enabled: false,
    trigger: {
      id: 'trigger-3',
      type: 'trigger',
      operation: 'Schedule',
      config: { schedule: 'Every Friday at 5:00 PM' }
    },
    actions: [
      {
        id: 'action-5',
        type: 'action',
        service: 'Google Calendar',
        operation: 'Get events',
        config: { period: 'last 7 days' }
      },
      {
        id: 'action-6',
        type: 'action',
        service: 'Google Drive',
        operation: 'Get modified files',
        config: { period: 'last 7 days' }
      },
      {
        id: 'action-7',
        type: 'action',
        service: 'AI',
        operation: 'Generate report',
        config: { format: 'markdown' }
      }
    ],
    createdAt: new Date('2024-03-20'),
    runCount: 0
  }
];

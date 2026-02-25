export interface Reminder {
  id: string;
  title: string;
  description?: string;
  time: string;
  completed: boolean;
  category: 'medication' | 'appointment' | 'task' | 'other';
}

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  category: 'daily-care' | 'health' | 'communication' | 'settings';
  badge?: number;
  enabled: boolean;
}

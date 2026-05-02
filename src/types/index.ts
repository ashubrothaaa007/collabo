export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Todo' | 'In Progress' | 'Review' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  dueDate?: string;
  label?: string;
  createdAt: number;
  userId: string; // The user who created or owns this board item (since it's personal org context as requested)
}

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: number;
}

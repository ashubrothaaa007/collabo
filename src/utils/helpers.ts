import { format, isPast, isToday, isTomorrow } from 'date-fns';

export const formatDate = (date: number | string | Date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  return format(d, 'MMM d, yyyy');
};

export const isOverdue = (date: string | undefined) => {
  if (!date) return false;
  return isPast(new Date(date)) && !isToday(new Date(date));
};

export const getInitials = (name: string) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

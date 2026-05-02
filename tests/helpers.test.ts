import { formatDate, isOverdue, getInitials } from '../src/utils/helpers';
import { validateTask } from '../src/utils/validators';

describe('Helpers', () => {
  it('formats date correctly for today', () => {
    expect(formatDate(new Date().getTime())).toBe('Today');
  });

  it('formats date correctly for tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(formatDate(tomorrow.getTime())).toBe('Tomorrow');
  });

  it('checks overdue correctly', () => {
    const past = new Date();
    past.setDate(past.getDate() - 2);
    expect(isOverdue(past.toISOString())).toBe(true);

    const future = new Date();
    future.setDate(future.getDate() + 2);
    expect(isOverdue(future.toISOString())).toBe(false);
  });

  it('gets initials correctly', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Alice')).toBe('A');
    expect(getInitials('')).toBe('??');
  });
});

describe('Validators', () => {
  it('validates task with empty title', () => {
    expect(validateTask({ title: '' })).toHaveProperty('title');
    expect(validateTask({ title: '  ' })).toHaveProperty('title');
  });

  it('validates task with valid title', () => {
    expect(validateTask({ title: 'My Task' })).not.toHaveProperty('title');
  });
});

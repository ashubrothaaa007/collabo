export const validateTask = (task: { title?: string }) => {
  const errors: Record<string, string> = {};
  if (!task.title || task.title.trim() === '') {
    errors.title = 'Title is required';
  }
  return errors;
};

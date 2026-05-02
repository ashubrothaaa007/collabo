export const suggestTasks = async (prompt: string) => {
  const response = await fetch('/api/gemini/suggest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch task suggestions');
  }

  const data = await response.json();
  return data.tasks; // Array of tasks
};

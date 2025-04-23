export const sendEmail = async (email: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

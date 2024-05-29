export default async function startOnboardingSession() {
  const options: RequestInit = {
    method: 'GET'
  };
  const response = await fetch(`${process.env.NEXT_HOST}/api/start`, options);
  if (!response.ok) {
    const sessionData = await response.json();
    throw new Error(sessionData.error);
  }

  return await response.json() as any;
}


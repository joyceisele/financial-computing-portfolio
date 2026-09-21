const API_BASE_URL = '/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }
  );

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`
    );
  }

  return response.json();
}
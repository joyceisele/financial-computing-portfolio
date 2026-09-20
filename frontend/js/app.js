async function checkBackendHealth() {
  const statusElement = document.getElementById('backend-status');

  try {
    const response = await fetch('http://localhost:3000/health');

    const data = await response.json();

    statusElement.textContent =
      `Backend Status: ${data.status}`;
  } catch (error) {
    statusElement.textContent =
      'Backend Status: Unavailable';

    console.error(error);
  }
}

checkBackendHealth();
async function loadDashboard() {
  try {
    const data = await apiRequest('/dashboard');

    document.getElementById(
      'portfolio-value'
    ).textContent =
      `£${data.portfolioValue.toLocaleString()}`;

    document.getElementById(
      'daily-return'
    ).textContent =
      `${data.dailyReturn}%`;

    document.getElementById(
      'portfolio-risk'
    ).textContent =
      data.portfolioRisk;

    document.getElementById(
      'assets-tracked'
    ).textContent =
      data.assetsTracked;

  } catch (error) {
    console.error(
      'Unable to load dashboard',
      error
    );
  }
}

loadDashboard();
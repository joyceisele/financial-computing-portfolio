const logoutButton =
  document.getElementById('logout-button');

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem(
      'financialPortfolioLoggedIn'
    );

    window.location.href = '../';
  });
}
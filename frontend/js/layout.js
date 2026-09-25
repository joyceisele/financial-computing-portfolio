function getCurrentPage() {
  const path = window.location.pathname;

  if (path.includes('/dashboard')) return 'dashboard';
  if (path.includes('/securities')) return 'securities';
  if (path.includes('/prices')) return 'prices';
  if (path.includes('/performance')) return 'performance';
  if (path.includes('/timeseries')) return 'timeseries';
  if (path.includes('/currencies')) return 'currencies';
  if (path.includes('/fx-rates')) return 'fx-rates';
  if (path.includes('/horizon')) return 'horizon';

  return '';
}

function getLoggedInUser() {
  const storedUser = sessionStorage.getItem('financialPortfolioUser');

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

function navLink(page, label, href) {
  const activeClass = getCurrentPage() === page ? 'nav-link active' : 'nav-link';
  return `<a class="${activeClass}" href="${href}">${label}</a>`;
}

function setupLogout() {
  const logoutButton = document.getElementById('logout-button');

  if (!logoutButton) return;

  logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('financialPortfolioLoggedIn');
    sessionStorage.removeItem('financialPortfolioUser');
    window.location.href = '/';
  });
}

function renderNavigation() {
  const header = document.getElementById('app-header');

  if (!header) return;

  const user = getLoggedInUser();

  header.innerHTML = `
    <nav class="app-navbar">
      <div class="navbar-brand">
        <a href="/dashboard/">Financial Computing</a>
      </div>

      <div class="navbar-links">
        ${navLink('dashboard', 'Dashboard', '/dashboard/')}
        ${navLink('securities', 'Securities', '/securities/')}
        ${navLink('prices', 'Prices', '/prices/')}
        ${navLink('performance', 'Performance', '/performance/')}
        ${navLink('timeseries', 'Timeseries', '/timeseries/')}
        ${navLink('currencies', 'Currencies', '/currencies/')}
        ${navLink('fx-rates', 'FX Rates', '/fx-rates/')}
        ${navLink('horizon', 'Horizon', '/horizon/')}
      </div>

      <div class="navbar-user">
        <span>${user?.name || 'User'}</span>
        <button id="logout-button" class="logout-button" type="button">Logout</button>
      </div>
    </nav>
  `;

  setupLogout();
}

document.addEventListener('DOMContentLoaded', renderNavigation);

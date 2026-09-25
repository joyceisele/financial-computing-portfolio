const PAGE_SIZE = 20;

let horizonData = [];
let filteredData = [];
let currentPage = 1;
let sortKey = 'ticker';
let sortDirection = 'asc';

async function initialiseHorizon() {
  try {
    horizonData = await apiRequest('/horizon');
    filteredData = [...horizonData];

    populateFilters();
    setupFilterEvents();
    setupSorting();
    setupCSV();
    renderHorizon();
  } catch (error) {
    console.error('Unable to load Horizon data', error);
    document.getElementById('record-count').textContent = 'Unable to load Horizon data.';
  }
}

function uniqueValues(key) {
  return [...new Set(horizonData.map((item) => item[key]).filter(Boolean))].sort();
}

function populateSelect(selectId, values) {
  const select = document.getElementById(selectId);
  if (!select) return;

  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function populateFilters() {
  populateSelect('asset-filter', uniqueValues('assetClass'));
  populateSelect('currency-filter', uniqueValues('currency'));
  populateSelect('risk-filter', uniqueValues('risk'));
}

function setupFilterEvents() {
  ['ticker-filter', 'asset-filter', 'currency-filter', 'risk-filter'].forEach((id) => {
    const element = document.getElementById(id);
    element?.addEventListener('input', applyFilters);
    element?.addEventListener('change', applyFilters);
  });

  document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
}

function applyFilters() {
  const search = document.getElementById('ticker-filter').value.trim().toLowerCase();
  const assetClass = document.getElementById('asset-filter').value;
  const currency = document.getElementById('currency-filter').value;
  const risk = document.getElementById('risk-filter').value;

  filteredData = horizonData.filter((item) => {
    const matchesSearch =
      !search ||
      item.ticker.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search);

    const matchesAsset = !assetClass || item.assetClass === assetClass;
    const matchesCurrency = !currency || item.currency === currency;
    const matchesRisk = !risk || item.risk === risk;

    return matchesSearch && matchesAsset && matchesCurrency && matchesRisk;
  });

  currentPage = 1;
  renderHorizon();
}

function resetFilters() {
  document.getElementById('ticker-filter').value = '';
  document.getElementById('asset-filter').value = '';
  document.getElementById('currency-filter').value = '';
  document.getElementById('risk-filter').value = '';

  filteredData = [...horizonData];
  currentPage = 1;
  renderHorizon();
}

function setupSorting() {
  document.querySelectorAll('#horizon-table th[data-sort]').forEach((header) => {
    header.addEventListener('click', () => {
      const key = header.dataset.sort;

      if (sortKey === key) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = key;
        sortDirection = 'asc';
      }

      currentPage = 1;
      renderHorizon();
    });
  });
}

function sortData(data) {
  return [...data].sort((a, b) => {
    const first = a[sortKey];
    const second = b[sortKey];

    if (typeof first === 'number' && typeof second === 'number') {
      return sortDirection === 'asc' ? first - second : second - first;
    }

    const result = String(first ?? '').localeCompare(String(second ?? ''));
    return sortDirection === 'asc' ? result : -result;
  });
}

function percentageClass(value) {
  if (value > 0) return 'positive-value';
  if (value < 0) return 'negative-value';
  return 'neutral-value';
}

function riskClass(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, '-');
}

function renderTable(rows) {
  const body = document.getElementById('horizon-table-body');
  body.innerHTML = '';

  rows.forEach((row) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><strong>${row.ticker}</strong></td>
      <td>${row.name}</td>
      <td>${row.assetClass}</td>
      <td>${row.sector}</td>
      <td>${row.currency}</td>
      <td><span class="risk-badge risk-${riskClass(row.risk)}">${row.risk}</span></td>
      <td>${Number(row.price).toFixed(2)}</td>
      <td class="${percentageClass(row.dailyChange)}">${row.dailyChange.toFixed(2)}%</td>
      <td class="${percentageClass(row.oneYearReturn)}">${row.oneYearReturn.toFixed(2)}%</td>
      <td>${row.benchmark.toFixed(2)}%</td>
      <td class="${percentageClass(row.excessReturn)}">${row.excessReturn.toFixed(2)}%</td>
    `;

    body.appendChild(tr);
  });
}

function renderPagination(totalRecords) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);
  if (totalPages <= 1) return;

  const previous = document.createElement('button');
  previous.textContent = 'Previous';
  previous.disabled = currentPage === 1;
  previous.addEventListener('click', () => {
    currentPage -= 1;
    renderHorizon();
  });
  pagination.appendChild(previous);

  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement('button');
    button.textContent = page;

    if (page === currentPage) button.classList.add('active');

    button.addEventListener('click', () => {
      currentPage = page;
      renderHorizon();
    });

    pagination.appendChild(button);
  }

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = currentPage === totalPages;
  next.addEventListener('click', () => {
    currentPage += 1;
    renderHorizon();
  });
  pagination.appendChild(next);
}

function renderHorizon() {
  const sorted = sortData(filteredData);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = sorted.slice(start, start + PAGE_SIZE);

  const emptyState = document.getElementById('empty-state');
  const table = document.getElementById('horizon-table');

  if (filteredData.length === 0) {
    table.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    table.classList.remove('hidden');
    emptyState.classList.add('hidden');
  }

  renderTable(pageRows);
  renderPagination(filteredData.length);

  document.getElementById('record-count').textContent =
    `Showing ${pageRows.length} of ${filteredData.length} matching records`;
}

function escapeCSV(value) {
  const text = String(value ?? '');

  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function setupCSV() {
  document.getElementById('download-csv')?.addEventListener('click', downloadCSV);
}

function downloadCSV() {
  const headers = [
    'Ticker',
    'Security',
    'Asset Class',
    'Sector',
    'Currency',
    'Risk',
    'Price',
    'Daily Change %',
    '1Y Return %',
    'Benchmark %',
    'Excess Return %'
  ];

  const rows = filteredData.map((item) => [
    item.ticker,
    item.name,
    item.assetClass,
    item.sector,
    item.currency,
    item.risk,
    item.price,
    item.dailyChange,
    item.oneYearReturn,
    item.benchmark,
    item.excessReturn
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCSV).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'horizon-analysis.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

initialiseHorizon();

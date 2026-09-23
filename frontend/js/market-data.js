async function loadSecurities() {
  const table = document.getElementById(
    'securities-table'
  );

  if (!table) return;

  const rows = await apiRequest('/securities');

  renderTable({
    tableBodyId: 'securities-table',
    rows,
    columns: [
      { key: 'ticker' },
      { key: 'name' },
      { key: 'assetClass' },
      { key: 'sector' },
      { key: 'currency' },
      { key: 'risk' }
    ]
  });
}

async function loadPrices() {
  const table = document.getElementById(
    'prices-table'
  );

  if (!table) return;

  const rows = await apiRequest('/prices');

  renderTable({
    tableBodyId: 'prices-table',
    rows,
    columns: [
      { key: 'ticker' },

      {
        render: (row) =>
          row.price.toFixed(2)
      },

      {
        render: (row) =>
          row.previousClose.toFixed(2)
      },

      {
        render: (row) =>
          (row.price - row.previousClose)
            .toFixed(2)
      },

      {
        render: (row) => {
          const change =
            ((row.price - row.previousClose)
             / row.previousClose) * 100;

          return `${change.toFixed(2)}%`;
        }
      },

      { key: 'dayHigh' },
      { key: 'dayLow' }
    ]
  });
}

async function loadCurrencies() {
  const table = document.getElementById(
    'currencies-table'
  );

  if (!table) return;

  const rows = await apiRequest('/currencies');

  renderTable({
    tableBodyId: 'currencies-table',
    rows,
    columns: [
      { key: 'code' },
      { key: 'name' },
      { key: 'region' },
      { key: 'status' },
    ]
  });
}

async function loadFxRates() {
  const table = document.getElementById(
    'fx-rates-table'
  );

  if (!table) return;

  const rows = await apiRequest('/fx-rates');

  renderTable({
    tableBodyId: 'fx-rates-table',
    rows,
    columns: [
      { key: 'pair' },

      {
        render: (row) =>
          row.rate.toFixed(2)
      },

      {
        render: (row) =>
          row.previousRate.toFixed(2)
      },

      {
        render: (row) =>
          (row.rate - row.previousRate)
            .toFixed(2)
      },

      {
        render: (row) => {
          const change =
            ((row.rate - row.previousRate)
             / row.previousRate) * 100;

          return `${change.toFixed(2)}%`;
        }
      },
    ]
  });
}

loadSecurities();
loadPrices();
loadCurrencies();
loadFxRates();
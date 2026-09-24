async function loadTimeseries() {
  const table = document.getElementById(
    'timeseries-table'
  );

  if (!table) return;

  const rows = await apiRequest('/timeseries');

  const firstPrice = rows[0].price;
  const latestPrice =
    rows[rows.length - 1].price;

  const periodChange =
    latestPrice - firstPrice;

  const periodChangePercentage =
    (periodChange / firstPrice) * 100;

  const prices =
    rows.map(row => row.price);

  const highestPrice =
    Math.max(...prices);

  const lowestPrice =
    Math.min(...prices);

  renderTable({
    tableBodyId: 'timeseries-table',
    rows,
    columns: [
      { key: 'date' },

      { key: 'ticker' },

      {
        render: (row) =>
          row.price.toFixed(2)
      },

      {
        render: (row) => {
          const index =
            rows.indexOf(row);

          if (index === 0) return '-';

          return (
            row.price -
            rows[index - 1].price
          ).toFixed(2);
        }
      },

      {
        render: (row) => {
          const index =
            rows.indexOf(row);

          if (index === 0) return '-';

          const change =
            row.price -
            rows[index - 1].price;

          const percentage =
            (change /
              rows[index - 1].price) * 100;

          return `${percentage.toFixed(2)}%`;
        }
      },

      {
        render: () =>
          firstPrice.toFixed(2)
      },

      {
        render: () =>
          latestPrice.toFixed(2)
      },

      {
        render: () =>
          periodChange.toFixed(2)
      },

      {
        render: () =>
          `${periodChangePercentage.toFixed(2)}%`
      },

      {
        render: () =>
          highestPrice.toFixed(2)
      },

      {
        render: () =>
          lowestPrice.toFixed(2)
      }
    ]
  });
}

loadTimeseries();

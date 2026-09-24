async function loadPerformance() {
  const table =
    document.getElementById('performance-table');

  if (!table) return;

  try {
    const rows =
      await apiRequest('/performance');

    renderTable({
      tableBodyId: 'performance-table',

      rows,

      columns: [
        {
          key: 'ticker'
        },

        {
          render: row =>
            `${row.oneMonth.toFixed(2)}%`
        },

        {
          render: row =>
            `${row.threeMonths.toFixed(2)}%`
        },

        {
          render: row =>
            `${row.sixMonths.toFixed(2)}%`
        },

        {
          render: row =>
            `${row.ytd.toFixed(2)}%`
        },

        {
          render: row =>
            `${row.oneYear.toFixed(2)}%`
        },

        {
          render: row =>
            `${row.benchmark.toFixed(2)}%`
        },

        {
          render: row => {
            const excess =
              row.oneYear - row.benchmark;

            return `${excess.toFixed(2)}%`;
          }
        }
      ]
    });

  } catch (error) {
    console.error(
      'Unable to load performance data',
      error
    );
  }
}

loadPerformance();
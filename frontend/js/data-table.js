function renderTable({
  tableBodyId,
  rows,
  columns
}) {
  const tableBody =
    document.getElementById(tableBodyId);

  tableBody.innerHTML = '';

  rows.forEach((row) => {
    const tr = document.createElement('tr');

    columns.forEach((column) => {
      const td = document.createElement('td');

      const value =
        typeof column.render === 'function'
          ? column.render(row)
          : row[column.key];

      td.textContent = value ?? '-';

      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}
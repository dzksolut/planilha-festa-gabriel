import React from 'react';
import './DataTable.css';

const formatConfirmationDate = (value) => {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

function DataTable({ data, title }) {
  return (
    <div className="data-table-container">
      <h2>{title}</h2>
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Data de Confirmação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.contato}-${index}`}>
                <td>{row.nome || '-'}</td>
                <td>{row.contato || '-'}</td>
                <td>{formatConfirmationDate(row.dataConfirmacao)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;

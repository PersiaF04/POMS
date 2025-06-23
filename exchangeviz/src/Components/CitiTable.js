import React from 'react';

function CitiTable({ data, columns }) {
  return (
    <table className="citi-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            style={row.style} // Apply the style passed from HomePage
          >
            {columns.map((col, index) => (
              <td key={index} style={{ color: "var(--citi-dark-blue)" }}>
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CitiTable;
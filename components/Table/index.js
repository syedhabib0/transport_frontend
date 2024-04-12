import React from "react";

const Table = ({ headers, data, className }) => {
  return (
    <div className="table-responsive scrollable-container">
      <table className={`table ${className}`}>
        {headers && (
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="text-base">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {data && data.length > 0 ? (
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td className="text-capitalize" key={cellIndex}>
                    <div className="ellipsis text-sm">
                      {typeof cell === "string"
                        ? cell.length > 40
                          ? `${cell.slice(0, 40)}...`
                          : cell
                        : cell}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={headers.length} className="text-center">
                No Data Available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;

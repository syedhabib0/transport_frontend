const Table = ({ headers, data, className }) => {
    return (
        <div className="table-responsive">
            <table className={`table ${className}`}>
                {headers && (
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                )}
                {data && data.length > 0 ? (
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        className="text-capitalize"
                                        key={cellIndex}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="text-center">
                                No Data Available
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default Table



import React, { useState, useMemo } from "react";

export interface TableColumnConfig<T> {
  name: string;
  uid: keyof T;
  sortable?: boolean;
  renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: TableColumnConfig<T>[];
  defaultRowsPerPage?: number;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  totalCount: number;
}

const DynamicTable = <T extends object>({
  data,
  columns,
  defaultRowsPerPage = 5,
  onSearchChange,
  searchPlaceholder = "Search...",
  totalCount,
}: DynamicTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [data, page, rowsPerPage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={15}>15 rows</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.uid)}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={String(col.uid)}>
                  {col.renderCell
                    ? col.renderCell(row[col.uid], row)
                    : String(row[col.uid])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination relative lg:static">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalCount / rowsPerPage)}
        </span>
        <button
          disabled={page === Math.ceil(totalCount / rowsPerPage)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;

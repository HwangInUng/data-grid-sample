import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

function TestTable({ initialData, setData, columns }) {

  const table = useReactTable({
    data: initialData,
    columns,
    meta: {
    },
    getCoreRowModel: getCoreRowModel()
  })

  // useMemo 미사용 시 행 추가시 렌더를 2번씩 실행
  // useMemo 사용 후 렌더링 1번 실행
  const memoizedRows = useMemo(() => table.getRowModel().rows, [initialData]);

  return (
    <div className="w-full">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroups, index) => (
            <tr key={index}>
              {headerGroups.headers.map(header => (
                <th key={header.id} className="border p-2">
                  {header.isPlaceholder ?
                    null :
                    flexRender(
                      header.column.columnDef.header, header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {memoizedRows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table >
    </div >
  );
};

export default TestTable;
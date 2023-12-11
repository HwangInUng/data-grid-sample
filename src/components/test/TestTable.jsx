import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";

function TestTable(props) {
  const {
    initialData,
    setData,
    columns,
    selectedData,
    setSelectedData
  } = props;
  const table = useReactTable({
    data: initialData,
    columns,
    meta: {
      editValue: (rowIndex, columnId, value) => {
        setData(old => old.map(
          (oldRow, index) => {
            if (index === rowIndex) {
              return {
                ...oldRow,
                [columnId]: value,
                rowType: oldRow.rowType === 'add' ? oldRow.rowType : 'update'
              };
            }
            return oldRow;
          }
        ));
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  // useMemo 미사용 시 행 추가시 렌더를 2번씩 실행
  // useMemo 사용 후 렌더링 1번 실행
  const memoizedRows = useMemo(() => table.getRowModel().rows, [initialData]);
  useEffect(() => console.log('test'))

  return (
    <div className="w-full">
      <table className="w-full">
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
            <tr
              key={row.id}
              className={selectedData === row.index ? 'bg-blue-200' : null}
              onClick={(e) => setSelectedData(e, row.index)}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border">
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
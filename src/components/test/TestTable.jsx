import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import TestTableFilter from "./TestTableFilter";
import TestTableHeader from "./TestTableHeader";

function TestTable(props) {
  const {
    initialData,
    setData,
    columns,
    selectedData,
    setSelectedData
  } = props;

  const [backupData, setBackupData] = useState(initialData);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      backupData,
      sorting,
      columnFilters,
    },
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
      },
      getFilterCheckList: (columnId) => {
        const filterCheckList = Array.from(new Set(backupData.map(data => data[columnId])));
        return filterCheckList;
      },
      getBackupData: () => backupData,
      handleSorting: (sortingType, columnId) => {
        const sortedColumn = sorting.map(col => col.id);
        if (sortedColumn.length === 0 || !sortedColumn.includes(columnId)) {
          setSorting(old => [
            ...old,
            { id: columnId, desc: sortingType }
          ]);
          return;
        }

        if (sortedColumn.includes(columnId)) {
          setSorting(old => old.map(col => (
            col.id === columnId ?
              { id: columnId, desc: sortingType } : col
          )));
        }
      },
      resetSorting: () => setSorting([]),
      handleFilters: (newFilters) => {
        setColumnFilters(newFilters)
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnFilters: true
  });
  const tableMeta = table.options.meta;
  // useMemo 미사용 시 행 추가시 렌더를 2번씩 실행
  // useMemo 사용 후 렌더링 1번 실행
  const memoizedRows = useMemo(() => table.getRowModel().rows, [initialData, sorting, columnFilters]);
  useEffect(() => console.log(columnFilters), [memoizedRows]);

  return (
    <div className="w-[1000px] h-[500px] overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroups, index) => (
            <tr key={index}>
              {headerGroups.headers.map(header => (
                <TestTableHeader
                  key={header.id}
                  header={header}
                  tableMeta={tableMeta}
                />
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
                <td key={cell.id} className="border whitespace-nowrap overflow-hidden">
                  <div className="w-full flex items-center justify-center">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </div>
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
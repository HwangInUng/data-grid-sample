import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import TestTableHeader from "./TestTableHeader";
import ToggleSwitch from "../utils/ToggleSwitch";
import { RefreshIcon } from "../utils/RefreshIcon";
import TestTableRow from "./TestTableRow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DataTable, DataTableCell, DataTableScrollBox, DataTableToggleBox } from "../styles/TableStyles";
import { useMergeHeaderGroups } from "../../hooks/useMergeHeaderGroups";

function TestTable(props) {
  const {
    initialData,
    setData,
    columns,
    selectedData,
    setSelectedData,
    fetchScroll
  } = props;
  const [backupData,] = useState(initialData);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);

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
        const filterCheckList = Array.from(
          new Set(backupData.map(data => data[columnId]))
        );
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
    enableColumnFilters: filterFlag
  });
  const tableMeta = table.options.meta;

  const mergeHeaderGropus = useMergeHeaderGroups(table.getHeaderGroups());
  const memoizedRows = useMemo(() => table.getRowModel().rows, [initialData, selectedData, sorting, columnFilters, backupData]);
  
  const handleFilterFlag = useCallback(() => {
    setFilterFlag(old => !old);
  }, []);

  const refreshTable = (e) => {
    setFilterFlag(false);
    setColumnFilters([]);
    setSorting([]);
    setData(backupData);
    setSelectedData(e, '');
  };

  const reorderRow = useCallback((draggedRowIndex, targetRowIndex) => {
    initialData.splice(targetRowIndex, 0, initialData.splice(draggedRowIndex, 1)[0])
    setData([...initialData]);
  }, [initialData]);

  const tableContainerRef = useRef();
  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => tableContainerRef.current,
    count: memoizedRows.length,
    estimateSize: () => 35,
    overscan: 10,
  });
  const { getVirtualItems: virtualRows, getTotalSize: totalSize } = rowVirtualizer;

  const paddingTop = virtualRows().length > 0 ? virtualRows()[0].start || 0 : 0;
  const paddingBottom = virtualRows().length > 0 ?
    totalSize() - virtualRows()[virtualRows().length - 1].end || 0 : 0;

  useEffect(() => {
    fetchScroll(tableContainerRef);
  }, [fetchScroll]);

  return (
    <div className="w-full">
      <DataTableToggleBox>
        <ToggleSwitch
          title='search'
          flag={filterFlag}
          onChange={handleFilterFlag}
        />
        <RefreshIcon onMouseDown={refreshTable} />
      </DataTableToggleBox>

      <DndProvider backend={HTML5Backend}>
        <DataTableScrollBox
          ref={tableContainerRef}
          onScroll={e => fetchScroll(e.target)}
        >
          <DataTable>
            <thead>
              {mergeHeaderGropus.map((headerGroups, index) => (
                <tr key={index}>
                  {headerGroups.map(header => (
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
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows().map(virtualRow => {
                const row = memoizedRows[virtualRow.index];
                return (
                  <TestTableRow
                    key={row.id}
                    row={row}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    reorderRow={reorderRow}
                  >
                    {row.getVisibleCells().map(cell => (
                      <DataTableCell key={cell.id}>
                        <div className="cell-box">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </DataTableCell>
                    ))}
                  </TestTableRow>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </DataTable >
        </DataTableScrollBox>
      </DndProvider >
    </div >
  );
};

export default TestTable;
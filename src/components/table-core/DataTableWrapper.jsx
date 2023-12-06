import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import ToggleSwitch from "../utils/ToggleSwitch";
import { RefreshIcon } from "../utils/RefreshIcon";
import tw, { styled } from "twin.macro";
import DataTable from "./DataTable";

const VirtualBox = styled.div`
    ${tw`
        w-full
        flex
        overflow-y-scroll
        h-[500px]
    `}
`;

export const TableContext = createContext();

function DataTableWrapper(props) {
    const {
        columns,
        initialData,
        setData,
        deleteData,
        setDeleteData,
        backupData,
        addStatusTable = false,
        enableColumnResizing = true
    } = props;
    const [columnResizeMode,] = useState('onChange');
    const [sorting, setSorting] = useState([]);
    const [filterFlag, setFilterFlag] = useState(false);
    const [, setSelectedData] = useState([]);
    const [, setColumnFilters] = useState([]);

    const table = useReactTable({
        data: initialData,
        columns,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setSelectedData,
        enableColumnResizing: enableColumnResizing,
        enableFilters: filterFlag,
    });

    const tableHeaderGroups = useMemo(() => table.getHeaderGroups(), [table]);
    const tableRows = useMemo(() => table.getRowModel().rows, [table]);

    const handleFilterFlag = useCallback(() => {
        setFilterFlag(old => !old);
    }, []);

    const resetTableData = useCallback(() => {
        setColumnFilters([]);
        setFilterFlag(false);
        setSorting([]);
        setSelectedData([]);
        setDeleteData([]);
        setData(backupData);
    }, [backupData, setData, setSelectedData, setDeleteData]);

    const matchingStatus = useMemo((targetRow) => {
        const editRows = initialData.filter(row => row.id < backupData.length && !backupData.includes(row));
        const isEdit = editRows.includes(targetRow) && !deleteData.includes(targetRow);
        const isRemove = deleteData.includes(targetRow);
        const isAdd = !backupData.includes(targetRow);

        if (isEdit) return 'edit';
        if (isRemove) return 'remove';
        if (isAdd) return 'add';
    }, [initialData, backupData, deleteData]);

    const handleSorting = useCallback((sortingType, columnId) => {
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
                col.id === columnId ? { id: columnId, desc: sortingType } : col
            )));
        }
    }, [sorting]);

    const reorderRow = useCallback((draggedRowIndex, targetRowIndex) => {
        initialData.splice(targetRowIndex, 0, initialData.splice(draggedRowIndex, 1)[0])
        setData([...initialData]);
    }, [initialData]);

    const contextValue = useMemo(() => ({
        setData,
        backupData,
        filterFlag,
        setSorting,
        setColumnFilters,
        matchingStatus,
        handleSorting,
        setSelectedData,
        reorderRow
    }), [
        setData,
        backupData,
        filterFlag,
        setSorting,
        setColumnFilters,
        matchingStatus,
        handleSorting,
        setSelectedData,
        reorderRow
    ]);

    return (
        <TableContext.Provider value={contextValue}>
            <div>
                <div className="mb-1 w-full flex justify-end gap-x-3">
                    <ToggleSwitch
                        title='search'
                        flag={filterFlag}
                        onChange={handleFilterFlag}
                    />
                    <RefreshIcon onClick={resetTableData} />
                </div>
                <VirtualBox>
                    {
                        // status 테이블 포함 시 고정된 열 크기의 테이블 생성
                        addStatusTable ?
                            <DataTable
                                tableHeaderGroups={tableHeaderGroups}
                                tableRows={tableRows}
                                addStatusTable
                            /> :
                            null
                    }
                    <DataTable
                        tableHeaderGroups={tableHeaderGroups}
                        tableRows={tableRows}
                    />
                </VirtualBox>
            </div>
        </TableContext.Provider>
    );
};

export default DataTableWrapper;
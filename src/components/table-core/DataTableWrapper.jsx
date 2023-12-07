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
export const StateContext = createContext();
export const DispatchContext = createContext();

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
    const [selectedData, setSelectedData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data: initialData,
        columns,
        columnResizeMode,
        state: {
            sorting,
            columnFilters,
            selectedData
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setSelectedData,
        enableColumnResizing: enableColumnResizing,
        enableFilters: filterFlag,
    });

    const memoizedHeaderGroups = useMemo(() => table.getHeaderGroups(), [table.getHeaderGroups()]);
    const memoizedRows = useMemo(() => table.getRowModel().rows, [table.getRowModel().rows]);

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
    }, []);

    const handleColumnFilters = useCallback((newFilters) => {
        setColumnFilters(newFilters);
    }, []);

    const resetSorting = useCallback(() => {
        setSorting([]);
    }, [])
    useEffect(() => console.log(initialData[0]), [initialData])
    const editValue = useCallback((initialValue, value, key, rowIndex) => {
        //초기 값과 수정된 값을 비교하여 수정된 로우 표시 가능
        if (initialValue !== value) {
            const updateRow = (old) =>
            old.map((oldRow, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [key]: value
                    };
                }
                return oldRow;
            });
            setData(updateRow);
        }
    }, []);

    const matchingStatus = useCallback((targetRow) => {
        const editRows = initialData.filter(row => row.id < backupData.length && !backupData.includes(row));
        // const isEdit = editRows.includes(targetRow) && !deleteData.includes(targetRow);
        const isEdit = editRows.includes(targetRow);
        const isRemove = deleteData.includes(targetRow);
        const isAdd = !backupData.includes(targetRow);

        if (isEdit) return 'edit';
        if (isRemove) return 'remove';
        if (isAdd) return 'add';
    }, []);

    const handleSelectedData = useCallback((targetRow) => {
        if (isSelected(targetRow)) {
            setSelectedData(old => old.filter(selectRow => selectRow !== targetRow));
        } else {
            setSelectedData(old => [...old, targetRow]);
        }
    }, []);

    const isSelected = useCallback((targetRow) => {
        return selectedData.includes(targetRow);
    }, []);

    const reorderRow = useCallback((draggedRowIndex, targetRowIndex) => {
        initialData.splice(targetRowIndex, 0, initialData.splice(draggedRowIndex, 1)[0])
        setData([...initialData]);
    }, []);

    const stateValue = useMemo(() => ({
        backupData,
        filterFlag,
        sorting,
    }), [backupData, filterFlag, sorting]);

    const dispatchValue = useMemo(() => ({
        setData,
        setDeleteData,
        setSorting,
        editValue,
        handleColumnFilters,
        isSelected,
        matchingStatus,
        resetSorting,
        handleSelectedData,
        reorderRow
    }), []);

    return (
        <StateContext.Provider value={stateValue}>
            <DispatchContext.Provider value={dispatchValue}>
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
                                    memoizedHeaderGroups={memoizedHeaderGroups}
                                    memoizedRows={memoizedRows}
                                    addStatusTable
                                /> :
                                null
                        }
                        <DataTable
                            memoizedHeaderGroups={memoizedHeaderGroups}
                            memoizedRows={memoizedRows}
                        />
                    </VirtualBox>
                </div>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export default DataTableWrapper;
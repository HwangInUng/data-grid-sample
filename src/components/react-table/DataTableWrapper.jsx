import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { createContext, useState } from "react";
import { ToggleSwitch } from "../common/ToggleSwitch";
import { BiSearchAlt } from "react-icons/bi";
import { DataTable } from "./DataTable";
import { RefreshIcon } from "../common/RefreshIcon";
import tw, { styled } from "twin.macro";

const VirtualBox = styled.div`
    ${tw`
        w-full
        flex
        overflow-y-scroll
        h-[500px]
    `}
`;

export const tableStateContext = createContext();

export const DataTableWrapper = (props) => {
    const {
        initialData,
        setData,
        resetData,
        columns,
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
            initialData,
            setData,
            backupData,
            selectedData,
            setSelectedData,
            sorting,
            setSorting,
            columnFilters,
            setColumnFilters
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

    const handleFilterFlag = () => {
        setFilterFlag(old => !old);
    };

    const resetTableData = () => {
        setColumnFilters([]);
        setFilterFlag(false);
        setSorting([]);
        setSelectedData([]);
        resetData();
    };

    return (
        <tableStateContext.Provider value={table.options.state}>
            <div>
                <div className="mb-1 w-full flex justify-end gap-x-3">
                    <ToggleSwitch
                        title={<BiSearchAlt />}
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
                                table={table}
                                addStatusTable
                            /> :
                            null
                    }
                    <DataTable
                        table={table}
                    />
                </VirtualBox>
            </div>
        </tableStateContext.Provider>
    );
};
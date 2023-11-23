import tw, { styled } from "twin.macro";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ToggleSwitch } from "../common/ToggleSwitch";
import { BiSearchAlt } from "react-icons/bi";
import { DataTable } from "./DataTable";
import { RefreshIcon } from "../common/RefreshIcon";

export const DataTableWrapper = (props) => {
    const {
        data,
        resetData,
        columns,
        backupData,
        addStatusTable
    } = props;
    const [columnResizeMode,] = useState('onChange');
    const [sorting, setSorting] = useState([]);
    const [filterFlag, setFilterFlag] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);


    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        state: {
            data,
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
        enableFilters: filterFlag,
    });

    const handleFilterFlag = () => {
        setFilterFlag(old => !old);
    };

    const resetTableData = () => {
        table.resetColumnFilters();
        setFilterFlag(false);
        setSelectedData([]);
        resetData();
    }

    return (
        <div>
            <div className="mb-1 w-full flex justify-end gap-x-3">
                <ToggleSwitch
                    title={<BiSearchAlt />}
                    flag={filterFlag}
                    onChange={handleFilterFlag}
                />
                <RefreshIcon onClick={resetTableData} />
            </div>
            <div className="w-full flex">
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
                    columnResizeMode={columnResizeMode}
                />
            </div>
        </div>
    );
}
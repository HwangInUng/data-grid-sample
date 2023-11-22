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

export const DataTableWrapper = (props) => {
    const { data, columns, backupData, addStatusTable } = props;
    const [columnResizeMode,] = useState('onChange');
    const [sorting, setSorting] = useState([]);
    const [filterFlag, setFilterFlag] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        state: {
            data,
            backupData,
            sorting,
            selectedData,
            setSelectedData,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableFilters: filterFlag,
    });

    const handleFilterFlag = () => {
        setFilterFlag(old => !old);
    };

    return (
        <div>
            <div className="mb-1 w-full flex justify-end">
                <ToggleSwitch title={<BiSearchAlt />} onChange={handleFilterFlag} />
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
import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTableCell } from "./DataTableCell";
import { ToggleSwitch } from "../common/ToggleSwitch";
import { BiSearchAlt } from "react-icons/bi";

const Table = styled.table`
    .data-thead{
        ${tw`
            bg-blue-50
        `}
    }

    .data-tbody{
        &:hover{
            ${tw`
                bg-slate-100
            `}
        }
    }
`;

export const DataTable = (props) => {
    const { data, columns, backupData } = props;
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

    const handleSelectRow = (selectedRow) => {
        if (selectedData.includes(selectedRow)) {
            setSelectedData(old => old.filter(row => row !== selectedRow));
        }

        if (!selectedData.includes(selectedRow)) {
            setSelectedData(old => [...old, selectedRow]);
        }
    }

    return (
        <div className="w-full">
            <div className="mb-1 w-full flex justify-end">
                <ToggleSwitch title={<BiSearchAlt />} onChange={handleFilterFlag} />
            </div>
            <div className="w-full">
                <Table style={{width: table.getCenterTotalSize()}}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="data-thead">
                                {headerGroup.headers.map(header => (
                                    <DataTableHeader
                                        key={header.id}
                                        table={table}
                                        header={header}
                                        columnResizeMode={columnResizeMode}
                                    />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className={`data-tbody ${selectedData.includes(row) ? 'bg-slate-100' : null}`}
                                onClick={() => handleSelectRow(row)}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <DataTableCell
                                        key={cell.id}
                                        cell={cell}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
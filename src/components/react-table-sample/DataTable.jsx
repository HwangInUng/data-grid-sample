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

const Table = styled.table`
    ${tw`
        w-[700px]
    `}
`;

export const DataTable = (props) => {
    const { data, setData, columns, setDeleteRows, newRow } = props;
    const [backupData, setBackupData] = useState([...props.data]);
    const [columnResizeMode, ] = useState('onChange');
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        state: {
            sorting
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableColumnFilters: true,
        enableFilters: true,
        meta: {

        }
    });

    return (
        <>
            <Table
                onContextMenu={(e) => e.preventDefault()}
            >
                <thead style={{ width: table.getCenterTotalSize() }}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
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
                        <tr key={row.id}>
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
        </>
    );
};
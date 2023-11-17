import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { DataTableCell } from "./DataTableCell";

const Table = styled.table`
    ${tw`
        w-fit
    `}
`;

export const DataTable = (props) => {
    const [data, setData] = useState([...props.data]);
    const [backupData, setBackupData] = useState([...props.data]);
    const { columns, setDeleteRows, newRow } = props;
    const [columnResizeMode, setColumnResizeMode] = useState('onChange');

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel()
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
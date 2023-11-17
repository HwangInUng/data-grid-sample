import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
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
    const [columnResizeMode, setColumnResizeMode] = useState('onChange');
    const [selectRow, setSelectRow] = useState('');

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
        meta: {
            // 해당 부분이 필요한지 체크 필요
            removeSelectedRows: (selectRows) => {
                const setRemoveRows = (old) => old.filter((row, index) => !selectRows.includes(index));

                setDeleteRows(old => [...old, data.filter((row, index) => selectRows.includes(index))]);
                setData(setRemoveRows);
                setBackupData(setRemoveRows);
            }
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
                        <tr
                            key={row.id}
                            onClick={() => selectRow === row ? setSelectRow('') : setSelectRow(row)}
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
        </>
    );
};
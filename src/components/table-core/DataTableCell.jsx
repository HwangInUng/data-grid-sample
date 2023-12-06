import { styled } from "twin.macro";
import { StatusCell } from "../cells/StatusCell";
import { memo, useCallback, useContext, useEffect, useMemo } from "react";
import { EditCell } from "../cells/EditCell";
import { flexRender } from "@tanstack/react-table";

const TableCell = styled.td`
    padding: 0;
    height: 35px;
    border: 1px solid lightgray;
`;

export const DataTableCell = ({ row, rowIndex, cell, setData }) => {
    const value = row[cell.column.id];
    return (
        <>
            <TableCell style={{ width: cell.column.getSize() }}>
                {
                    cell.column.id === 'status' ?
                        <StatusCell row={row} /> :
                        <EditCell
                            cellValue={value}
                            rowIndex={rowIndex}
                            columnMeta={cell.column.columnDef.meta}
                            columnId={cell.column.id}
                            setData={setData}
                        />
                }
            </TableCell>
        </>
    );
};
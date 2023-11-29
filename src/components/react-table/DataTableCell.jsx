import { flexRender } from "@tanstack/react-table";
import { styled } from "twin.macro";

const TableCell = styled.td`
    padding: 0;
    height: 35px;
    border: 1px solid lightgray;
`;

export const DataTableCell = ({ cell }) => {
    return (
        <>
            <TableCell style={{width: cell.column.getSize()}}>
                {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                )}
            </TableCell>
        </>
    );
};
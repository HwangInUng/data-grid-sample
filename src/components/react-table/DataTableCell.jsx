import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";

const TableCell = styled.td`
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
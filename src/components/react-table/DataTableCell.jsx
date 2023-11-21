import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";

const TableCell = styled.td`
    width: ${props => props.size};
    height: 35px;
    border: 1px solid lightgray;
`;

export const DataTableCell = ({ cell }) => {
    return (
        <>
            <TableCell size={cell.column.getSize()}>
                {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                )}
            </TableCell>
        </>
    );
};
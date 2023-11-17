import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";

const TableCell = styled.td`
    width: ${props => props.size};
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
import { flexRender } from "@tanstack/react-table";
import { styled } from "twin.macro";

const TableCell = styled.td`
    padding: 0;
    height: 35px;
    border: 1px solid lightgray;
`;

export const DataTableCell = (props) => {
    const {
        cellSize,
        cell,
        context
    } = props;

    return (
        <>
            <TableCell style={{ width: cellSize }}>
                {flexRender(cell, context)}
            </TableCell>
        </>
    );
};
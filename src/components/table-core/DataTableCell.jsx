import tw, { styled } from "twin.macro";
import StatusCell from "../cells/StatusCell";
import EditCell from "../cells/EditCell";

const TableCell = styled.td`
    padding: 0;
    height: 35px;
    border: 1px solid lightgray;
`;

const CellWrapper = styled.div`
    ${tw`
        w-full
        h-full
        overflow-hidden
        flex
        items-center
        justify-center
        text-[0.8rem]
    `}
`

function DataTableCell({ row, rowIndex, cell }) {
    const value = row[cell.column.id];
    const isState = cell.column.id === 'status';

    return (
        <>
            <TableCell style={{ width: cell.column.getSize() }}>
                <CellWrapper>
                    {
                        isState ?
                            <StatusCell row={row} /> :
                            <EditCell
                                cellValue={value}
                                rowIndex={rowIndex}
                                columnMeta={cell.column.columnDef.meta}
                                columnId={cell.column.id}
                            />
                    }
                </CellWrapper>
            </TableCell>
        </>
    );
};

export default DataTableCell;
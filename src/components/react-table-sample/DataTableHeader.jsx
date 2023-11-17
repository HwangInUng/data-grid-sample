import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";

const TableHeader = styled.th`
    width: ${props => props.size}px;
`;

const Resizer = styled.div`
    ${tw`
        absolute
        h-full
        w-[10px]
    `}

    cursor: col-resize;
    user-select: none;
    touch-action: none;
    right: 0px;
    top: 0px;

    .isResizing {
        opacity: 1;
    }
`;
export const DataTableHeader = ({ table, header, columnResizeMode }) => {
    return (
        <>
            <TableHeader
                size={header.getSize()}
                colSpan={header.column.columnDef.colSpan}
                onClick={header.column.getToggleSortingHandler()}
            >
                {header.isPlaceholder ?
                    null :
                    flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )
                }
                
                {/* sorting start */}
                {/* sorting end */}

                {/* resizer start */}
                <Resizer
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={header.column.getIsResizing() ? 'isResizing' : ''}
                    style={{
                        transform:
                            columnResizeMode === 'onEnd' &&
                                header.column.getIsResizing() ?
                                `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` :
                                '',
                    }}
                />
                {/* resizer end */}
            </TableHeader>
        </>
    );
};
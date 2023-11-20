import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiSortDown, BiSortUp, BiSortAlt2 } from "react-icons/bi";

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
    // filter
    const onFilterChange = (value) => {
        if (value === 'null') {
            header.column.setFilterValue(null);
        } else {
            header.column.setFilterValue(value);
        }
    };

    return (
        <>
            <TableHeader
                size={header.getSize()}
                colSpan={header.column.columnDef.colSpan}
            >
                {/* sorting start */}
                <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                >
                    {header.isPlaceholder ?
                        null :
                        flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    {
                        {
                            asc: <BiSortUp />,
                            desc: <BiSortDown />
                        }
                        [header.column.getIsSorted()]
                    }
                    {
                        header.column.getCanSort() && !header.column.getIsSorted() ?
                            <BiSortAlt2 /> :
                            null
                    }
                    {/* sorting end */}
                </div>
                {/* filter start */}
                {header.column.getCanFilter() ?
                    (
                        <input
                            onChange={({ currentTarget: { value } }) => onFilterChange(value)}
                            className="text-black"
                        />
                    ) :
                    null
                }
                {/* filter end */}


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
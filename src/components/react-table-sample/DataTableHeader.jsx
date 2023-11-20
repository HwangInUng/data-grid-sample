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
    const { column } = header;
    // filter
    const onFilterChange = (value) => {
        if (value === 'null') {
            column.setFilterValue(null);
        } else {
            column.setFilterValue(value);
        }
    };

    const getSortIcons = () => {
        const sortIcons = {
            asc: <BiSortUp />,
            desc: <BiSortDown />
        };

        return sortIcons[column.getIsSorted()];
    }

    const isSortReady = () => {
        return column.getCanSort() && !column.getIsSorted() ? <BiSortAlt2 /> : null;
    }

    const openFilterArea = () => {
        return column.getCanFilter() ?
            <input
                onChange={({ currentTarget: { value } }) => onFilterChange(value)}
                className="text-black"
            /> :
            null;
    }

    return (
        <>
            <TableHeader
                size={header.getSize()}
                colSpan={column.columnDef.colSpan}
            >
                {/* sorting start */}
                <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={column.getToggleSortingHandler()}
                >
                    {header.isPlaceholder ?
                        null :
                        flexRender(
                            column.columnDef.header,
                            header.getContext()
                        )}
                    {getSortIcons()}
                    {isSortReady()}
                </div>
                {/* sorting end */}
                {/* filter start */}
                {openFilterArea()}
                {/* filter end */}


                {/* resizer start */}
                <Resizer
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={column.getIsResizing() ? 'isResizing' : ''}
                    style={{
                        transform:
                            columnResizeMode === 'onEnd' &&
                                column.getIsResizing() ?
                                `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` :
                                '',
                    }}
                />
                {/* resizer end */}
            </TableHeader>
        </>
    );
};
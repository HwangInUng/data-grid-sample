import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiSortDown, BiSortUp, BiFilter } from "react-icons/bi";
import { DataTableFilter } from "./DataTableFilter";
import { StatusCell } from "./StatusCell";

const TableHeader = styled.th`
    ${tw`
        relative
        font-bold
        p-0
    `}

    width: ${props => props.size}px;
    height: 35px;
    border: 1px solid lightgray;

    .content-box{
        ${tw`
            flex
            items-center
            justify-center
            m-auto
            cursor-pointer
        `}
    }

    & svg{
        ${tw`
            p-0
            m-0
            w-[20px]
            h-[20px]
        `}
    }
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
        return column.getCanSort() && !column.getIsSorted() ? true : false;
    }

    return (
        <>
            <TableHeader
                size={header.getSize()}
                colSpan={column.columnDef.colSpan}
            >
                {/* sorting start */}
                <div
                    className="content-box"
                    onClick={column.getToggleSortingHandler()}
                >
                    {header.isPlaceholder ?
                        null :
                        flexRender(
                            // column이 CheckCell이면 아이콘으로 표시
                            column.columnDef.cell === StatusCell ? column.columnDef.meta.icon : column.columnDef.header,
                            header.getContext()
                        )}
                    {getSortIcons()}
                    {isSortReady() ? <BiFilter /> : null}
                </div>
                {/* sorting end */}
                {/* filter start */}
                {column.getCanFilter() ?
                    <DataTableFilter onChange={onFilterChange} /> : null}
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
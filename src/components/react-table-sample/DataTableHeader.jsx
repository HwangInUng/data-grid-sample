import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiSortDown, BiSortUp, BiFilter } from "react-icons/bi";
import { CheckCell } from "./CheckCell";
import { DataTableFilter } from "./DataTableFilter";

const TableHeader = styled.th`
    ${tw`
        relative
        font-bold
        text-center
        p-0
    `}
    width: ${props => props.size}px;
    height: 35px;
    border: 1px solid lightgray;
    border-top: 0px;

    .content-box{
        ${tw`
            flex
            items-center
            justify-center
            cursor-pointer
        `}
    }

    .header-icon{
        ${tw`
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
            asc: <BiSortUp className="header-icon" />,
            desc: <BiSortDown className="header-icon" />
        };

        return sortIcons[column.getIsSorted()];
    }

    const isSortReady = () => {
        return column.getCanSort() && !column.getIsSorted() ? true : false;
    }

    return (
        <>
            <TableHeader
                size={column.columnDef.cell === CheckCell ? 5 : header.getSize()}
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
                            column.columnDef.cell === CheckCell ? column.columnDef.meta.icon : column.columnDef.header,
                            header.getContext()
                        )}
                    {getSortIcons()}
                    {isSortReady() ? <BiFilter className="header-icon" /> : null}
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
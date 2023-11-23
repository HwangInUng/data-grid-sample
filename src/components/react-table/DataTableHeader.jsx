import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiCaretDown } from "react-icons/bi";
import { DataTableFilter } from "./DataTableFilter";
import { StatusCell } from "./StatusCell";
import { useEffect, useState } from "react";

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
    const [openFilter, setOpenFilter] = useState(false);
    const canFilter = column.getCanFilter();
    const isStatusCell = column.columnDef.cell === StatusCell;

    // filter
    const onFilterChange = (value) => {
        if (value.length === 0) {
            column.setFilterValue(null);
        } else {
            column.setFilterValue(value);
        }
    };


    useEffect(() => {
        if (!canFilter) {
            setOpenFilter(false);
            column.setFilterValue(null);
        };
    }, [canFilter]);

    return (
        <>
            <TableHeader
                size={header.getSize()}
                colSpan={column.columnDef.colSpan}
            >
                <div className="content-box">
                    {header.isPlaceholder ?
                        null :
                        flexRender(
                            // column이 CheckCell이면 아이콘으로 표시
                            isStatusCell ? column.columnDef.meta.icon : column.columnDef.header,
                            header.getContext()
                        )}
                    {canFilter ?
                        <BiCaretDown
                            className="absolute right-0"
                            onClick={() => setOpenFilter(old => !old)}
                        /> : null}
                </div>
                {
                    canFilter && openFilter ?
                        <DataTableFilter
                            onChange={onFilterChange}
                            table={table}
                            column={column}
                            setOpenFilter={setOpenFilter}
                        /> :
                        null
                }

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
            </TableHeader>
        </>
    );
};
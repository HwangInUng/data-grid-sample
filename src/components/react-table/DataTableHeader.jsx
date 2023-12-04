import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiFilter } from "react-icons/bi";
import { DataTableFilter } from "./DataTableFilter";
import { StatusCell } from "./StatusCell";
import { useEffect, useState } from "react";

const TableHeader = styled.th`
    ${tw`
        relative
        font-bold
        p-0
        text-sm
    `}

    width: ${props => props.size}px;
    height: ${props => props.height || 35}px;
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

    .filter-box {
        ${tw`
            absolute
            right-1
            border
            border-slate-400
            rounded-lg
            bg-white
            p-[3px]
            hover:bg-blue-950
            hover:text-white
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
`;

const headerHeight = 35;
export const DataTableHeader = ({ table, header }) => {
    const { column } = header;
    const [openFilter, setOpenFilter] = useState(false);
    const canFilter = column.getCanFilter();
    const isStatusCell = column.columnDef.cell === StatusCell;

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
                height={isStatusCell ? headerHeight * header.rowSpan : null}
                rowSpan={header.rowSpan}
                colSpan={header.colSpan}
            >
                <div className="content-box">
                    {header.isPlaceholder ?
                        null :
                        flexRender(
                            isStatusCell ? column.columnDef.meta.icon : column.columnDef.header,
                            header.getContext()
                        )}
                    {canFilter ?
                        <div className="filter-box">
                            <BiFilter
                                onClick={() => setOpenFilter(old => !old)}
                            />
                        </div> :
                        null
                    }
                </div>
                {
                    canFilter && openFilter ?
                        <DataTableFilter
                            table={table}
                            column={column}
                            setOpenFilter={setOpenFilter}
                        /> :
                        null
                }

                <Resizer
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                />
            </TableHeader>
        </>
    );
};
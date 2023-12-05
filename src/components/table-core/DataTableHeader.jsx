import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiCaretLeft, BiFilter } from "react-icons/bi";
import { DataTableFilter } from "../utils/DataTableFilter";
import { StatusCell } from "../cells/StatusCell";
import { memo, useEffect, useState } from "react";
import { EditCell } from "../cells/EditCell";

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
            relative
            flex
            items-center
            justify-center
            m-auto
            cursor-pointer
        `}
    }

    .required-icon{
        ${tw`
            absolute
            top-[-3px]
            left-[-3px]
            w-[15px]
            h-[15px]
            m-0
            p-0
            rotate-45
            text-red-600
        `}
    }

    .filter-icon{
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
export const DataTableHeader = memo((props) => {
    const {
        header,
        sorting,
        setSorting,
        backupData,
        setColumnFilters
    } = props;
    const { column } = header;
    const [openFilter, setOpenFilter] = useState(false);
    const canFilter = column.getCanFilter();
    const isStatusCell = column.columnDef.cell === StatusCell;
    const isRequired = column.columnDef.cell === EditCell &&
        column.columnDef.meta.required;

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
                {isRequired ? <BiCaretLeft className="required-icon" /> : null}
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
                                className="filter-icon"
                                onClick={() => setOpenFilter(old => !old)}
                            />
                        </div> :
                        null
                    }
                </div>
                {
                    canFilter && openFilter ?
                        <DataTableFilter
                            column={column}
                            setOpenFilter={setOpenFilter}
                            sorting={sorting}
                            setSorting={setSorting}
                            backupData={backupData}
                            setColumnFilters={setColumnFilters}
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
});
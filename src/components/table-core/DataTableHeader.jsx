import { flexRender } from "@tanstack/react-table";
import tw, { styled } from "twin.macro";
import { BiCaretLeft, BiFilter } from "react-icons/bi";
import { DataTableFilter } from "../utils/DataTableFilter";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { StateContext } from "./DataTableWrapper";

const TableHeader = styled.th`
    ${tw`
        relative
        font-bold
        p-0
        text-sm
    `}

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

function DataTableHeader({ header }) {
    const { column } = header;
    const { filterFlag } = useContext(StateContext);
    const [openFilter, setOpenFilter] = useState(false);
    const canFilter = column.getCanFilter();
    const isStatusCell = column.id === 'status';
    const isRequired = column.accessorFn !== undefined &&
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
                style={{ width: header.getSize() }}
                height={isStatusCell ? headerHeight * header.rowSpan : null}
                rowSpan={header.rowSpan}
                colSpan={header.colSpan}
            >
                {isRequired ? <BiCaretLeft className="required-icon" /> : null}
                <div className="content-box">
                    {header.isPlaceholder ?
                        null :
                        flexRender(
                            column.columnDef.header,
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
                            columnId={header.column.id}
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

export default memo(DataTableHeader);
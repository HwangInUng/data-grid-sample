import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTableCell } from "./DataTableCell";
import { ToggleSwitch } from "../common/ToggleSwitch";
import { BiSearchAlt } from "react-icons/bi";

const Table = styled.table`
    ${tw`
        w-full
    `}

    .data-thead{
        ${tw`
            bg-blue-50
        `}
        width: ${props => props.size}px;
    }

    .data-tbody{
        &:hover{
            ${tw`
                bg-slate-100
            `}
        }
    }
`;

export const DataTable = (props) => {
    const { data, setData, columns } = props;
    const [backupData, setBackupData] = useState([...props.data]);
    const [columnResizeMode,] = useState('onChange');
    const [sorting, setSorting] = useState([]);
    const [filterFlag, setFilterFlag] = useState(false);

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        state: {
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableFilters: filterFlag,
    });

    const handleFilterFlag = () => {
        setFilterFlag(old => !old);
    };


    return (
        <>
            <div className="mb-1 w-full flex justify-end">
                <ToggleSwitch title={<BiSearchAlt />} onChange={handleFilterFlag} />
            </div>
            <div className="border-t-[1px] border-t-black">
                <Table onContextMenu={(e) => e.preventDefault()}>
                    <thead size={{ width: table.getCenterTotalSize() }}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="data-thead">
                                {headerGroup.headers.map(header => (
                                    <DataTableHeader
                                        key={header.id}
                                        table={table}
                                        header={header}
                                        columnResizeMode={columnResizeMode}
                                    />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="data-tbody">
                                {row.getVisibleCells().map(cell => (
                                    <DataTableCell
                                        key={cell.id}
                                        cell={cell}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};
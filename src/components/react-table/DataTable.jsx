import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableCell } from "./DataTableCell";
import { StatusCell } from "./StatusCell";

const Table = styled.table`
    width: ${props => props.size};

    .data-thead{
        ${tw`
            bg-blue-50
        `}
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
    const { table, columnResizeMode, addStatusTable } = props;
    const { selectedData, setSelectedData } = table.options.state;
    const isStatus = addStatusTable;

    const tableSize = isStatus ? '40px' : '100%';

    const handleSelectRow = (selectedRow) => {
        if (selectedData.includes(selectedRow)) {
            setSelectedData(old => old.filter(row => row !== selectedRow));
        }

        if (!selectedData.includes(selectedRow)) {
            setSelectedData(old => [...old, selectedRow]);
        }
    };

    return (
        <>
            <Table size={tableSize}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="data-thead">
                            {headerGroup.headers.map(header => (
                                isStatus ?
                                    header.id === 'status' ?
                                        <DataTableHeader
                                            key={header.id}
                                            table={table}
                                            header={header}
                                        /> :
                                        null :
                                    header.id !== 'status' ?
                                        <DataTableHeader
                                            key={header.id}
                                            table={table}
                                            header={header}
                                            columnResizeMode={columnResizeMode}
                                        /> :
                                        null
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className={`data-tbody ${selectedData.includes(row) ? 'bg-slate-100' : null}`}
                            onClick={() => handleSelectRow(row)}
                        >
                            {row.getVisibleCells().map(cell => (
                                isStatus ?
                                    cell.column.columnDef.cell === StatusCell ?
                                        <DataTableCell
                                            key={cell.id}
                                            cell={cell}
                                        /> :
                                        null :
                                    cell.column.columnDef.cell !== StatusCell ?
                                        <DataTableCell
                                            key={cell.id}
                                            cell={cell}
                                        /> :
                                        null
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
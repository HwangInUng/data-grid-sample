import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableCell } from "./DataTableCell";
import { StatusCell } from "./StatusCell";

const Table = styled.table`
    width: ${props => props.size};
    height: fit-content;
    border-collapse: separate;
    border-spacing: 0;

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

    & thead{
        margin: 0;
        position: sticky;
        top: 0;
        z-index: 5;
    }
`;

export const DataTable = (props) => {
    const {
        table,
        columnResizeMode,
        addStatusTable,
        padding,
        virtualRows
    } = props;
    const { selectedData, setSelectedData } = table.options.state;
    const { rows } = table.getRowModel();
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
                            {headerGroup.headers.map(header => {
                                const isStatusColumn = header.id === 'status';

                                return (isStatus && isStatusColumn) || (!isStatus && !isStatusColumn) ?
                                    (
                                        <DataTableHeader
                                            key={header.id}
                                            table={table}
                                            header={header}
                                            columnResizeMode={columnResizeMode}
                                        />
                                    ) : null;
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {padding && padding.top > 0 && (
                        <tr>
                            <td style={{ height: `${padding.top}px` }} />
                        </tr>
                    )}
                    {virtualRows && virtualRows.map(virtualRow => {
                        const row = rows[virtualRow.index];
                        return (
                            <tr
                                key={row.id}
                                className={`data-tbody ${selectedData.includes(row) ? 'bg-slate-100' : null}`
                                }
                                onClick={() => handleSelectRow(row)}
                            >
                                {row.getVisibleCells().map(cell => {
                                    const isStatusCell = cell.column.columnDef.cell === StatusCell;
                                    return (isStatus && isStatusCell) || (!isStatus && !isStatusCell) ?
                                        (
                                            <DataTableCell
                                                key={cell.id}
                                                cell={cell}
                                            />
                                        ) : null;
                                })}
                            </tr>
                        );
                    })}
                    {padding && padding.bottom > 0 && (
                        <tr>
                            <td style={{ height: `${padding.bottom}px` }} />
                        </tr>
                    )}
                </tbody>
            </Table >
        </>
    );
};
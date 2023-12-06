import tw, { styled } from "twin.macro";
import DataTableHeader from "./DataTableHeader";
import { DataTableCell } from "./DataTableCell";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { memo, useContext, useMemo } from "react";
import { TableContext } from "./DataTableWrapper";
import DataTableRow from "./DataTableRow";


const Table = styled.table`
    height: fit-content;
    border-collapse: separate;
    border-spacing: 0;

    .data-thead{
        ${tw`
            bg-blue-50
        `}
    }

    & thead{
        margin: 0;
        position: sticky;
        top: 0;
        z-index: 5;
    }
`;

function DataTable(props) {
    const {
        tableHeaderGroups,
        tableRows,
        addStatusTable,
    } = props;
    const { filterFlag, setData } = useContext(TableContext);
    const isStatus = addStatusTable;

    const getHeaderGroups = useMemo(() => {
        const headerGroups = tableHeaderGroups;
        const headerIds = new Set(); // 동일한 컬럼명 중복 방지
        const resultHeaderGroups = [];

        if (headerGroups.length === 1) return headerGroups;

        for (let i = 0; i < headerGroups.length; i++) {
            const headerGroup = i === 0 ? headerGroups[i].headers : resultHeaderGroups[i];

            // 행 객체 평면화
            const preHeaders = headerGroup.map(header =>
                header.isPlaceholder ?
                    {
                        ...header,
                        isPlaceholder: false,
                        rowSpan: tableHeaderGroups.length - i
                    } :
                    { ...header, rowSpan: 1 }
            );
            resultHeaderGroups.pop(); // 마지막 배열을 꺼냄
            resultHeaderGroups.push(preHeaders); // 수정된 배열을 저장
            preHeaders.forEach(preHeader => headerIds.add(preHeader.column.id)); // 현재까지 보유한 header 누적

            const targetHeaders = headerGroups[i + 1].headers;
            const newHeaders = targetHeaders.filter(header => !headerIds.has(header.column.id));
            resultHeaderGroups.push(newHeaders);

            if (i === headerGroups.length - 2) {
                break;
            }
        }
        return resultHeaderGroups;
    }, [tableHeaderGroups]);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Table style={{ width: isStatus ? '40px' : '100%' }}>
                    <thead>
                        {getHeaderGroups.map((headerGroup, index) => (
                            <tr key={index} className="data-thead">
                                {headerGroup.map(header => {
                                    const isStatusColumn = header.column.id === 'status';

                                    return (isStatus && isStatusColumn) || (!isStatus && !isStatusColumn) ?
                                        (
                                            <DataTableHeader
                                                key={header.id}
                                                header={header}
                                                filterFlag={filterFlag}
                                            />
                                        ) : null;
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {tableRows.map(row => {
                            return (
                                <DataTableRow
                                    key={row.id}
                                    row={row}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        const isStatusCell = cell.column.id === 'status';
                                        return (isStatus && isStatusCell) || (!isStatus && !isStatusCell) ?
                                            (<DataTableCell
                                                key={cell.id}
                                                row={row.original}
                                                rowIndex={row.index}
                                                cell={cell}
                                                setData={setData}
                                            />) : null;
                                    })}
                                </DataTableRow>
                            );
                        })}
                    </tbody>
                </Table >
            </DndProvider>
        </>
    );
};
export default DataTable;
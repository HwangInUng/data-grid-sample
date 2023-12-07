import tw, { styled } from "twin.macro";
import DataTableHeader from "./DataTableHeader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { memo, useMemo } from "react";
import DataTableRow from "./DataTableRow";
import DataTableCell from "./DataTableCell";

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
        memoizedHeaderGroups,
        memoizedRows,
        addStatusTable,
    } = props;

    const getHeaderGroups = useMemo(() => {
        const headerGroups = memoizedHeaderGroups;
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
                        rowSpan: memoizedHeaderGroups.length - i
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
    }, [memoizedHeaderGroups]);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Table style={{ width: addStatusTable ? '40px' : '100%' }}>
                    <thead>
                        {getHeaderGroups.map((headerGroup, index) => (
                            <tr key={index} className="data-thead">
                                {headerGroup.map(header => {
                                    const isStatusColumn = header.column.id === 'status';

                                    return (addStatusTable && isStatusColumn) || (!addStatusTable && !isStatusColumn) ?
                                        (
                                            <DataTableHeader
                                                key={header.id}
                                                header={header}
                                            />
                                        ) : null;
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {memoizedRows.map(row => {
                            return (
                                <DataTableRow
                                    key={row.id}
                                    row={row}
                                    isStatus={addStatusTable}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        const isStatusCell = cell.column.id === 'status';
                                        return (addStatusTable && isStatusCell) || (!addStatusTable && !isStatusCell) ?
                                            (
                                                <DataTableCell
                                                    key={cell.id}
                                                    row={row.original}
                                                    rowIndex={row.index}
                                                    cell={cell}
                                                />
                                            ) : null;
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
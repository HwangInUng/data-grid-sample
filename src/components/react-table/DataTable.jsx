import tw, { styled } from "twin.macro";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableCell } from "./DataTableCell";
import { StatusCell } from "./StatusCell";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DataTableRow } from "./DataTableRow";

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
        addStatusTable,
        padding,
        virtualRows
    } = props;
    const {
        initialData,
        setData,
        selectedData,
        setSelectedData
    } = table.options.state;
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

    const getHeaderGroups = () => {
        const headerGroups = table.getHeaderGroups();
        const headerIds = new Set(); // 동일한 컬럼명 중복 방지
        const resultHeaderGroups = [];

        for (let i = 0; i < headerGroups.length; i++) {
            const headerGroup = i === 0 ? headerGroups[i].headers : resultHeaderGroups[i];

            // 행 객체 평면화
            const preHeaders = headerGroup.map(header =>
                header.isPlaceholder ?
                    {
                        ...header,
                        isPlaceholder: false,
                        rowSpan: table.getHeaderGroups().length - i
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
    };

    // 배열 요소 재위치
    const reorderRow = (draggedRowIndex, targetRowIndex) => {
        // 드래그 된 배열의 요소를 대상 로우 인덱스에 추가
        // 외부 splice의 0은 요소 대상제거 x
        // 내부 splice는 드래그 된 대상 요소 1개만 제거
        initialData.splice(targetRowIndex, 0, initialData.splice(draggedRowIndex, 1)[0])
        setData([...initialData]);
    };
    
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Table size={tableSize}>
                    <thead>
                        {getHeaderGroups().map((headerGroup, index) => (
                            <tr key={index} className="data-thead">
                                {headerGroup.map(header => {
                                    const isStatusColumn = header.column.id === 'status';

                                    return (isStatus && isStatusColumn) || (!isStatus && !isStatusColumn) ?
                                        (
                                            <DataTableHeader
                                                key={header.id}
                                                table={table}
                                                header={header}
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
                                <DataTableRow
                                    key={row.id}
                                    row={row}
                                    selectedData={selectedData}
                                    onClick={handleSelectRow}
                                    reorderRow={reorderRow}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        const isStatusCell = cell.column.columnDef.cell === StatusCell;
                                        return (isStatus && isStatusCell) || (!isStatus && !isStatusCell) ?
                                            (<DataTableCell key={cell.id} cell={cell} />) : null;
                                    })}
                                </DataTableRow>
                            );
                        })}
                        {padding && padding.bottom > 0 && (
                            <tr>
                                <td style={{ height: `${padding.bottom}px` }} />
                            </tr>
                        )}
                    </tbody>
                </Table >
            </DndProvider>
        </>
    );
};
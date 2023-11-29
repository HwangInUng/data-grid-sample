import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ToggleSwitch } from "../common/ToggleSwitch";
import { BiSearchAlt } from "react-icons/bi";
import { DataTable } from "./DataTable";
import { RefreshIcon } from "../common/RefreshIcon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef } from "react";

const fetchSize = 25;

export const DataTableWrapper = (props) => {
    const {
        initialData,
        resetData,
        columns,
        backupData,
        addStatusTable = false,
        enableColumnResizing = true
    } = props;
    const [columnResizeMode,] = useState('onChange');
    const [sorting, setSorting] = useState([]);
    const [filterFlag, setFilterFlag] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);

    // initialData fetch 함수
    const fetchData = (start, size) => {
        const fetchedData = [...initialData];

        return {
            data: fetchedData.slice(start, start + size),
            meta: {
                totalRowCount: fetchedData.length
            }
        };
    }

    // 무한 스크롤 시작
    const tableContainerRef = useRef(null);
    const { data, fetchNextPage, isFetching } =
        // v5 문법
        useInfiniteQuery({
            queryKey: ['sample-data'],
            queryFn: ({ pageParam }) => fetchData(pageParam * fetchSize, fetchSize),
            initialPageParam: 0,
            getNextPageParam: (_lastPage, pages) => pages.length,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        });
    // data를 평면화하여 저장
    const flatData = useMemo(
        () => data?.pages?.flatMap(page => page.data) ?? [],
        [data]
    );
    // DBRow에 대한 총 카운트 반환
    const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
    const totalFatched = flatData.length;

    // 스크롤 하단 마운트 시 호출
    const fetchMoreOnBottomReached = useCallback(
        // 이벤트 대상 컨테이너 요소
        (containerRefElement) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                // 테이블 하단 지정된 px 이내로 스크롤 할 경우 데이터 패치
                if (
                    scrollHeight - scrollTop - clientHeight < 300 &&
                    !isFetching &&
                    totalFatched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFatched, totalDBRowCount]
    );

    // 스크롤이 하단 마운트 시 발동
    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const table = useReactTable({
        data: initialData,
        columns,
        columnResizeMode,
        state: {
            initialData,
            backupData,
            selectedData,
            setSelectedData,
            sorting,
            setSorting,
            columnFilters,
            setColumnFilters
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        enableColumnResizing: enableColumnResizing,
        enableFilters: filterFlag,
    });

    const { rows } = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
        getScrollElement: () => tableContainerRef.current,
        count: rows.length,
        estimateSize: () => fetchSize,
        overscan: 10,
    });
    const { getVirtualItems: virtualRows, getTotalSize: totalSize } = rowVirtualizer;

    const paddingTop = virtualRows().length > 0 ? virtualRows()[0].start || 0 : 0;
    const paddingBottom = virtualRows().length > 0 ?
        totalSize() - virtualRows()[virtualRows().length - 1].end || 0 : 0;
    const padding = { top: paddingTop, bottom: paddingBottom };
    // 무한 스크롤 끝

    const handleFilterFlag = () => {
        setFilterFlag(old => !old);
    };

    const resetTableData = () => {
        table.resetColumnFilters();
        setFilterFlag(false);
        setSelectedData([]);
        resetData();
    }

    return (
        <div>
            <div className="mb-1 w-full flex justify-end gap-x-3">
                <ToggleSwitch
                    title={<BiSearchAlt />}
                    flag={filterFlag}
                    onChange={handleFilterFlag}
                />
                <RefreshIcon onClick={resetTableData} />
            </div>
            <div
                className="w-full flex overflow-y-scroll h-[500px]"
                ref={tableContainerRef}
                onScroll={e => fetchMoreOnBottomReached(e.target)}
            >
                {
                    // status 테이블 포함 시 고정된 열 크기의 테이블 생성
                    addStatusTable ?
                        <DataTable
                            table={table}
                            padding={padding}
                            virtualRows={virtualRows()}
                            addStatusTable
                        /> :
                        null
                }
                <DataTable
                    table={table}
                    columnResizeMode={columnResizeMode}
                    padding={padding}
                    virtualRows={virtualRows()}
                />
            </div>
        </div>
    );
}
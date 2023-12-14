import { useInfiniteQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useCallback, useMemo } from 'react';

const fetchSize = 50;

export const useInfiniteScroll = (fetchData, timer) => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['table-data'],
    queryFn: ({ pageParam }) => fetchData(pageParam * fetchSize, fetchSize),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => pages.length,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFatched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    // 이벤트 대상 컨테이너 요소
    throttle(containerRefElement => {
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
    }, timer),
    [fetchNextPage, isFetching, totalFatched, totalDBRowCount]
  );

  return [flatData, fetchMoreOnBottomReached];
};

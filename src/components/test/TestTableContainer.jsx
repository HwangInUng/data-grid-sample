import { useCallback, useEffect, useMemo, useState } from 'react';
import { makeData } from 'utils/makData';
import { createColumnHelper } from '@tanstack/react-table';
import {
  StatusIcon,
  DisplayButton,
  DisplayCheckInput,
  Table,
  TableCell,
  StatusCell,
  DataTableContainer,
  InfoBox,
} from 'components/datatable';
import CommonButton from '../CommonButton';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

const newRow = {
  name: '',
  age: '',
  gender: '',
  createdAt: '',
  rowType: 'add',
};

const defaultData = makeData([500]);
const fetchData = (start, size) => {
  const fetchedData = defaultData;

  return {
    data: fetchedData.slice(start, start + size),
    meta: {
      totalRowCount: fetchedData.length,
    },
  };
};

const columnHelper = createColumnHelper();
const throttleTimer = 200; // 단위 ms

function TestTableContainer() {
  const [flatData, fetchMoreOnBottomReached] = useInfiniteScroll(
    fetchData,
    throttleTimer
  );
  const [initialData, setInitialData] = useState();
  const [selectedData, setSelectedData] = useState('');
  const defaultColumns = [
    columnHelper.display({
      id: 'status',
      size: 20,
      cell: StatusCell,
      header: <StatusIcon />,
    }),
    columnHelper.accessor('name', {
      header: '이름',
      cell: TableCell,
      size: 300,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'text',
        required: true,
        readOnly: true, // 읽기전용(default: false)
      },
    }),
    columnHelper.accessor('age', {
      header: '나이',
      cell: TableCell,
      size: 40,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'text',
        required: true,
        pattern: 'number',
      },
    }),
    columnHelper.accessor('gender', {
      header: '성별',
      cell: TableCell,
      size: 40,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'select',
        options: ['남자', '여자'], // select 옵션
      },
    }),
    columnHelper.accessor('createdAt', {
      header: '생일',
      cell: TableCell,
      size: 100,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'date',
      },
    }),
    columnHelper.display({
      id: 'auth', // row.id로 해당 키의 값을 획득
      header: '체크',
      cell: DisplayCheckInput,
      size: 30,
    }),
    columnHelper.display({
      id: 'button',
      header: '버튼',
      size: 40,
      cell: DisplayButton,
      meta: {
        text: '복사',
        onClick: useCallback(
          targetRow => handleDuplicate(targetRow),
          []
        ),
      },
    }),
  ];
  const columns = useMemo(() => defaultColumns, []);

  // useCallBack으로 감싸주지 않을 경우 이벤트와 연관된 버튼도 리렌더링 발생
  // 또는, 의존성 배열에 data를 추가할 경우에도 동일함
  const handleAddData = () => {
    setInitialData(old => [newRow, ...old]);
  };

  // rowType이 select된 대상을 delete로 변경
  // data 및 selectedData 변경 시 값이 비교되어야함.
  // 이전과 데이터가 동일 할 수 없기 때문에 useCallback() 미사용
  const handleRemoveData = () => {
    if (selectedData === '') {
      alert('삭제할 대상이 없습니다.');
      return;
    }
    const newRow = initialData.map((row, index) => {
      if (selectedData === index) {
        return { ...row, rowType: 'delete' };
      }
      return row;
    });
    setInitialData(newRow);
    setSelectedData('');
  };

  const handleSaveData = () => {
    // normal이 아닌 객체가 없다면 save를 수행하지 않아야함
    const isEmpty = initialData.filter(
      row => row.rowType !== 'normal'
    ).length;
    if (isEmpty === 0) {
      alert('저장할 내용이 없습니다.');
      return;
    }

    const newRow = initialData
      .filter(row => row.rowType !== 'delete')
      .map(row => ({ ...row, rowType: 'normal' }));
    setInitialData(newRow);
    setSelectedData('');
  };

  const handleSelectedData = useCallback(
    (e, rowIndex) => {
      if (e.button !== 0) return;
      if (selectedData !== rowIndex) {
        setSelectedData(rowIndex);
      } else {
        setSelectedData('');
      }
    },
    [selectedData]
  );

  function handleDuplicate(targetRow) {
    const duplicateRow = { ...targetRow, rowType: 'add' };
    setInitialData(old => [duplicateRow, ...old]);
  }

  useEffect(() => {
    if (flatData.length > 0) {
      setInitialData(flatData);
    }
  }, [flatData]);

  return (
    <DataTableContainer>
      <InfoBox
        title='샘플'
        count={flatData.length}
      >
        <CommonButton
          title='추가'
          onClick={handleAddData}
        />
        <CommonButton
          title='삭제'
          onClick={handleRemoveData}
        />
        <CommonButton
          title='저장'
          onClick={handleSaveData}
        />
      </InfoBox>
      {initialData && (
        <Table
          initialData={initialData}
          setData={setInitialData}
          columns={columns}
          selectedData={selectedData}
          setSelectedData={handleSelectedData}
          fetchScroll={fetchMoreOnBottomReached}
          draggable={true}
        />
      )}
    </DataTableContainer>
  );
}

export default TestTableContainer;

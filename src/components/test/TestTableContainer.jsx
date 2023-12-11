import { useCallback, useMemo, useState } from "react";
import { makeData } from "../../js/makData";
import { createColumnHelper } from "@tanstack/react-table";
import { StatusIcon } from "../utils/StatusIcon";
import DisplayButton from "../cells/DisplayButton";
import DisplayCheckInput from "../cells/DisplayCheckInput";
import CommonButton from "../common/CommonButton";
import ButtonContainer from "../utils/ButtonContainer";
import TestTable from "./TestTable";
import TestTableCell from "./TestTableCell";
import TestStatusCell from "./TestStatusCell";

const newRow = {
  name: '',
  age: '',
  gender: '',
  createdAt: '',
  rowType: 'add'
}

const columnHelper = createColumnHelper();

function TestTableContainer() {
  const [data, setData] = useState(() => makeData([100]));
  const [selectedData, setSelectedData] = useState('');

  const defaultColumns = [
    columnHelper.display({
      id: 'status',
      size: 45,
      cell: TestStatusCell,
      header: <StatusIcon />,
    }),
    columnHelper.accessor('name', {
      header: '이름',
      cell: TestTableCell,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'text',
        required: true,
        readOnly: true, // 읽기전용(default: false)
      }
    }),
    columnHelper.accessor('age', {
      header: '나이',
      cell: TestTableCell,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'text',
        required: true,
        justify: 'right', // 가로 방향
      }
    }),
    columnHelper.accessor('gender', {
      header: '성별',
      cell: TestTableCell,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'select',
        options: ['남자', '여자'], // select 옵션
      }
    }),
    columnHelper.accessor('createdAt', {
      header: '생일',
      cell: TestTableCell,
      filterFn: 'arrIncludesSome',
      meta: {
        type: 'date',
      }
    }),
    columnHelper.display({
      id: 'auth', // row.id로 해당 키의 값을 획득
      header: '체크',
      cell: DisplayCheckInput,
      meta: {
        readOnly: true,
      }
    }),
    columnHelper.display({
      id: 'button',
      header: '버튼',
      cell: DisplayButton,
      meta: {
        text: '복사',
        onClick: useCallback((targetRow) => handleDuplicate(targetRow), [])
      }
    }),
  ];
  const columns = useMemo(() => defaultColumns, []);

  // useCallBack으로 감싸주지 않을 경우 이벤트와 연관된 버튼도 리렌더링 발생
  // 또는, 의존성 배열에 data를 추가할 경우에도 동일함
  const handleAddData = () => {
    setData(old => [...old, newRow]);
  };

  // rowType이 select된 대상을 delete로 변경
  // data 및 selectedData 변경 시 값이 비교되어야함.
  // 이전과 데이터가 동일 할 수 없기 때문에 useCallback() 미사용
  const handleRemoveData = () => {
    if (selectedData === '') {
      alert('삭제할 대상이 없습니다.');
      return;
    };
    const newRow = data.map((row, index) => {
      if (selectedData === index) {
        return { ...row, rowType: 'delete' };
      }
      return row;
    });
    setData(newRow);
    setSelectedData('');
  };

  const handleSaveData = () => {
    // normal이 아닌 객체가 없다면 save를 수행하지 않아야함
    const isEmpty = data.filter(row => row.rowType !== 'normal').length;
    if (isEmpty === 0) {
      alert('저장할 내용이 없습니다.');
      return;
    }

    const newRow = data.filter(row => row.rowType !== 'delete')
      .map(row => ({ ...row, rowType: 'normal' }));
    setData(newRow);
    setSelectedData('');
  };

  const handleSelectedData = (e, rowIndex) => {
    if (e.button !== 0) return;
    if (selectedData === rowIndex) {
      setSelectedData('');
    } else {
      setSelectedData(rowIndex);
    }
  };

  // column을 정의하는 경우 hoisting을 통한 정보 전달
  // column에서 useCallback을 사용하여 메모이제이션
  function handleDuplicate(targetRow) {
    const duplicateRow = { ...targetRow, rowType: 'add' };
    setData(old => [...old, duplicateRow]);
  };

  return (
    <div className="w-full h-[600px] overflow-y-scroll">
      <ButtonContainer title="샘플" count={data.length}>
        <CommonButton title="추가" onClick={handleAddData} />
        <CommonButton title="삭제" onClick={handleRemoveData} />
        <CommonButton title="저장" onClick={handleSaveData} />
      </ButtonContainer>
      <TestTable
        initialData={data}
        setData={setData}
        columns={columns}
        selectedData={selectedData}
        setSelectedData={handleSelectedData}
      />
    </div>
  );
};

export default TestTableContainer;
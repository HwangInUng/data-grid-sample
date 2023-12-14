import { memo } from 'react';
import { DataTableButton } from '../styles/TableStyles';

// isEqual 함수를 통해 row의 original 정보가 동일하지
// 않은 경우에만 리런더링을 수행
const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
};

function DisplayButton({ row, column }) {
  const { text, onClick } = column.columnDef.meta;

  const handleOnClick = e => {
    e.stopPropagation();
    onClick(row.original);
  };

  return (
    <DataTableButton onClick={handleOnClick}>{text}</DataTableButton>
  );
}

export default memo(DisplayButton, isEqual);

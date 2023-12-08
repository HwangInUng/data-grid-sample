import { memo, useEffect } from 'react';
import tw, { styled } from 'twin.macro';

const Button = styled.div`
  ${tw`
    rounded-lg
    w-full
    border
    border-slate-300
    bg-white
    text-center
    text-sm
    p-0.5
    cursor-pointer
    transform
    duration-100
    whitespace-nowrap

    hover:border-slate-500
    hover:bg-blue-950
    hover:text-white
  `}
`;

// isEqual 함수를 통해 row의 original 정보가 동일하지
// 않은 경우에만 리런더링을 수행
const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
};

function DisplayButton({ row, column, table }) {
  const { text, onClick } = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const handleOnClick = (e) => {
    e.stopPropagation();
    onClick(row.original);
  };

  // useEffect(() => console.log(row))
  return <Button
    onClick={handleOnClick}
  >
    {text}
  </Button>
};

export default memo(DisplayButton, isEqual);
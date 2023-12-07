import { memo, useCallback } from 'react';
import tw, { styled } from 'twin.macro';

const DateInput = styled.input`
  ${tw`
    w-fit
    py-1
    rounded-lg
    border
    border-slate-400
    outline-none
  `}
`;

export const EditDateInput = ({ value, handleValue, editValue }) => {
  const handleOnchange = useCallback((e) => {
    const changeValue = e.target.value;
    handleValue(e);
    editValue(changeValue);
  }, []);
  return <DateInput
    type='date'
    value={value}
    onChange={handleOnchange}
  />
};
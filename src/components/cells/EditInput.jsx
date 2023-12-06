import { memo } from 'react';
import tw, { styled } from 'twin.macro';

const Input = styled.input`
  ${tw`
    w-full
    h-full
    rounded-lg
    px-2
    border
    outline-none
    border-slate-400
  `}
`

export const EditInput = memo(({ value, onChange, onBlur }) => {
  const onFocus = (e) => {
    e.target.select();
  };

  return <Input
    type='text'
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    autoFocus
  />;
});
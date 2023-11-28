import { useEffect, useRef } from 'react';
import tw, { styled } from 'twin.macro';

const Input = styled.input`
  &.text{
    ${tw`
    w-full
    rounded-lg
    px-1
    `}
  }
  
  &.checkbox{
    ${tw`
      w-[20px]
      h-[20px]
      rounded-lg
      `}
  }
  
  ${tw`
    border
    outline-none
    border-slate-400
  `}
`

export const EditInput = ({ type, value, onChange, onBlur }) => {
  return <Input
    type={type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    autoFocus={type === 'text' ? true : false}
    className={type}
  />;
};
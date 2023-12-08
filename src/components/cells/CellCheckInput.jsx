import tw, { styled } from 'twin.macro';

const CheckInput = styled.input`
  ${tw`
    w-[15px]
    h-[15px]
    rounded-lg
    border
    outline-none
    border-slate-400
    m-auto
  `}
`;

export const CellCheckInput = ({ value, readOnly, onChange }) => {
  return <CheckInput
    type='checkbox'
    checked={value === 'Y' ? true : false}
    readOnly={readOnly}
    onChange={readOnly ? null : onChange}
    onMouseDown={e => e.stopPropagation()}
  />;
};
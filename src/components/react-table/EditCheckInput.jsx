import tw, { styled } from 'twin.macro';

const CheckInput = styled.input`
  ${tw`
    w-[15px]
    h-[15px]
    rounded-lg
    border
    outline-none
    border-slate-400
  `}
`;

export const EditCheckInput = ({ value, onChange, readOnly }) => {
  const handleCheck = (e) => {
    onChange(e.target.checked ? 'Y' : 'N');
  }
  return <CheckInput
    type='checkbox'
    checked={value === 'Y' ? true : false}
    readOnly={readOnly}
    onChange={readOnly ? null : handleCheck}
  />;
};
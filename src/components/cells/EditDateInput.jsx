import { memo } from 'react';
import tw, {styled} from 'twin.macro';

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

export const EditDateInput = memo(({value, onChange}) => {
  return <DateInput
    type='date'
    value={value}
    onChange={onChange}
  />
});
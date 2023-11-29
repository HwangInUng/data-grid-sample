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

export const EditDateInput = ({value, onChange}) => {
  const handleOnChage = (e) => {
    const newDate = e.target.value
    onChange(newDate);
  }
  return <DateInput
    type='date'
    value={value}
    onChange={handleOnChage}
  />
}
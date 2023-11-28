import tw, { styled } from 'twin.macro';

const Select = styled.select`
  ${tw`
    border
    rounded-lg
    w-fit
  `}
`;

export const EditSelect = ({ options, value, onChange }) => {
  return <Select value={value} onChange={onChange}>
    {options && options.map(option => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </Select>;
};
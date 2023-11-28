import tw, { styled } from 'twin.macro';

const Button = styled.div`
  ${tw`
    rounded-lg
    w-full
    border
    border-slate-300
    bg-white
    text-center
    p-0.5
    cursor-pointer
    transform
    duration-100

    hover:border-slate-500
    hover:bg-blue-950
    hover:text-white
  `}
`;

export const DisplayButton = ({ row, column }) => {
  const { text } = column.columnDef.meta;
  return <Button>{text}</Button>
};
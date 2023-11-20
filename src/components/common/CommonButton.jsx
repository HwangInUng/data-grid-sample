import tw, { styled } from 'twin.macro';

const Button = styled.button`
    ${tw`
        rounded-lg
        py-[3px]
        px-[10px]
        mr-[5px]
        text-white
        bg-blue-950
    `}
    
    &:hover{
        transition: transform 0.2s linear;
        transform: scale(1.05);
        background-color: darkblue;
    }
`;

export const CommonButton = ({ title, onClick }) => {
    return <Button onClick={onClick}>{title}</Button>;
}
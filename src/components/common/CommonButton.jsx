import tw, { styled } from 'twin.macro';

const Button = styled.button`
    ${tw`
        rounded-lg
        py-[3px]
        px-[10px]
        mr-[5px]
        text-white
        text-sm
    `}
    background-color: ${props => props.color || '#040e68'};
    opacity: 0.85;
    &:hover{
        transition: transform 0.2s linear;
        transform: scale(1.05);
        background-color: ${props => props.color || '#040e68'};
        opacity: 1;
    }
`;

export const CommonButton = ({ title, onClick, color }) => {
    return <Button
        onClick={onClick}
        color={color}>
        {title}
    </Button>;
}
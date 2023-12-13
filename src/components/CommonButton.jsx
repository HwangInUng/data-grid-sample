import { memo } from 'react';
import tw, { styled } from 'twin.macro';

const Button = styled.button`
    ${tw`
        rounded-lg
        py-[0.2rem]
        px-[0.5rem]
        ml-[5px]
        text-white
        text-[0.8rem]
    `}
    background-color: ${props => props.color || '#040e68'};
    opacity: 0.85;
    &:hover{
        transition: transform 150ms linear;
        transform: scale(1.01);
        background-color: ${props => props.color || '#040e68'};
        opacity: 1;
    }
`;

function CommonButton({ title, onClick, color }) {
    return <Button
        onClick={onClick}
        color={color}>
        {title}
    </Button>;
};

export default memo(CommonButton);
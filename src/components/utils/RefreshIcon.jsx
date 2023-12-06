import { memo } from 'react';
import { BiRefresh } from 'react-icons/bi';
import tw, { styled } from 'twin.macro';

const RefreshWrapper = styled.div`
    ${tw`
        rounded-[50%]
        bg-gray-500
        p-[2px]
        text-white
        transform duration-150
    `}

    &:hover{
        ${tw`
            bg-blue-950
        `}
        transform: scale(1.05);
    }

    .refresh-icon {
        width: 1.2em;
        height: 1.2em;
        cursor: pointer;
    }
`;

export const RefreshIcon = memo(({ onClick }) => {
    return (
        <RefreshWrapper>
            <BiRefresh className="refresh-icon" onClick={onClick} />
        </RefreshWrapper>
    );
});
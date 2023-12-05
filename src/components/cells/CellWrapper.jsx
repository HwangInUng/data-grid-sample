import tw, { styled } from 'twin.macro';

const Wrapper = styled.div`
    ${tw`
        h-full
        overflow-hidden
        flex
        items-center
        text-[0.8rem]
    `}

    justify-content: ${props => props.justify || 'center'};
`;

export const CellWrapper = ({ children, justify, onClick }) => {
    return <Wrapper
        onClick={onClick ?? null}
        justify={justify}
    >
        {children}
    </Wrapper>
}
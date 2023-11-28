import tw, {styled} from 'twin.macro';

const Wrapper = styled.div`
    ${tw`
        h-full
        overflow-hidden
        flex
        items-center
        text-[0.8rem]
    `}

    justify-content: ${props => props.justify || 'center'};

    & span{
        ${tw`
            px-1
        `}
    }
`;

export const CellWrapper = ({children, justify}) => {
  return <Wrapper justify={justify}>{children}</Wrapper>
}
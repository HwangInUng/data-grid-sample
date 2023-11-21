import tw, { styled } from "twin.macro";


const FilterWrapper = styled.div`
    ${tw`
        w-[30%]
        flex
        justify-center
        items-center
        py-1
        m-auto
    `}
`;

const FilterInput = styled.input`
    ${tw`
        appearance-none
        border
        border-gray-400
        w-full
        outline-none
        rounded-lg
        px-2

        text-sm
    `}

    &:focus-visible{
        border: 1px solid gray;
    }
`;


// 컬럼의 유형에 맞는 필터 태그 적용 구현 필요
export const DataTableFilter = ({ onChange }) => {
    return (
        <FilterWrapper>
            <FilterInput type="text" onChange={(e) => onChange(e.target.value)} />
        </FilterWrapper>
    );
}
import { BiFilter, BiSortDown, BiSortUp } from "react-icons/bi";
import tw, { styled } from "twin.macro";
import { CommonButton } from "../common/CommonButton"


const FilterWrapper = styled.div`
    ${tw`
        absolute
        w-[150px]
        bg-white
        border
        border-slate-400
        rounded-xl
        py-2
        px-2
        text-sm
    `}
    /* right: ${props => props.left}px; */
    right: 0px;
    top: ${props => props.top}px;
    z-index: 999;
`;

const FilterInput = styled.input`
    ${tw`
        appearance-none
        border
        border-gray-400
        w-full
        h-[30px]
        outline-none
        rounded-lg
        px-2
        font-normal
        text-sm
    `}

    &:focus-visible{
        border: 1px solid gray;
    }
`;

const SortBox = styled.div`
    ${tw`
        flex
        items-center
        mb-1
        hover:bg-slate-300
        rounded-md
        p-1
        cursor-pointer
    `}
`;

const DataListBox = styled.div`
    ${tw`
        p-1
        h-[150px]
        overflow-scroll
        text-sm
    `}

    & div{
        ${tw`
            flex
            items-center
        `}
    }

    .list-checkbox {
        ${tw`
            mr-2
            w-[15px]
            h-[15px]  
        `}
    }
`;

// 컬럼의 유형에 맞는 필터 태그 적용 구현 필요
export const DataTableFilter = ({ onChange, table, column, setOpenFilter }) => {
    const sortData = [
        { icon: <BiSortUp />, title: 'A to Z', type: 'asc' },
        { icon: <BiSortDown />, title: 'Z to A', type: 'desc' },
        { icon: <BiFilter />, title: 'Normal', type: 'normal' },
    ];
    const { sorting, setSorting } = table.options.state;
    const { rows } = table.getRowModel();
    const dataList = [...new Set(
        rows.map(row => row.original[column.id])
    )];

    const handleSorting = (sortingType) => {
        const sortedColumn = sorting.map(col => col.id);
        if (sortedColumn.length === 0 || !sortedColumn.includes(column.id)) {
            setSorting(old => [
                ...old,
                { id: column.id, desc: sortingType }
            ]);
            return;
        }

        if (sortedColumn.includes(column.id)) {
            setSorting(old => old.map(col => (
                col.id === column.id ? { id: column.id, desc: sortingType } : col
            )));
        }
    };

    const selectAllData = () => {
        const checkBoxList = Array.from(document.getElementsByClassName('list-checkbox'));
        checkBoxList.forEach((checkBox, index) => index > 0 ? checkBox.checked = checkBoxList[0].checked : null);
        onChange(null);
    }
    return (
        <FilterWrapper>
            {sortData && sortData.map((sort, index) => (
                <SortBox
                    key={index}
                    onClick={
                        sort.type === 'desc' ?
                            () => handleSorting(true) :
                            sort.type === 'asc' ?
                                () => handleSorting(false) :
                                () => setSorting([])
                    }
                >
                    {sort.icon}
                    <span>{sort.title}</span>
                </SortBox>
            ))}
            <div className="py-1">
                <FilterInput
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
            <DataListBox>
                <div>
                    <input type="checkbox" className="list-checkbox" onChange={selectAllData}/>
                    <span>Select All</span>
                </div>
                {dataList && dataList.map(data => (
                    <div
                        key={data}
                    >
                        <input type="checkbox" className="list-checkbox" />
                        <span>{data}</span>
                    </div>
                ))}
            </DataListBox>
            <div className="w-full">
                <CommonButton
                    title="X"
                    onClick={() => setOpenFilter(false)}
                    color="darkred"
                />
            </div>
        </FilterWrapper>
    );
}
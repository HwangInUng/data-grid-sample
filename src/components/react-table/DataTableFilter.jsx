import { BiAlignJustify, BiSortDown, BiSortUp } from "react-icons/bi";
import tw, { styled } from "twin.macro";
import { CommonButton } from "../common/CommonButton"
import { useEffect, useState } from "react";


const FilterWrapper = styled.div`
    ${tw`
        absolute
        w-[200px]
        bg-white
        border
        border-slate-400
        rounded-xl
        py-2
        px-2
        text-sm
    `}
    right: 0px;
    top: ${props => props.top}px;
    z-index: 50;
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
export const DataTableFilter = ({ table, column, setOpenFilter }) => {
    const sortData = [
        { icon: <BiSortUp />, title: 'A to Z', type: 'asc' },
        { icon: <BiSortDown />, title: 'Z to A', type: 'desc' },
        { icon: <BiAlignJustify />, title: 'Normal', type: 'normal' },
    ];
    const { sorting, setSorting, backupData, setColumnFilters } = table.options.state;
    const dataCheckList = [...new Set(backupData.map(data => data[column.id]))];
    const [checkList, setCheckList] = useState([]);
    const [allSelected, setAllSelected] = useState(true);
    const [inputValue, setInputValue] = useState('');

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

    const getBackUpCheckList = () => {
        return [...new Set(
            backupData.map(data => data[column.id])
                .filter(data => data.includes(inputValue))
                .sort()
        )];
    }

    // selectAll check box 컨트롤
    const selectAllData = () => {
        setAllSelected(old => !old);
        checkedAll(allSelected);

        const filterValueList = inputValue.length > 0 ? getBackUpCheckList() : dataCheckList;

        if (allSelected) {
            setColumnFilters(old => addColumnFilter(old, filterValueList));
        } else {
            setColumnFilters(old => old.filter(filter => filter.id !== column.id));
            setInputValue('');
        }
    };

    const checkedAll = (check) => {
        const checkBoxList = Array.from(document.getElementsByName(column.id));
        checkBoxList.forEach(checkBox => checkBox.checked = check);
    };

    // checked 상태일 경우 필터 값 추가
    const addColumnFilter = (columnFilters, filterValue) => {
        const count = columnFilters.filter(filter => filter.id === column.id).length;

        return count === 0 ?
            [
                ...columnFilters, { id: column.id, value: Array.isArray(filterValue) ? filterValue : [filterValue] }
            ] :
            columnFilters.map(filter => (
                filter.id === column.id ?
                    { ...filter, value: Array.isArray(filterValue) ? filterValue : [...filter.value, filterValue] } :
                    { ...filter, value: filter.value }));
    };

    // unchecked 상태일 경우 필터 값 제거
    const deleteColumnFilter = (columnFilters, filterValue) => {
        return columnFilters.map(filter => (
            filter.id === column.id ?
                { ...filter, value: filter.value.filter(value => value !== filterValue) } :
                { ...filter, value: filter.value }
        ));
    };

    // checkbox 클릭 시 필터 값 변경
    const changeFilterValue = (e) => {
        const value = e.target.value;
        const isCheck = e.target.checked;

        if (isCheck) {
            setColumnFilters(old => addColumnFilter(old, value));
        } else {
            setColumnFilters(old => deleteColumnFilter(old, value));
        }

        autoRemoveColumnFilter();
    };

    // 체크박스 갯수에 따라 해당 컬럼 필터 제거
    const autoRemoveColumnFilter = () => {
        const checkList = Array.from(document.getElementsByName(column.id));
        const count = checkList.filter(check => check.checked === true).length;

        if (count === 0) {
            setColumnFilters(old => old.filter(filter => filter.id !== column.id));
        }
    }

    const handleInputValue = (value) => {
        setInputValue(value);
    }

    // Input에 따라 checkList 갱신
    useEffect(() => {
        setCheckList(getBackUpCheckList());
    }, [inputValue]);

    useEffect(() => {
        setCheckList(dataCheckList.sort());
    }, []);

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
                    value={inputValue}
                    onChange={(e) => handleInputValue(e.target.value)}
                />
            </div>
            <DataListBox>
                <div>
                    <input
                        type="checkbox"
                        className="list-checkbox"
                        onChange={selectAllData}
                    />
                    <span>{allSelected ? '전체선택' : '전체해제'}</span>
                </div>
                {checkList && checkList.map((data, index) => (
                    <div key={index} className="w-fit">
                        <input
                            type="checkbox"
                            name={column.id}
                            className="list-checkbox"
                            value={data}
                            onChange={changeFilterValue}
                        />
                        <span className="whitespace-nowrap">{data}</span>
                    </div>
                ))}
            </DataListBox>
            <div className="w-full mt-3">
                <CommonButton
                    title="X"
                    onClick={() => setOpenFilter(false)}
                    color="darkred"
                />
            </div>
        </FilterWrapper>
    );
}
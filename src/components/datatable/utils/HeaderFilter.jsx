import tw, { styled } from 'twin.macro';
import { useEffect, useState } from "react";
import {
  BiAlignJustify,
  BiSortDown,
  BiSortUp
} from "react-icons/bi";
import CommonButton from '../../CommonButton';

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

const sortData = [
  { icon: <BiSortUp />, title: 'A to Z', type: 'asc' },
  { icon: <BiSortDown />, title: 'Z to A', type: 'desc' },
  { icon: <BiAlignJustify />, title: 'Normal', type: 'normal' },
];

function HeaderFilter({ header, tableMeta, setOpenFilter }) {
  const { column } = header;
  const [filterCheckList, setFilterCheckList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getCheckListByInput = () => {
    const backupData = tableMeta.getBackupData();

    return Array.from(new Set(
      backupData.map(data => data[column.id])
        .filter(data => data.includes(inputValue))
        .sort()
    ));
  };

  // checked 상태일 경우 필터 값 추가
  const addColumnFilter = (columnFilters, filterValue) => {
    const count = columnFilters.filter(filter => filter.id === column.id).length;

    return count === 0 ?
      [
        ...columnFilters,
        { id: column.id, value: Array.isArray(filterValue) ? filterValue : [filterValue] }
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

  const autoRemoveColumnFilter = () => {
    const checkList = Array.from(document.getElementsByName(column.id));
    const count = checkList.filter(check => check.checked === true).length;

    if (count === 0) {
      tableMeta.handleFilters(old => old.filter(filter => filter.id !== column.id));
    }
  }

  const changeFilterValue = (e) => {
    const value = e.target.value;
    const isCheck = e.target.checked;

    if (isCheck) tableMeta.handleFilters(old => addColumnFilter(old, value));
    else tableMeta.handleFilters(old => deleteColumnFilter(old, value));

    autoRemoveColumnFilter();
  }

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (inputValue.length === 0) {
      setFilterCheckList(tableMeta.getFilterCheckList(column.id));
      return;
    }
    setFilterCheckList(getCheckListByInput);
  }, [inputValue]);

  useEffect(() => {
    setFilterCheckList(tableMeta.getFilterCheckList(column.id));
  }, []);
  return (
    <FilterWrapper>
      {sortData.map((sort, index) => (
        <SortBox
          key={index}
          onClick={
            sort.type === 'desc' ?
              () => tableMeta.handleSorting(true, column.id) :
              sort.type === 'asc' ?
                () => tableMeta.handleSorting(false, column.id) :
                () => tableMeta.resetSorting()
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
          onChange={handleInputValue}
        />
      </div>
      <DataListBox>
        {filterCheckList.map((data, index) => (
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
          color="darkred"
          onClick={() => setOpenFilter(false)}
        />
      </div>
    </FilterWrapper>
  );
};

export default HeaderFilter;
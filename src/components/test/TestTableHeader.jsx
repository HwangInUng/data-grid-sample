import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import TestTableCell from './TestTableCell';
import { BiCaretLeft, BiFilter } from 'react-icons/bi';
import { flexRender } from '@tanstack/react-table';
import TestTableFilter from './TestTableFilter';

const TableHeader = styled.th`
    ${tw`
        relative
        font-bold
        text-sm
        border-y
        border-slate-300
    `}
    height: ${props => props.height || 35}px;

    .content-box{
        ${tw`
            relative
            flex
            items-center
            justify-center
            m-auto
            cursor-pointer
        `}
    }

    .required-icon{
        ${tw`
            absolute
            top-[-3px]
            left-[-3px]
            w-[15px]
            h-[15px]
            m-0
            p-0
            rotate-45
            text-red-600
        `}
    }

    .filter-icon{
        ${tw`
            p-0
            m-0
            w-[20px]
            h-[20px]
        `}
    }

    .filter-box {
        ${tw`
            absolute
            right-1
            border
            border-slate-400
            rounded-lg
            bg-white
            p-[3px]
            hover:bg-blue-950
            hover:text-white
        `}
    }
`;

const headerHeight = 35;

function TestTableHeader({ header, tableMeta }) {
  const { column } = header;
  const [openFilter, setOpenFilter] = useState(false);
  const canFilter = column.getCanFilter();
  const isStatusCell = column.id === 'status';
  const isRequired = column.columnDef.cell === TestTableCell &&
    column.columnDef.meta.required;

  useEffect(() => {
    if (!canFilter) {
      setOpenFilter(false);
      column.setFilterValue(null);
    }
  }, [canFilter]);

  return (
    <>
      <TableHeader
        style={{ width: header.getSize() }}
        height={isStatusCell ? headerHeight * header.rowSpan : null}
        rowSpan={header.rowSpan}
        colSpan={header.colSpan}
      >
        {isRequired ? <BiCaretLeft className="required-icon" /> : null}
        <div className="content-box">
          {header.isPlaceholder ?
            null :
            flexRender(
              column.columnDef.header,
              header.getContext()
            )
          }
          {canFilter ?
            <div className="filter-box">
              <BiFilter
                className="filter-icon"
                onClick={() => setOpenFilter(old => !old)}
              />
            </div> :
            null
          }
        </div>
        {
          canFilter && openFilter ?
            <TestTableFilter
              header={header}
              tableMeta={tableMeta}
              setOpenFilter={setOpenFilter}
            /> :
            null
        }
      </TableHeader >
    </>
  );
};

export default TestTableHeader;
import { useEffect, useState } from 'react';
import TestTableCell from './TableCell';
import { BiCaretLeft, BiFilter } from 'react-icons/bi';
import { flexRender } from '@tanstack/react-table';
import HeaderFilter from './utils/HeaderFilter';
import { DataTableHeader } from './styles/TableStyles';

const headerHeight = 35;

function TableHeader({ header, tableMeta }) {
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
      <DataTableHeader
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
            <HeaderFilter
              header={header}
              tableMeta={tableMeta}
              setOpenFilter={setOpenFilter}
            /> :
            null
        }
      </DataTableHeader >
    </>
  );
};

export default TableHeader;
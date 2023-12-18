import { flexRender } from '@tanstack/react-table';
import { DataTableCell } from './styles/TableStyles';
function TableRow(props) {
  const { row, selectedData, setSelectedData } = props;

  const handleSelected = e => {
    setSelectedData(e, row.index);
  };

  return (
    <>
      <tr
        className={selectedData === row.index ? 'bg-slate-100' : null}
        onMouseDown={handleSelected}
      >
        {row.getVisibleCells().map(cell => (
          <DataTableCell key={cell.id}>
            <div className='cell-box'>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </div>
          </DataTableCell>
        ))}
      </tr>
    </>
  );
}

export default TableRow;

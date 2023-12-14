import { flexRender } from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';
import { DataTableCell } from '../styles/TableStyles';

function DraggableRow(props) {
  const { row, selectedData, setSelectedData, reorderRow } = props;

  const handleSelected = e => {
    setSelectedData(e, row.index);
  };

  const [, dropRef] = useDrop({
    accept: 'row',
    drop: draggedRow => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });
  return (
    <tr
      ref={node => dropRef(dragRef(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
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
  );
}

export default DraggableRow;

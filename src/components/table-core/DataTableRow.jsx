import { useCallback, useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import tw, { styled } from "twin.macro";
import { TableContext } from "./DataTableWrapper";

const TableRow = styled.tr`
  ${tw`
    hover:bg-slate-100
  `}
`;

function DataTableRow(props) {
  const { row, children } = props;
  const { setSelectedData, reorderRow } = useContext(TableContext);
  const [seleted, setSelected] = useState(false);

  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index)
  });

  const handleSelectedData = useCallback((targetRow) => {
    setSelected(old => !old);
    setSelectedData(
      old => (
        old.includes(targetRow) ?
          (old.filter(selectRow => selectRow !== targetRow)) :
          ([...old, targetRow])
      )
    );
  }, [setSelectedData]);

  const [{ isDragging }, dragRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row'
  });

  return (
    <>
      <TableRow
        ref={(node) => dropRef(dragRef(node))}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className={seleted ? 'bg-slate-100' : null}
        onClick={() => handleSelectedData(row)}
      >
        {children}
      </TableRow>
    </>
  );
}

export default DataTableRow;
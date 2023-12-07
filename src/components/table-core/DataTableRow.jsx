import { memo, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import tw, { styled } from "twin.macro";
import DataTableCell from "./DataTableCell";
import { DispatchContext } from "./DataTableWrapper";

const TableRow = styled.tr`
  ${tw`
    hover:bg-slate-100
  `}
`;

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
}

function DataTableRow(props) {
  const { row, children } = props;
  const {
    reorderRow,
    isSelected,
    handleSelectedData
  } = useContext(DispatchContext);

  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index)
  });

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
        className={isSelected(row) ? 'bg-slate-100' : null}
        onMouseDown={() => handleSelectedData(row)}
      >
        {children}
      </TableRow>
    </>
  );
}

export default memo(DataTableRow, isEqual);
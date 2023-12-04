import { useDrag, useDrop } from "react-dnd";
import tw, { styled } from "twin.macro";

const TableRow = styled.tr`
  ${tw`
    hover:bg-slate-100
  `}
`;

export const DataTableRow = (props) => {
  const {
    row,
    selectedData,
    children,
    onClick,
    reorderRow
  } = props;
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
        className={selectedData.includes(row) ? 'bg-slate-100' : null}
        onClick={() => onClick(row)}
      >
        {children}
      </TableRow>
    </>
  );
};
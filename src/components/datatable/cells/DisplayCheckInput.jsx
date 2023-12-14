import { memo } from "react";
import { DataTableCheckbox } from "../styles/TableStyles";

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
};

function DisplayCheckInput({ row, column }) {
  const value = row.original[column.id];
  return (
    <DataTableCheckbox
      type="checkbox"
      checked={value === 'Y' ? true : false}
      readOnly
      onMouseDown={e => e.stopPropagation()}
    />
  );
};

export default memo(DisplayCheckInput, isEqual);
import { memo } from "react";
import { CellCheckInput } from "./CellCheckInput";

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
};

function DisplayCheckInput({ row, column, table }) {
  const { readOnly } = column.columnDef.meta;
  return (
    <CellCheckInput
      value={row.original[column.id]}
      readOnly={readOnly}
    />
  );
};

export default memo(DisplayCheckInput, isEqual);
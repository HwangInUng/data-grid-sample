import { memo } from "react";
import { CellCheckInput } from "./CellCheckInput";

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
};

function DisplayCheckInput ({ row, column, table }) {
  const { key, readOnly } = column.columnDef.meta;
  return (
    <CellCheckInput
      value={row.original[key]}
      readOnly={readOnly}
    />
  );
};

export default memo(DisplayCheckInput, isEqual);
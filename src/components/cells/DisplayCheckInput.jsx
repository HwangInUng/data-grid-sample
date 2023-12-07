import { CellCheckInput } from "./CellCheckInput";

export const DisplayCheckInput = ({ row, column }) => {
  const { key, readOnly } = column.columnDef.meta;
  return (
      <CellCheckInput
        value={row.original[key]}
        readOnly={readOnly}
      />
  );
};
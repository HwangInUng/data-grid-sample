import { CellCheckInput } from "./CellCheckInput";
import { CellWrapper } from "./CellWrapper";

export const DisplayCheckInput = ({ row, column }) => {
  const { key, readOnly } = column.columnDef.meta;
  return (
    <CellWrapper>
      <CellCheckInput
        value={row.original[key]}
        readOnly={readOnly}
      />
    </CellWrapper>
  );
};
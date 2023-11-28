import { CellCheckInput } from "../common/CellCheckInput";
import { CellWrapper } from "../common/CellWrapper";

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
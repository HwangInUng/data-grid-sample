import { memo, useEffect, useState } from "react";

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
}

function TestTableCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const handleOnChage = (e) => {
    setValue(e.target.value);
    tableMeta?.editValue(e.target.value);
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <>
      {
        columnMeta.type === 'select' ?
          <select
            value={value}
            onChange={handleOnChage}
            onClick={e => e.stopPropagation()}
          >
            {columnMeta.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select> :
          columnMeta.readOnly ?
            <span>
              {value}
            </span> :
            <input
              type={columnMeta.type}
              className="text-center"
              value={value}
              name={column.id}
              onFocus={e => e.target.select()}
              onChange={
                columnMeta.type === 'text' ?
                  e => setValue(e.target.value) :
                  handleOnChage
              }
              onBlur={
                columnMeta.type === 'text' ?
                  tableMeta?.editValue :
                  null
              }
            />
      }
    </>
  );
};

export default memo(TestTableCell, isEqual);
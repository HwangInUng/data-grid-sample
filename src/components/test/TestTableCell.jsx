import { memo, useEffect, useState } from "react";

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
}

function TestTableCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const handleEditValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (initialValue !== newValue) {
      tableMeta?.editValue(row.index, column.id, newValue);
    }
  }

  const handleValue = (e) => {
    setValue(e.target.value);
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
            name={column.id}
            onChange={handleEditValue}
            onMouseDown={e => e.stopPropagation()}
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
              className="text-center invalid:border-red-500 invalid:border"
              value={value}
              required={columnMeta?.required ?? false}
              name={column.id}
              onFocus={e => e.target.select()}
              onChange={
                columnMeta.type === 'text' ?
                  handleValue :
                  handleEditValue
              }
              onBlur={
                columnMeta.type === 'text' ?
                  handleEditValue :
                  null
              }
            />
      }
    </>
  );
};

export default memo(TestTableCell, isEqual);
import { useEffect, useState } from "react";

export const CheckCell = ({row, column, table }) => {
    // 체크 여부에 따라 삭제 대상 여부를 추가 및 제거
    const [checked, setChecked] = useState(false);
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    
    useEffect(() => {
        const targetRow = row.original;
        if(checked){
            columnMeta?.setDeleteRows((old) => [...old, targetRow]);
        } else {
            columnMeta?.setDeleteRows((old) => old.filter((oldRow) => targetRow !== oldRow));
        }
    }, [checked]);

    useEffect(() => {
        setChecked(false);
    }, [row]);

    return <input
        type='checkbox'
        onChange={() => setChecked(old => !old)}
        checked={checked}
    />
};
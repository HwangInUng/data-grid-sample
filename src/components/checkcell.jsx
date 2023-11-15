import { useEffect, useState } from "react";

export const CheckCell = ({getValue, row, column }) => {
    // 체크 여부에 따라 삭제 대상 여부를 추가 및 제거
    const initialValue = getValue();
    const [checked, setChecked] = useState(false);
    const columnMeta = column.columnDef.meta;
    
    useEffect(() => {
        const newRow = row.original;
        if(checked){
            columnMeta?.setDeleteRows((old) => [...old, newRow]);
        } else {
            columnMeta?.setDeleteRows((old) => old.filter((oldRow) => newRow !== oldRow));
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
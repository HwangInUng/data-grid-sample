import { useEffect, useState } from "react";

export const CheckCell = ({row, column}) => {
    // 체크 여부에 따라 삭제 대상 여부를 추가 및 제거
    const [checked, setChecked] = useState(false);
    const columnMeta = column.columnDef.meta;

    const addDeleteRows = (row) => {
        // 선택된 row를 하나씩 삭제 대상에 추가
        setChecked(old => !old);
    };

    return <input type='checkbox' onChange={() => addDeleteRows(row.original)} checked={checked}/>
};
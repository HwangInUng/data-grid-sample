import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";

const CheckWrapper = styled.div`
    ${tw`
        flex
        w-full
        justify-center
    `}
`;

const CheckInput = styled.input`
    ${tw`
        appearance-none
        border-slate-400
        border
        rounded-[50%]
        checked:bg-blue-950
        w-5
        h-5
    `}
`;

export const CheckCell = ({ row, column }) => {
    // 체크 여부에 따라 삭제 대상 여부를 추가 및 제거
    const [checked, setChecked] = useState(false);
    const columnMeta = column.columnDef.meta;

    useEffect(() => {
        const targetRow = row.original;
        if (checked) {
            columnMeta?.setCheckedRows((old) => [...old, targetRow]);
        } else {
            columnMeta?.setCheckedRows((old) => old.filter((oldRow) => targetRow !== oldRow));
        }
    }, [checked]);

    useEffect(() => {
        setChecked(false);
    }, [row]);

    return (
        <CheckWrapper>
            <CheckInput
                type='checkbox'
                onChange={() => setChecked(old => !old)}
                checked={checked}
            />
        </CheckWrapper>
    );
};
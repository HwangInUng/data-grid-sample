import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";

const StatusWrapper = styled.div`
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
        w-5
        h-5
    `}
    &:checked{
        background-color: darkblue;
    }
`;

const StatusIcon = styled.div`
    ${tw`
        rounded-[50%]
        border
        w-5
        h-5
    `}
`;

export const StatusCell = ({ row, column, table }) => {
    // 체크 여부에 따라 삭제 대상 여부를 추가 및 제거
    const columnMeta = column.columnDef.meta;
    const tableState = table.options.state;
    const { selectedRows } = tableState;


    const addCheckedRow = () => {
        const targetRow = row.original;
        if (selectedRows.includes(row)) {
            columnMeta?.setCheckedRows((old) => [...old, targetRow]);
        } else {
            columnMeta?.setCheckedRows((old) => old.filter((oldRow) => targetRow !== oldRow));
        }
    }

    const matchingStatus = () => {

    }

    useEffect(() => {
        addCheckedRow();
    }, [selectedRows]);

    return (
        <StatusWrapper>
            {/* <CheckInput
                type='checkbox'
                onChange={addCheckedRow}
                checked={selectedRows.includes(row)}
            /> */}
            <StatusIcon>
                
            </StatusIcon>
        </StatusWrapper>
    );
};
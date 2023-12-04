import { useEffect, useMemo } from "react";
import tw, { styled } from "twin.macro";
import {
    BiSolidAddToQueue,
    BiSolidEditAlt,
    BiSolidMinusSquare
} from "react-icons/bi";

const StatusWrapper = styled.div`
    ${tw`
        flex
        justify-center
    `}

    & svg{
        ${tw`
            w-fit
            h-fit
        `}
    }
`;

export const StatusCell = ({ row, column, table }) => {
    // 체크 여부에 따라 삭제 대상 여부를 추가 및 제거
    const { deleteRows, setCheckedRows } = column.columnDef.meta;
    const { initialData, backupData, selectedData } = table.options.state;
    const targetRow = initialData[row.id];

    const matchingStatus = useMemo(() => {
        const icons = {
            add: <BiSolidAddToQueue className="text-green-600" />,
            edit: <BiSolidEditAlt className="text-blue-600" />,
            remove: <BiSolidMinusSquare className="text-red-600" />
        };

        const editRows = initialData.filter(row => row.id < backupData.length && !backupData.includes(row));
        const isEdit = editRows.includes(targetRow) && !deleteRows.includes(targetRow);
        const isRemove = deleteRows.includes(targetRow);
        const isAdd = !backupData.includes(targetRow);

        if (isEdit) return icons.edit;
        if (isRemove) return icons.remove;
        if (isAdd) return icons.add;
    }, [initialData, backupData, deleteRows, targetRow]);

    useEffect(() => {
        const addCheckedRow = () => {
            if (selectedData.includes(row)) {
                setCheckedRows((old) => [...old, targetRow]);
            } else {
                setCheckedRows((old) => old.filter((oldRow) => targetRow !== oldRow));
            }
        };

        addCheckedRow();
    }, [row, selectedData, setCheckedRows, targetRow]);
    return (
        <StatusWrapper>
            {matchingStatus}
        </StatusWrapper>
    );
};
import { useEffect } from "react";
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
    const tableState = table.options.state;
    const { data, backupData, selectedData } = tableState;
    const targetRow = row.original;

    const addCheckedRow = () => {
        if (selectedData.includes(row)) {
            setCheckedRows((old) => [...old, targetRow]);
        } else {
            setCheckedRows((old) => old.filter((oldRow) => targetRow !== oldRow));
        }
    }

    const matchingStatus = () => {
        const icons = {
            add: <BiSolidAddToQueue className="text-green-600" />,
            edit: <BiSolidEditAlt className="text-blue-600" />,
            remove: <BiSolidMinusSquare className="text-red-600" />
        };

        const editRows = data.filter((row, index) => backupData[index] !== row);
        const isEdit = editRows.includes(targetRow) && row.id < backupData.length;
        const isRemove = deleteRows.includes(targetRow);
        const isAdd = !backupData.includes(targetRow);

        if (isEdit) return icons.edit;
        if (isRemove) return icons.remove;
        if (isAdd) return icons.add;
    };

    useEffect(() => {
        addCheckedRow();
    }, [selectedData]);

    return (
        <StatusWrapper>
            {matchingStatus()}
        </StatusWrapper>
    );
};
import tw, {styled} from 'twin.macro';
import { memo, useEffect, useState } from "react";
import { EditSelect } from "./EditSelect";
import { EditInput } from "./EditInput";
import { EditCheckInput } from "./EditCheckInput";
import { CellWrapper } from "./CellWrapper";
import { EditDateInput } from "./EditDateInput";

const ValueBox = styled.span`
    ${tw`
        px-2
        overflow-hidden
        whitespace-nowrap
    `}
`;

export const EditCell = memo(({ getValue, row, column }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(getValue());
    // type을 meta 속성으로 보유하여 컴포넌트 동적 생성
    const {
        setEditRows,
        readOnly = false,
        type,
        options,
        justify,
    } = column.columnDef.meta;
    const [clicked, setClicked] = useState(false);

    const editValue = (value) => {
        setClicked(old => !old);
        // 초기 값과 수정된 값을 비교하여 수정된 로우 표시 가능
        if (initialValue !== value) {
            // 변경된 로우의 key에 해당하는 값을 변경
            // setEditRows()을 통해 변경된 row를 1개씩 적재
            const currentKey = column.id;
            const updateRow = (old) =>
                old.map((oldRow, index) => {
                    if (index === row.index) {
                        return {
                            ...old[row.index],
                            [currentKey]: value
                        };
                    }
                    return oldRow;
                });
            setEditRows(updateRow);
        }
    };

    const handleValue = (e) => {
        const changeValue = e.target.value;
        setValue(changeValue);
    }
    const isEmpty = value && value.length === 0;
    // 넘어온 type의 종류를 통해 해당 컴포넌트 반환
    // type은 컬럼의 meta로 보유
    const editTag = {
        'text': readOnly ? <ValueBox>{value}</ValueBox> :
            clicked || isEmpty ?
                <EditInput
                    value={value}
                    onChange={handleValue}
                    onBlur={() => editValue(value)}
                /> :
                <ValueBox
                    tabIndex={0}
                    onFocus={() => setClicked(old => !old)}
                >
                    {value}
                </ValueBox>,
        'select': <EditSelect
            value={value}
            options={options}
            onChange={handleValue}
        />,
        'checkbox': <EditCheckInput
            value={value}
            onChange={editValue}
        />,
        'date': <EditDateInput
            value={value}
            onChange={editValue}
        />,
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <CellWrapper
            onClick={() => editValue(value)}
            justify={justify ?? null}
        >
            {editTag[type]}
        </CellWrapper>
    );
});
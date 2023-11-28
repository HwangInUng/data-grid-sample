import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { EditSelect } from "./EditSelect";
import { EditInput } from "./EditInput";

const CellWrapper = styled.div`
    ${tw`
        overflow-hidden
        flex
        items-center
        text-[0.8rem]
        font-normal
        px-1
    `}

    justify-content: ${props => props.justify || 'center'};
`;

export const EditCell = ({ getValue, row, column }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(getValue());
    // type을 meta 속성으로 보유하여 컴포넌트 동적 생성
    const {
        setEditRows,
        readOnly,
        type,
        options,
        justify
    } = column.columnDef.meta;
    const [clicked, setClicked] = useState(false);

    const editValue = (value) => {
        if (value.length !== 0) setClicked(old => !old);

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

    // 넘어온 type의 종류를 통해 해당 컴포넌트 반환
    // type은 컬럼의 meta로 보유
    const editTag = {
        'text': <EditInput
            type="text"
            value={value}
            onChange={handleValue}
            onBlur={() => editValue(value)}
            autoFocus
            className="w-full"
        />,
        'select': <EditSelect
            options={options}
            value={value}
            onChange={handleValue}
        />,
        'checkbox': <EditInput type='checkbox' />,
        'date': <input type='date'></input>,
        'button': <button>등록</button>
    };

    useEffect(() => {
        setValue(initialValue);
        if (initialValue.length === 0) setClicked(true);
    }, [initialValue]);

    if (readOnly) {
        return <CellWrapper justify={justify ?? null}>
            {value}
        </CellWrapper>
    }

    return (
        <CellWrapper
            onClick={() => editValue(value)}
            justify={justify ?? null}
        >
            {
                clicked || value.length === 0 || type === 'select' ?
                    editTag[type] :
                    value
            }
        </CellWrapper>
    );
};
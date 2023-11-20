import { useEffect, useState } from "react";
import tw, {styled} from "twin.macro";

const CellWrapper = styled.div`
    ${tw`
        overflow-hidden
        whitespace-nowrap
        flex
        items-center
        justify-center
    `}
`;

export const EditCell = ({ getValue, row, column}) => {
    const initialValue = getValue();
    const [value, setValue] = useState(getValue());
    // type을 meta 속성으로 보유하여 컴포넌트 동적 생성
    const columnMeta = column.columnDef.meta;
    const [clicked, setClicked] = useState(false);

    const editValue = () => {
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
            columnMeta?.setEditRows(updateRow);
        }
    };

    useEffect(() => {
        setValue(initialValue);
        if(initialValue.length === 0) setClicked(true);
    }, [initialValue]);

    // 넘어온 type의 종류를 통해 해당 컴포넌트 반환
    // type은 컬럼의 meta로 보유
    const editTag = (type) => {
        const tags = {
            'text': <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={editValue}
                autoFocus
                className="w-full"
            />,
            'select': <select></select>,
            'checkbox': <input type='checkbox'></input>,
            'date': <input type='date'></input>
        };

        return tags[type];
    };

    if (columnMeta?.readOnly) return <span>{value}</span>;

    return clicked || value.length === 0 ?
        editTag(columnMeta?.type) :
        <CellWrapper onClick={editValue}> {value} </CellWrapper>;
};
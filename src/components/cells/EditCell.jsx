import tw, { styled } from 'twin.macro';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { EditSelect } from "./EditSelect";
import { EditInput } from "./EditInput";
import { EditCheckInput } from "./EditCheckInput";
import { CellWrapper } from "./CellWrapper";
import { EditDateInput } from "./EditDateInput";
import { TableContext } from '../table-core/DataTableWrapper';

const ValueBox = styled.span`
    ${tw`
        w-full
        px-2
        overflow-hidden
        whitespace-nowrap
        flex
        items-center
    `}
    justify-content: ${props => props.justify || 'center'};
`;

export const EditCell = memo((props) => {
    const {
        cellValue,
        rowIndex,
        columnMeta,
        columnId,
        setData
    } = props;
    const initialValue = cellValue;
    const [value, setValue] = useState(initialValue);
    // type을 meta 속성으로 보유하여 컴포넌트 동적 생성
    const [clicked, setClicked] = useState(false);
    const {
        readOnly = false,
        type,
        options,
        justify,
    } = columnMeta;

    useEffect(() => console.log('test'), [columnId]);

    const editValue = useCallback((value) => {
        setClicked(old => !old);
        // 초기 값과 수정된 값을 비교하여 수정된 로우 표시 가능
        if (initialValue !== value) {
            const currentKey = columnId;
            const updateRow = (old) =>
                old.map((oldRow, index) => {
                    if (index === rowIndex) {
                        return {
                            ...old[rowIndex],
                            [currentKey]: value
                        };
                    }
                    return oldRow;
                });
            setData(updateRow);
        }
    }, [value]);

    const handleValue = useCallback((e) => {
        const changeValue = e.target.value;
        setValue(changeValue);
    }, [value]);
    const isEmpty = value && value.length === 0;
    // 넘어온 type의 종류를 통해 해당 컴포넌트 반환
    // type은 컬럼의 meta로 보유
    const editTag = {
        'text': readOnly ? <ValueBox justify={justify}>{value}</ValueBox> :
            clicked || isEmpty ?
                <EditInput
                    value={value}
                    onChange={handleValue}
                    onBlur={() => editValue(value)}
                /> :
                <ValueBox
                    tabIndex={0}
                    onFocus={() => setClicked(old => !old)}
                    justify={justify}
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
            onChange={() => editValue(value)}
        />,
        'date': <EditDateInput
            value={value}
            onChange={() => editValue(value)}
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
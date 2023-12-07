import tw, { styled } from 'twin.macro';
import { useCallback, useContext, useEffect, useState } from "react";
import { EditSelect } from "./EditSelect";
import { EditInput } from "./EditInput";
import { EditCheckInput } from "./EditCheckInput";
import { EditDateInput } from "./EditDateInput";
import { DispatchContext } from '../table-core/DataTableWrapper';

const ValueBox = styled.span`
    ${tw`
        w-full
        h-full
        px-2
        overflow-hidden
        whitespace-nowrap
        flex
        items-center
    `}
    justify-content: ${props => props.justify || 'center'};
`;

function EditCell(props) {
    const {
        cellValue,
        rowIndex,
        columnMeta,
        columnId,
    } = props;
    const { editValue } = useContext(DispatchContext);
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

    const handleEditValue = (value) => {
        setClicked(old => !old);
        editValue(initialValue, value, columnId, rowIndex);
    }

    const handleValue = useCallback((e) => {
        const changeValue = e.target.value;
        setValue(changeValue);
    }, [value]);

    const editTag = {
        'text': readOnly ? <ValueBox justify={justify}>{value}</ValueBox> :
            clicked ?
                <EditInput
                    value={value}
                    onChange={handleValue}
                    onBlur={() => handleEditValue(value)}
                /> :
                <ValueBox
                    tabIndex={0}
                    onClick={() => setClicked(old => !old)}
                    onFocus={() => setClicked(old => !old)}
                    justify={justify}
                >
                    {value}
                </ValueBox>,
        'select': <EditSelect
            value={value}
            options={options}
            onChange={() => handleEditValue(value)}
        />,
        'checkbox': <EditCheckInput
            value={value}
            onChange={() => handleEditValue(value)}
        />,
        'date': <EditDateInput
            value={value}
            handleValue={handleValue}
            editValue={editValue}
        />,
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        editTag[type]
    );
};

export default EditCell;
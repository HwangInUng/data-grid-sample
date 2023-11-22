import {
    createColumnHelper,
} from '@tanstack/react-table';
import { EditCell } from './EditCell';
import { StatusCell } from './StatusCell';
import { useEffect, useState } from 'react';
import { CommonButton } from '../common/CommonButton';
import { StatusIcon } from './StatusIcon';
import { DataTableWrapper } from './DataTableWrapper';

export const SampleTable = () => {
    const [data, setData] = useState([
        { name: 'test', age: '21', gender: '남자', city: '동작구' },
        { name: 'test1', age: '24', gender: '남자', city: '강동구' },
        { name: 'test2', age: '25', gender: '여자', city: '강남구' },
        { name: 'test3', age: '17', gender: '남자', city: '서초구' },
        { name: 'test4', age: '26', gender: '여자', city: '관악구' },
        { name: 'test5', age: '21', gender: '남자', city: '노원구' },
        { name: 'test6', age: '30', gender: '남자', city: '동작구' },
        { name: 'test7', age: '18', gender: '여자', city: '강서구' },
        { name: 'test8', age: '19', gender: '남자', city: '강북구' }
    ]);
    const [checkedRows, setCheckedRows] = useState([]);
    const [originalRows, setOriginalRows] = useState(data);
    const [deleteRows, setDeleteRows] = useState([]);

    const columnHelper = createColumnHelper();

    // 셀 단위로 이벤트를 부여
    const columns = [
        columnHelper.display({
            header: 'status',
            cell: StatusCell,
            meta: {
                deleteRows: deleteRows,
                setCheckedRows: setCheckedRows,
                icon: <StatusIcon />
            }
        }),
        columnHelper.accessor('name', {
            header: '이름',
            cell: EditCell,
            meta: {
                type: 'text',
                setEditRows: setData
            }
        }),
        columnHelper.accessor('age', {
            header: '나이',
            cell: EditCell,
            meta: {
                type: 'text',
                setEditRows: setData
            }
        }),
        columnHelper.accessor('gender', {
            header: '성별',
            cell: EditCell,
            meta: {
                type: 'text',
                setEditRows: setData
            }
        }),
        columnHelper.accessor('city', {
            header: '사는곳',
            cell: EditCell,
            meta: {
                type: 'text',
                setEditRows: setData
            }
        })
    ];

    // 테이블 데이터 원래대로 복구
    const resetData = () => {
        setData(originalRows);
        setCheckedRows([]);
        setDeleteRows([]);
    }

    // 추가
    const addRow = () => {
        const newRow = {
            name: '', age: '', gender: '', city: ''
        };

        setData((old) => [...old, newRow]);
    };

    // 삭제
    const removeRow = () => {
        if (checkedRows.length === 0) return;

        setDeleteRows(checkedRows);
        setCheckedRows([]);
    };

    // 변경/추가 저장
    const saveRow = () => {
        const newRow = data.filter(row => !deleteRows.includes(row));
        setData(newRow);
        setOriginalRows(newRow);
    }

    return (
        <>
            <CommonButton onClick={addRow} title="추가" />
            <CommonButton onClick={removeRow} title="삭제" />
            <CommonButton onClick={saveRow} title="저장" />
            <DataTableWrapper
                data={data}
                resetData={resetData}
                columns={columns}
                backupData={originalRows}
                addStatusTable
            />
        </>
    );
};
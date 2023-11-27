import {
    createColumnHelper,
} from '@tanstack/react-table';
import { EditCell } from './EditCell';
import { StatusCell } from './StatusCell';
import { useState } from 'react';
import { CommonButton } from '../common/CommonButton';
import { StatusIcon } from './StatusIcon';
import { DataTableWrapper } from './DataTableWrapper';
// test 데이터 생성
import { makeData } from '../../js/makData';

export const SampleTable = () => {
    const [data, setData] = useState(makeData([1000]));
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
            filterFn: 'arrIncludesSome',
            meta: {
                type: 'text',
                setEditRows: setData
            }
        }),
        columnHelper.accessor('age', {
            header: '나이',
            cell: EditCell,
            filterFn: 'arrIncludesSome',
            meta: {
                type: 'text',
                setEditRows: setData
            }
        }),
        columnHelper.accessor('gender', {
            header: '성별',
            cell: EditCell,
            filterFn: 'arrIncludesSome',
            meta: {
                type: 'text',
                setEditRows: setData
            }
        }),
        columnHelper.accessor('city', {
            header: '사는곳',
            cell: EditCell,
            filterFn: 'arrIncludesSome',
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
            <div className='w-full flex justify-end mb-2 py-2'>
                <CommonButton onClick={addRow} title="추가" />
                <CommonButton onClick={removeRow} title="삭제" />
                <CommonButton onClick={saveRow} title="저장" />
            </div>
            <DataTableWrapper
                initialData={data}
                resetData={resetData}
                columns={columns}
                backupData={originalRows}
                addStatusTable
                enableColumnResizing={false}
            />
        </>
    );
};
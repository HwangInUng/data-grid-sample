import {
    createColumnHelper,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { CommonButton } from './common/CommonButton';
import { StatusIcon } from './utils/StatusIcon';
// test 데이터 생성
import { makeData } from '../js/makData';
import { DisplayCheckInput } from './cells/DisplayCheckInput';
import { DisplayButton } from './cells/DisplayButton';
import DataTableWrapper from './table-core/DataTableWrapper';

export const SampleTable = () => {
    const [data, setData] = useState(() => makeData([500]));
    const [originalRows, setOriginalRows] = useState(data);
    const [deleteRows, setDeleteRows] = useState([]);
    const genderOption = ['남자', '여자'];

    const columnHelper = createColumnHelper();
    // 셀 단위로 이벤트를 부여
    const columns = useMemo(() => [
        columnHelper.display({
            id: 'status',
            header: <StatusIcon />,
        }),
        columnHelper.group({
            id: 'test',
            header: 'test',
            columns: [
                columnHelper.accessor('name', {
                    header: '이름',
                    filterFn: 'arrIncludesSome',
                    meta: {
                        type: 'text',
                        required: true,
                        readOnly: true, // 읽기전용(default: false)
                    }
                }),
                columnHelper.accessor('age', {
                    header: '나이',
                    filterFn: 'arrIncludesSome',
                    meta: {
                        type: 'text',
                        required: true,
                        justify: 'right', // 가로 방향
                    }
                }),
            ]
        }),
        columnHelper.group({
            id: 'test2',
            header: 'test2',
            columns: [
                columnHelper.accessor('gender', {
                    header: '성별',
                    filterFn: 'arrIncludesSome',
                    meta: {
                        type: 'select',
                        options: genderOption, // select 옵션
                    }
                }),
                columnHelper.group({
                    id: 'test3',
                    header: 'test3',
                    columns: [
                        columnHelper.accessor('createdAt', {
                            header: '생일',
                            filterFn: 'arrIncludesSome',
                            meta: {
                                type: 'date',
                            }
                        }),
                        columnHelper.display({
                            id: 'check',
                            header: '체크',
                            cell: DisplayCheckInput,
                            meta: {
                                readOnly: true,
                                key: 'auth'
                            }
                        }),
                    ]
                }),
            ]
        }),
        columnHelper.display({
            id: 'button',
            header: '버튼',
            cell: DisplayButton,
            meta: {
                text: '등록'
            }
        }),
    ], []);

    // 테이블 데이터 원래대로 복구
    // const resetData = () => {
    //     setData(originalRows);
    //     setCheckedRows([]);
    //     setDeleteRows([]);
    // }

    // 추가
    const addRow = useCallback(() => {
        const newRow = {
            name: '', age: '', gender: '', city: ''
        };

        setData((old) => [...old, newRow]);
    }, []);

    // 삭제
    const removeRow = useCallback(() => {
        // if (checkedRows.length === 0) return;

        // setDeleteRows(checkedRows);
        // setCheckedRows([]);
    }, []);

    // 변경/추가 저장
    const saveRow = useCallback(() => {
        const newRow = data.filter(row => !deleteRows.includes(row));
        setData(newRow);
        setOriginalRows(newRow);
    }, []);

    return (
        <>
            <div className='w-full'>
                <div className='w-full flex justify-between mb-2 py-2'>
                    <div className='w-1/2 flex justify-start items-center'>
                        <div className='px-2 font-bold'>
                            샘플
                        </div>
                        <div className='text-sm text-slate-600'>
                            <span>전체</span>
                            <span className='text-blue-500 font-bold'>{` ${data.length}`}</span>
                            <span>건</span>
                        </div>
                    </div>
                    <div className='w-1/2 flex justify-end items-center'>
                        <CommonButton onClick={addRow} title="추가" />
                        <CommonButton onClick={removeRow} title="삭제" />
                        <CommonButton onClick={saveRow} title="저장" />
                    </div>
                </div>
                <DataTableWrapper
                    columns={columns}
                    initialData={data}
                    setData={setData}
                    backupData={originalRows}
                    deleteData={deleteRows}
                    setDeleteData={setDeleteRows}
                    addStatusTable={true}
                />
            </div>
        </>
    );
};
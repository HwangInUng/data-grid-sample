import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import { EditCell } from './editcell';
import { CheckCell } from './checkcell';
import { useState } from 'react';
import { styled } from 'styled-components';


const SampleButton = styled.button`
    border-radius: 10px;
    padding: 5px 15px 5px 15px;
    margin: 0px 5px 10px 0px;
    color: white;
    background-color: darkblue;
    
    &:hover{
        transition: transform 0.2s linear;
        transform: scale(1.07);
        background-color: #0000ff;
    }
`;

export const SampleTable = () => {
    const [data, setData] = useState([
        { name: 'test', age: 21, gender: '남자', city: '동작구' },
        { name: 'test1', age: 24, gender: '남자', city: '강동구' },
        { name: 'test2', age: 25, gender: '여자', city: '강남구' },
        { name: 'test3', age: 17, gender: '남자', city: '서초구' },
        { name: 'test4', age: 26, gender: '여자', city: '관악구' },
        { name: 'test5', age: 21, gender: '남자', city: '노원구' },
        { name: 'test6', age: 30, gender: '남자', city: '동작구' },
        { name: 'test7', age: 18, gender: '여자', city: '강서구' },
        { name: 'test8', age: 19, gender: '남자', city: '강북구' }
    ]);
    const [deleteRows, setDeleteRows] = useState([]);
    const [originalRows, setOriginalRows] = useState(data);
    const [columnResizeMode, setColumnResizeMode] = useState('onChange');

    const columnHelper = createColumnHelper();

    // 셀 단위로 이벤트를 부여
    const columns = [
        columnHelper.display({
            header: 'check',
            cell: CheckCell,
            meta: {
                setDeleteRows: setDeleteRows
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

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel()
    });

    // 테이블 데이터 원래대로 복구
    const resetRow = () => {
        setData(originalRows);
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
        const newRow = data.filter(row => !deleteRows.includes(row));

        if(deleteRows.length === 0) return;

        setData(newRow);
        setDeleteRows([]);
        setOriginalRows(newRow);
    };

    // 변경/추가 저장
    const saveRow = () => {
        setOriginalRows(data);
    }

    return (
        <div className='p-2'>
            <SampleButton onClick={resetRow}>새로고침</SampleButton>
            <SampleButton onClick={addRow}>추가</SampleButton>
            <SampleButton onClick={removeRow}>삭제</SampleButton>
            <SampleButton onClick={saveRow}>저장</SampleButton>
            <table className='w-[800px]' onMouseDown={console.log('test')}>
                <thead
                    // 테이블 사이즈 획득
                    {...{
                        style: {
                            width: table.getCenterTotalSize(),
                        },
                    }}
                >
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    // th의 각 사이즈를 획득
                                    {...{
                                        key: header.id,
                                        colSpan: header.colSpan,
                                        style: {
                                            width: header.getSize(),
                                        },
                                    }}
                                >
                                    {header.isPlaceholder ?
                                        null :
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    {/* resize 모드 */}
                                    <div
                                        {...{
                                            onMouseDown: header.getResizeHandler(),
                                            onTouchStart: header.getResizeHandler(),
                                            className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                                            style: {
                                                transform:
                                                    columnResizeMode === 'onEnd' &&
                                                        header.column.getIsResizing() ?
                                                        `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` :
                                                        '',
                                            }
                                        }}
                                    />
                                    {/* /.resize 모드 */}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td
                                    {...{
                                        key: cell.id,
                                        style: {
                                            width: cell.column.getSize(),
                                        },
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
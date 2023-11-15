import {
    createColumnHelper,
    ColumnResizeMode,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import { EditCell } from './editcell';
import { CheckCell } from './checkcell';
import { useEffect, useState } from 'react';


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

    useEffect(() => {
        console.log(deleteRows);
    }, [deleteRows]);

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
            header: '이름'
        }),
        columnHelper.accessor('age', {
            header: '나이'
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
    return (
        <div className='p-2'>
            <table className='w-[800px]'>
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
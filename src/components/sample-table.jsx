import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import { EditCell } from './editcell';
import { CheckCell } from './checkcell';
import { useEffect, useState } from 'react';


export const SampleTable = () => {
    const data = [
        { name: 'test', age: 21, gender: '남자', city: '동작구' },
        { name: 'test1', age: 24, gender: '남자', city: '강동구' },
        { name: 'test2', age: 25, gender: '여자', city: '강남구' },
        { name: 'test3', age: 17, gender: '남자', city: '서초구' },
        { name: 'test4', age: 26, gender: '여자', city: '관악구' },
        { name: 'test5', age: 21, gender: '남자', city: '노원구' },
        { name: 'test6', age: 30, gender: '남자', city: '동작구' },
        { name: 'test7', age: 18, gender: '여자', city: '강서구' },
        { name: 'test8', age: 19, gender: '남자', city: '강북구' }
    ];

    const [deleteRows, setDeleteRows] = useState([]);
    const [editRows, setEditRows] = useState([]);


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
                setEditRows: setEditRows
            }
        }),
        columnHelper.accessor('city', {
            header: '사는곳',
            cell: EditCell,
            meta: {
                readOnly: true
            }
        })
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
    return (
        <div className='p-2'>
            <table className='w-[700px]'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder ?
                                        null :
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='border'>
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
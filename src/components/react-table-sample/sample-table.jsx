import {
    createColumnHelper,
} from '@tanstack/react-table';
import { EditCell } from './EditCell';
import { CheckCell } from './CheckCell';
import { useState } from 'react';
import { styled } from 'styled-components';
import { TableMenu } from './TableMenu';
import { SampleModal } from '../common/modal';
import { DataTable } from './DataTable';


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
    const [openModal, setOpenModal] = useState(false);
    const [openMenu, setOpenMenu] = useState({
        flag: false,
        left: 0,
        top: 0
    });
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

    const columnHelper = createColumnHelper();

    // 셀 단위로 이벤트를 부여
    const columns = [
        columnHelper.display({
            header: 'check',
            cell: CheckCell,
            meta: {
                setCheckedRows: setCheckedRows
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
    const resetRow = () => {
        setData(originalRows);
        setCheckedRows([]);
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
        const newRow = data.filter(row => !checkedRows.includes(row));

        if (checkedRows.length === 0) return;

        setData(newRow);
        setCheckedRows([]);
        setOriginalRows(newRow);
    };

    // 변경/추가 저장
    const saveRow = () => {
        setOriginalRows(data);
    }

    return (
        <>
            <SampleButton onClick={resetRow}>새로고침</SampleButton>
            <SampleButton onClick={addRow}>추가</SampleButton>
            <SampleButton onClick={removeRow}>삭제</SampleButton>
            <SampleButton onClick={saveRow}>저장</SampleButton>
            <div className='p-2 w-full h-screen' onClick={() => setOpenMenu(false)}>
                {openModal ? <SampleModal setOpenModal={setOpenModal} /> : null}
                {openMenu.flag ? <TableMenu left={openMenu.left} top={openMenu.top} setOpenModal={setOpenModal} /> : null}
                <DataTable
                    data={data}
                    columns={columns}
                    newRow={{ name: '', age: '', gender: '', city: '' }}
                />
            </div>
        </>
    );
};
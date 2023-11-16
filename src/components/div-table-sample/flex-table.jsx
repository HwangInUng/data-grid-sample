import { useState } from "react";
import tw, { styled } from "twin.macro";

const FlexTableWrapper = styled.div`
    ${tw`
        flex
        w-[500px]
        m-3
    `}
    flex-wrap: wrap;
`;

const FlexTableHeader = styled.div`
    display: flex;
    flex: 0 0 100%;

    .inner {
        border-top: 2px solid black;
        padding: 6px;
        text-align: center;
        font-weight: bold;
        background-color: beige;
    }
`;

const FlexTableBody = styled.div`
    display: flex;
    flex: 0 0 100%;
    
    &:hover{
        background-color: black;
        color: white;
    }
    `;

const FlexTableCell = styled.div`
    flex: 0 0 100px;
    padding: 0 6px;
    border: 1px solid black;
    box-sizing: border-box;
`;

export const FlexTable = () => {
    // 컬럼 정보에 대한 객체 배열을 생성
    // 해당 컬럼 정보의 target과 body에 노출할 value를 매핑
    // cell 속성을 부여하여 해당 컬럼에서 사용할 cell 속성을 정의
    const columns = [
        {},
    ];

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

    const onClick = (e) => {
        console.log(e.defaultPrevented);
    }

    return (
        <FlexTableWrapper>
            <FlexTableHeader>
                <FlexTableCell className="inner">check</FlexTableCell>
                {data[0] && Object.keys(data[0]).map((key, index) => {
                    return (
                        <FlexTableCell className="inner" key={index}>{key}</FlexTableCell>
                    );
                })}
            </FlexTableHeader>
            {data && data.map((row, index) => {
                return (
                    <FlexTableBody key={index}>
                        <FlexTableCell><input type="checkbox" /></FlexTableCell>
                        {
                            Object.keys(row).map((key, id) => {
                                return (
                                    <FlexTableCell
                                        key={id}
                                        onMouseDown={(e) => onClick(e)}
                                        onContextMenu={(e) => e.preventDefault()} // 마우스 우클릭 방지
                                    >
                                        {row[key]}
                                    </FlexTableCell>
                                );
                            })
                        }
                    </FlexTableBody>
                );
            })}
        </FlexTableWrapper>
    );
}
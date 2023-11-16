import tw, {styled} from "twin.macro";

const MenuBox = styled.div`
    width: 200px;
    background-color: white;
    border: 1px solid darkgray;

    left: ${props => props.left}px;
    top: ${props => props.top}px;
    position: absolute;
    z-index: 999;
`;

export const TableMenu = ({left, top}) => {
    return(
        <MenuBox left={left} top={top} onContextMenu={(e) => e.preventDefault()}>
            <div>열고정</div>
            <div>열고정 해제</div>
            <hr></hr>
            <div>필터</div>
            <div>필터해제</div>
            <hr></hr>
            <div>컬럼숨기기/보이기</div>
            <hr></hr>
            <div>새로고침</div>
        </MenuBox>
    );
};
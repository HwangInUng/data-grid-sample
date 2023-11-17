import tw, { styled } from "twin.macro";

const MenuBox = styled.div`
    width: 200px;
    background-color: white;
    border: 1px solid darkgray;

    left: ${props => props.left}px;
    top: ${props => props.top}px;
    position: absolute;
    z-index: 999;
`;

const MenuItem = styled.div`
    cursor: pointer;

    &:hover{
        background-color: lightgray;
    }
`;

export const TableMenu = ({ left, top, setOpenModal }) => {

    const onClick = () => {
        setOpenModal(true);
    }
    return (
        <MenuBox left={left} top={top} onContextMenu={(e) => e.preventDefault()}>
            <MenuItem onClick={onClick}>열고정</MenuItem>
            <MenuItem onClick={onClick}>열고정 해제</MenuItem>
            <hr></hr>
            <MenuItem>필터</MenuItem>
            <MenuItem>필터해제</MenuItem>
            <hr></hr>
            <MenuItem>컬럼숨기기/보이기</MenuItem>
            <hr></hr>
            <MenuItem>새로고침</MenuItem>
        </MenuBox>
    );
};
import tw, { styled } from "twin.macro";

const ModalBackground = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        w-screen
        h-screen
        absolute
    `}
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.7);
`

const ModalContentBox = styled.div`
    ${tw`
        bg-white
        border
        rounded-xl
        w-[400px]
        h-[400px]
    `}
    z-index: 999;
`;

/**
 * Modal에서 사용되는 조건은 메모리에서 분리
 * 컬럼도 현재 메모리에 로드된 객체의 key값을 확인하여 설정
*/

export const SampleModal = ({setOpenModal}) => {
    return (
        <ModalBackground>
            <ModalContentBox>
                <button onClick={() => setOpenModal(false)}>닫기</button>
            </ModalContentBox>
        </ModalBackground>
    );
}
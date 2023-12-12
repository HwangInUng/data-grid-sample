import tw, { styled } from "twin.macro";

const ContainerWrapper = styled.div`
  ${tw`
    w-full
    h-[35px]
    flex
    justify-between
    bg-white
  `}

  & div {
    ${tw`
      flex
      items-center
    `}
  }

  .info-box{
    ${tw`
      w-fit
      justify-start`
  }

    .title{
      ${tw`px-2 font-bold`}
    }
    .count-box{
      ${tw`
        text-sm
        text-slate-600
      `}
    }
    .count {
      ${tw`
        text-blue-500
        font-bold
        ml-2
      `}
    }
  }

  .button-box{
    ${tw`
      w-fit
      justify-end   
    `}
  }
`;

function ButtonContainer({ title, count, children }) {
  return (
    <ContainerWrapper>
      <div className="info-box">
        <div className="title">{title}</div>
        <div className="count-box">
          <span>전체</span>
          <span className="count">{count}</span>
          <span>건</span>
        </div>
      </div>
      <div className="button-box">
        {children}
      </div>
    </ContainerWrapper>
  );
};

export default ButtonContainer;
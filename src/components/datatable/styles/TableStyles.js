import tw, { styled } from 'twin.macro';

export const DataTableContainer = styled.div`
  ${tw`
    w-[1000px]
    h-screen
  `}
`;

export const DataTableToggleBox = styled.div`
  ${tw`
    w-full
    bg-white
    py-1
    flex
    justify-end
    gap-x-3
  `}
`;

export const DataTableScrollBox = styled.div`
  ${tw`
    w-full
    h-[600px]
    overflow-auto
  `}
`;

export const DataTable = styled.table`
  ${tw`
    w-full
    border-separate
    border-spacing-0
    text-[0.8rem]
  `}

  & thead{
    ${tw`
      sticky
      top-0
      z-10
      border
      bg-slate-50
    `}
  }

  & th, td{
    ${tw`
    `}
    /* border
    border-slate-200 */
  }
`;

export const DataTableHeader = styled.th`
    ${tw`
        relative
        font-bold
        pl-1
        `}
    height: ${props => props.height || 35}px;

    .content-box{
        ${tw`
            relative
            flex
            items-center
            justify-start
            text-blue-800
            m-auto
        `}
    }

    .required-icon{
        ${tw`
            absolute
            top-[-3px]
            left-[-3px]
            w-[15px]
            h-[15px]
            m-0
            p-0
            rotate-45
            text-red-600
        `}
    }

    .filter-icon{
        ${tw`
            p-0
            m-0
            w-[20px]
            h-[20px]
        `}
    }

    .filter-box {
        ${tw`
            absolute
            right-1
            border
            border-slate-400
            rounded-lg
            bg-white
            p-[3px]
            hover:bg-blue-950
            hover:text-white
        `}
    }
`;

export const DataTableCell = styled.td`
  ${tw`
    h-[35px]
    whitespace-nowrap
    overflow-hidden
    `}

  .cell-box{
    ${tw`
      flex
      items-center
      justify-start
      pl-1
    `}
  }
`;

export const DataTableInput = styled.input`
  ${tw`
    text-start
    w-fit
    outline-none
    invalid:border-red-500
    invalid:border
    rounded-lg
    p-0.5
  `}
`;

export const DataTableSelect = styled.select`
  ${tw`
    bg-slate-50
    border
    border-slate-300
    rounded-md
    outline-none
    p-0.5
  `}
`;

export const DataTableCheckbox = styled.input`
  ${tw`
    w-[15px]
    h-[15px]
    rounded-lg
    border
    border-slate-400
    outline-none
    cursor-pointer
  `}
`;

export const DataTableButton = styled.button`
  ${tw`
    rounded-lg
    w-full
    border
    border-slate-300
    bg-white
    text-center
    text-[0.8rem]
    p-0.5
    cursor-pointer
    transform
    duration-100
    whitespace-nowrap

    hover:border-slate-500
    hover:bg-blue-950
    hover:text-white
  `}
`;

export const DataTableValueBox = styled.span`
  ${tw`
    w-full
    h-full
    overflow-hidden
    whitespace-nowrap
    flex
    items-center
  `}
  /* justify-content: ${props => props.justify}; */
`;

export const InfoContainer = styled.div`
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
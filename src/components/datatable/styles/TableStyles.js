import tw, { styled } from 'twin.macro';

export const DataTableContainer = styled.div`
  ${tw`
    w-[1350px]
    h-screen
  `}
`;

// Table.jsx Style start
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
    w-[1350px]
    h-[580px]
    overflow-auto
    border
    border-slate-200
  `}
`;

export const DataTable = styled.table`
  ${tw`
    w-full
    border-separate
    border-spacing-0
    text-[0.8rem]
  `}

  & thead {
    ${tw`
      sticky
      top-0
      z-10
      border
      bg-slate-50
    `}
  }

  & th,
  td {
    ${tw`
    border-r
    border-b
    border-slate-200
    `}
  }
`;

export const DataTableCell = styled.td`
  ${tw`
    h-[35px]
    whitespace-nowrap
    overflow-hidden
    `}

  .cell-box {
    ${tw`
      flex
      items-center
      justify-start
      pl-1
    `}
  }
  & svg {
    ${tw`
      w-[15px]
      h-[15px]
    `}
  }
`;
// Table.jsx Style end

// TableHeader.jsx Style start
export const DataTableHeader = styled.th`
  ${tw`
        relative
        font-bold
        pl-1
        `}
  height: ${props => props.height || 30}px;

  .content-box {
    ${tw`
            relative
            flex
            items-center
            justify-start
            text-blue-800
            m-auto
        `}
  }

  .required-icon {
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

  .filter-icon {
    ${tw`
            p-0
            m-0
            w-[15px]
            h-[15px]
        `}
  }

  .filter-box {
    ${tw`
            absolute
            right-1
            rounded-[50%]
            bg-white
            p-[3px]
            hover:bg-blue-800
            hover:text-white
            cursor-pointer
        `}
  }
`;
// TableHeader.jsx Style end

// TableCell.jsx Style start
export const DataTableInput = styled.input`
  ${tw`
    text-start
    w-fit
    outline-none
    rounded-lg
    p-0.5
    transform
    duration-150

    invalid:bg-red-50
    invalid:border-red-500
    invalid:border
    focus:invalid:border-red-500
    focus:border
    focus:border-blue-300
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

    hover:bg-blue-800
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
  `}/* justify-content: ${props => props.justify}; */
`;
// TableCell.jsx Style end

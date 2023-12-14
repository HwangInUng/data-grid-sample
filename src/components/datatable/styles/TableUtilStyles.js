import tw, { styled } from 'twin.macro';

// HeaderFilter.jsx Style start
export const FilterWrapper = styled.div`
  ${tw`
        absolute
        w-[200px]
        bg-white
        border
        border-slate-400
        rounded-xl
        py-2
        px-2
        text-sm
        right-0
        z-20
    `}
`;

export const FilterInput = styled.input`
  ${tw`
        appearance-none
        border
        border-gray-400
        w-full
        h-[30px]
        outline-none
        rounded-lg
        px-2
        font-normal
        text-sm
    `}

  &:focus-visible {
    border: 1px solid gray;
  }
`;

export const SortBox = styled.div`
  ${tw`
        flex
        items-center
        mb-1
        hover:bg-slate-300
        rounded-md
        p-1
        cursor-pointer
    `}
`;

export const FilterListBox = styled.div`
  ${tw`
        p-1
        h-[150px]
        overflow-scroll
        text-sm
    `}

  & div {
    ${tw`
            flex
            items-center
        `}
  }

  .list-checkbox {
    ${tw`
            mr-2
            w-[15px]
            h-[15px]  
        `}
  }
`;
// HeaderFilter.jsx Style end

// InfoBox.jsx Style start
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

  .info-box {
    ${tw`
      w-fit
      justify-start`}

    .title {
      ${tw`px-2 font-bold`}
    }
    .count-box {
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

  .button-box {
    ${tw`
      w-fit
      justify-end   
    `}
  }
`;
// InfoBox.jsx Style end

// ToggleBox Style start
export const RefreshWrapper = styled.div`
  ${tw`
        rounded-[50%]
        bg-gray-500
        p-[2px]
        text-white
        transform duration-150
    `}

  &:hover {
    ${tw`
            bg-blue-800
        `}
    transform: scale(1.03);
  }

  .refresh-icon {
    width: 1.2em;
    height: 1.2em;
    cursor: pointer;
  }
`;

export const ToggleLabel = styled.label`
  ${tw`
        inline-flex
        items-center
        gap-[0.5rem]
        cursor-pointer
    `}

  &:hover {
    transition: transform 150ms linear;
    transform: scale(1.03);
  }
`;

export const ToggleInput = styled.input`
  ${tw`
    appearance-none
    relative
    w-[2.5em]
    h-[1.25em]
    cursor-pointer
  `}
  border: max(2px, 0.1em) solid gray;
  border-radius: 1.25em;
  background-color: gray;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: white;
    transition: left 250ms linear;
  }

  &:checked {
    ${tw`
        bg-blue-800
        border-blue-800
      `}
    &::before {
      background-color: white;
      left: 1.25em;
    }
  }

  &:disabled {
    border-color: lightgray;
    opacity: 0.7;
    cursor: not-allowed;
    &::before {
      border-color: lightgray;
    }

    & + span {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid darkblue;
  }

  &:enabled:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
`;
// ToggleBox Style end

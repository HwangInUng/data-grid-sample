import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import tw, { styled } from "twin.macro";
import { TableContext } from "../table-core/DataTableWrapper";
import { BiSolidAddToQueue, BiSolidEditAlt, BiSolidMinusSquare } from "react-icons/bi";

const StatusWrapper = styled.div`
    ${tw`
        flex
        justify-center
    `}

    & svg{
        ${tw`
            w-fit
            h-fit
        `}
    }
`;

export const StatusCell = memo(({ row }) => {
    const { matchingStatus } = useContext(TableContext);

    const result = useCallback(() => matchingStatus(row.original), [row]);

    const icons = {
        add: <BiSolidAddToQueue className="text-green-600" />,
        edit: <BiSolidEditAlt className="text-blue-600" />,
        remove: <BiSolidMinusSquare className="text-red-600" />
    };
    return (
        <StatusWrapper>
            {icons[result]}
        </StatusWrapper>
    );
});
import { useCallback, useContext, useEffect } from "react";
import tw, { styled } from "twin.macro";
import { DispatchContext } from "../table-core/DataTableWrapper";
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

const icons = {
    add: <BiSolidAddToQueue className="text-green-600" />,
    edit: <BiSolidEditAlt className="text-blue-600" />,
    remove: <BiSolidMinusSquare className="text-red-600" />
};

function StatusCell({ row }) {
    const { matchingStatus } = useContext(DispatchContext);
    const status = matchingStatus(row);
    if(row.id === 1) console.log(status);
    const Icon = () => icons[status];

    return (
        <StatusWrapper>
            <Icon />
        </StatusWrapper>
    );
};

export default StatusCell;
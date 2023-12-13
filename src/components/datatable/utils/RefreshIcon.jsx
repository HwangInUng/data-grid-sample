import { memo } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { RefreshWrapper } from '../styles/TableUtilStyles';

export const RefreshIcon = memo(({ onMouseDown }) => {
    return (
        <RefreshWrapper>
            <BiRefresh className="refresh-icon" onMouseDown={onMouseDown} />
        </RefreshWrapper>
    );
});
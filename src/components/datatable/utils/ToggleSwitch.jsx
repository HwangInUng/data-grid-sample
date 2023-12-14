import { memo, useCallback } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { ToggleLabel, ToggleInput } from '../styles/TableUtilStyles';

function ToggleSwitch({ title, onChange, flag }) {
  const icons = {
    search: <BiSearchAlt />,
  };

  const memoizedOnChange = useCallback(() => onChange(), [onChange]);
  return (
    <>
      <ToggleLabel>
        <span>{icons[title]}</span>
        <ToggleInput
          role='switch'
          type='checkbox'
          checked={flag}
          onChange={memoizedOnChange}
        />
      </ToggleLabel>
    </>
  );
}

export default memo(ToggleSwitch);

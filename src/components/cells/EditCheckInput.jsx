import { memo } from 'react';
import { CellCheckInput } from './CellCheckInput';

export const EditCheckInput = ({ value, onChange }) => {
  const handleCheck = (e) => {
    onChange(e.target.checked ? 'Y' : 'N');
  }
  return <CellCheckInput
    type='checkbox'
    value={value}
    onChange={handleCheck}
  />;
};
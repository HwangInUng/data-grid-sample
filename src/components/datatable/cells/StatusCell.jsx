import { memo } from "react";
import {
  BiSolidAddToQueue,
  BiSolidEditAlt,
  BiSolidMinusSquare
} from "react-icons/bi";

const icons = {
  add: <BiSolidAddToQueue className="text-green-600" />,
  update: <BiSolidEditAlt className="text-blue-600" />,
  delete: <BiSolidMinusSquare className="text-red-600" />
};

const isEqual = (prevProps, nextProps) => {
  return prevProps.row.original === nextProps.row.original;
}

function TestStatusCell({ row }) {
  const { original } = row;
  const Icon = () => icons[original.rowType];
  return (
    <>
      <Icon />
    </>
  );
};

export default memo(TestStatusCell, isEqual);
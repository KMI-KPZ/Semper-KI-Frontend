import React from "react";

interface SwitchProps {
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  onClick: (value?: "left" | "right") => void;
  value: boolean;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { leftChildren, onClick, rightChildren, value } = props;

  const handleOnClickSwitch = () => {
    onClick();
  };

  return (
    <div
      className="relative flex w-fit select-none flex-row flex-wrap items-center justify-center gap-2 bg-slate-200 p-1 hover:cursor-pointer "
      onClick={handleOnClickSwitch}
    >
      <div
        className={`p-1 transition duration-300 hover:cursor-pointer
        ${
          value === false
            ? "bg-türkis-800 text-white  hover:bg-grau-600"
            : "bg-slate-200 text-black  hover:bg-türkis-300"
        }`}
      >
        {leftChildren}
      </div>
      <div className={`absolute ${value === false ? "left-0" : "right-0"}`} />
      <div
        className={`p-1 transition duration-300 hover:cursor-pointer
        ${
          value === true
            ? "bg-türkis-800 text-white  hover:bg-grau-600"
            : "bg-slate-200 text-black  hover:bg-türkis-300"
        }`}
      >
        {rightChildren}
      </div>
    </div>
  );
};

export default Switch;

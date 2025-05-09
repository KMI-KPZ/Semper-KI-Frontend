import React from "react";

interface SwitchProps {
  onChange: (value: boolean) => void;
  value: boolean;
  variant?: "one" | "two";
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const { onChange, value } = props;

  const handelOnClick = () => {
    onChange(!value);
  };

  return (
    <div
      data-testid="switch-component"
      className={`relative h-8 w-14 rounded-full border-4 border-türkis-800 bg-slate-200 p-1 transition-all duration-300 hover:cursor-pointer hover:bg-slate-100`}
      onClick={handelOnClick}
    >
      <div
        className={`absolute h-4 w-4 rounded-full bg-türkis-800 transition-all duration-300 ${
          value ? "left-1" : "left-7"
        }`}
      />
    </div>
  );
};

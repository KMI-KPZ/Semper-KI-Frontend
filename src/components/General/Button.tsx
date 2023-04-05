import React from "react";

interface Props {
  active: boolean;
  text: string;
  icon: any;
  onClick(): void;
}

const Button: React.FC<Props> = (props) => {
  const { active } = props;

  return (
    <div className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer">
      Button
    </div>
  );
};

export default Button;

import React from "react";

interface Props {
  title: string;
}

const Button: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <div className=" text-white flex flex-row justify-center items-center w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
      {title}
    </div>
  );
};

export default Button;

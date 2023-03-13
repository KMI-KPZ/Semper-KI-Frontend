import React from "react";

interface Props {}

const Background: React.FC<Props> = (props) => {
  return (
    <div className="absolute brightness-125 opacity-20 grayscale -z-10 top-0 left-0 h-screen w-screen overflow-hidden">
      <img
        alt=""
        className="absolute h-4/5 -top-[10%] -left-[10%]"
        src={require("../../assets/images/Bubbles3_Trans.png")}
      />
      <img
        alt=""
        className="absolute h-4/6 -top-[10%] -right-[10%]"
        src={require("../../assets/images/Bubbles1_Trans.png")}
      />
      <img
        alt=""
        className="absolute h-1/2 -bottom-[20%] right-[30%]"
        src={require("../../assets/images/Bubbles2_Trans.png")}
      />
    </div>
  );
};

export default Background;

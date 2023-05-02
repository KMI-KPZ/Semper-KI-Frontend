import React from "react";

interface Props {}

const Background: React.FC<Props> = (props) => {
  return (
    <div
      className="fixed -z-10 grayscale-[30%] brightness-125
     bg-gradient-to-tr from-türkis-800 to-blau-800
     top-0 left-0 h-full w-full overflow-hidden min-h-[200px]
     "
    >
      <div className="hidden opacity-10 grayscale-[40%] w-full h-full ">
        <img
          alt=""
          className="absolute h-1/6 md:h-2/6 lg:h-3/6 xl:h-4/5 -top-[10%] -left-[10%]"
          src={require("../../assets/images/Bubbles3_Trans.png")}
        />
        <img
          alt=""
          className="absolute h-1/6 md:h-2/6 lg:h-3/6 xl:h-4/6 top-20 xl:-top-[10%] -right-[10%]"
          src={require("../../assets/images/Bubbles1_Trans.png")}
        />
        <img
          alt=""
          className="hidden xl:block absolute h-1/2 -bottom-[20%] right-[30%]"
          src={require("../../assets/images/Bubbles2_Trans.png")}
        />
      </div>
    </div>
  );
};

export default Background;

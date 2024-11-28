import React from "react";
import HeroImg from "@images/Hero_16_9.png";

interface HomeBackgroundProps {}

const HomeBackground: React.FC<HomeBackgroundProps> = (props) => {
  const {} = props;

  return (
    <>
      <div
        className="bg-start absolute left-0 top-0 h-screen w-full bg-cover bg-fixed bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url('${HeroImg}')`,
        }}
      />
      <div className="absolute left-0 top-0 h-screen w-full bg-gradient-to-b from-transparent to-ultramarinblau-dark to-90% " />
    </>
  );
};

export default HomeBackground;

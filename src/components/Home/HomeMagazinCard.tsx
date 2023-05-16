import React from "react";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}
const HomeMagazinCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";

  return (
    <Link
      className={` ${additionalClassNames}
        bg-türkis-800 hover:bg-türkis-700 
        duration-500 p-3
        flex justify-center items-center select-none 
        group relative
    `}
      to="https://infai.4imedia.com/"
    >
      <h2 className="font-bold text-5xl tracking-wider text-white z-10">
        MAGAZIN
      </h2>
      <img
        className="absolute felx w-full h-full object-cover duration-500 opacity-0 group-hover:opacity-50"
        src={require("../../assets/images/Bubbles_snip.PNG")}
      />
    </Link>
  );
};

export default HomeMagazinCard;

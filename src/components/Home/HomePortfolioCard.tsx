import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

type State = {
  user: "client" | "contractor";
};

const HomePortfolioCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const [state, setState] = useState<State>({ user: "client" });
  const { user } = state;

  const handleOnClickSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      user: prevState.user === "client" ? "contractor" : "client",
    }));
  };

  return (
    <div
      className={`${additionalClassNames}  p-3 flex flex-col justify-between items-center gap-5`}
    >
      <div className="flex flex-col gap-3 w-full items-center overflow-clip">
        <h2>Unser Portfolio</h2>
        <div
          className={`relative flex flex-row gap-5 overflow-clip w-full h-60`}
        >
          <div
            className={`absolute flex flex-col w-full overflow-clip gap-3 duration-300 ${
              user === "client" ? "left-0" : "-left-[200%]"
            }`}
          >
            <Link to="/portfolio">{`>`} Informieren über 3D-Druck</Link>
            <Link to="/portfolio">{`>`} Teil herstellen lasssen</Link>
            <Link to="/portfolio">{`>`} Modell entwerfen lasssen</Link>
            <Link to="/portfolio">{`>`} Gesamtprozess begleiten lasssen</Link>
          </div>
          <div
            className={`absolute flex flex-col w-full overflow-clip gap-3 duration-300 ${
              user === "client" ? "left-[200%]" : "left-0"
            }`}
          >
            <Link to="/portfolio">{`>`} Teile herstellen</Link>
            <Link to="/portfolio">{`>`} Modelle entwerfen</Link>
            <Link to="/portfolio">{`>`} Gesamtprozesse begleiten</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        <div className="border-t-2 w-full" />
        <div
          className="relative flex flex-row justify-between items-center bg-türkis-300 hover:cursor-pointer rounded-2xl overflow-clip select-none p-1"
          onClick={handleOnClickSwitch}
        >
          <span
            className={`py-1 px-3 duration-300 rounded-2xl
        ${user === "client" ? "bg-türkis-300" : "bg-türkis-800 text-white"}`}
          >
            Für Autraggeber
          </span>
          <div
            className={`absolute ${user === "client" ? "left-0" : "right-0"}`}
          />
          <span
            className={`py-1 px-3 duration-300 rounded-2xl
        ${user === "client" ? "bg-türkis-800 text-white" : "bg-türkis-300"}`}
          >
            Für Anbieter
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePortfolioCard;

import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../General/Button";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

type SearchTextData = {
  text: string;
  side: "left" | "right";
};

interface State {
  text: string;
  searchTexts: SearchTextData[];
}

const HomeSearchCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();
  const [state, setState] = useState<State>({ searchTexts: [], text: "" });
  const { text, searchTexts } = state;
  const sendText = () => {
    setState((prevState) => ({
      ...prevState,
      searchTexts: [
        ...prevState.searchTexts,
        { text: prevState.text, side: "right" },
        { text: "ChatBot Answer", side: "left" },
      ],
      text: "",
    }));
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendText();
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, text: e.target.value }));
  };

  return (
    <div
      className={`${additionalClassNames}  p-3 flex flex-col justify-center items-center gap-5 `}
    >
      {/* {searchTexts.length > 0 ? (
        <div className="flex flex-col-reverse justify-center gap-5 w-full px-10 max-h-80 overflow-y-auto">
          {searchTexts
            .slice(0)
            .reverse()
            .map((searchText, index) => (
              <div
                className={`${
                  searchText.side === "right" ? "text-right" : "text-left"
                }`}
                key={index}
              >
                {searchText.text}
              </div>
            ))}
        </div>
      ) : null} */}
      <div className="flex flex-row justify-center items-center gap-5 w-full">
        <div className="w-4/5 flex items-center justify-center">
          <input
            value={text}
            type="text"
            className="p-3 border-2 w-full"
            placeholder={t("Home.HomeSearchCard.placeholder")}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
        </div>
        <div className="w-1/5 md:w-fit flex items-center justify-center">
          <Button icon={<SearchIcon />} onClick={sendText}></Button>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchCard;

import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@component-library/Button";
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
      className={`${additionalClassNames}  flex flex-col items-center justify-center gap-5 p-3 `}
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
      <div className="flex w-full flex-row items-center justify-center gap-5">
        <div className="flex w-4/5 items-center justify-center">
          <input
            value={text}
            type="text"
            className="w-full border-2 p-3"
            placeholder={t("Home.HomeSearchCard.placeholder")}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
        </div>
        <div className="flex w-1/5 items-center justify-center md:w-fit">
          <Button
            title={t("Home.components.SearchCard.search")}
            children={<SearchIcon />}
            onClick={sendText}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSearchCard;

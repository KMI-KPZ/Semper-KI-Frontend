import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button} from "@component-library/Button";
import {getSessionData, setPlayData} from "@/pages/Demonstrator/demonstrator_persists";
import {twMerge} from "tailwind-merge";
import {Text} from "@component-library/Typography";
import {gameVersion, PageNames, PlayData} from "@/pages/Demonstrator/demonstrator_types";
import DemonstratorBandit from "@/pages/Demonstrator/components/DemonstratorBandit";
import DemonstratorEnd from "@/pages/Demonstrator/components/DemonstratorEnd";
import DemonstratorOops from "@/pages/Demonstrator/components/DemonstratorOops";
import DemonstratorChat from "@/pages/Demonstrator/components/DemonstratorChat";

export function nextPage(pageResult:string|null, setPlayDataState: Dispatch<SetStateAction<PlayData>>) {
    if (pageResult == null){
        return;
    }
    const d = getSessionData();
    switch (d.pageName) {
        case PageNames.BANDIT:
            d.pageName = PageNames.CHAT;
            d.pageResult[d.pageResult.length] = pageResult;
            break;
        case PageNames.CHAT:
            d.pageName = PageNames.END;
            d.pageResult[d.pageResult.length] = pageResult;
            break;
        case PageNames.END:
            d.pageName = PageNames.END;
            break;
        default:
            break;
    }
    setPlayData(d, setPlayDataState)
}

export function resetGame(setPlayDataState: Dispatch<SetStateAction<PlayData>>) {
    const playData:PlayData = {
        gameVersion: gameVersion,
        pageName: PageNames.BANDIT,
        pageResult: [],
    }
    setPlayData(playData, setPlayDataState);
}


const DemonstratorControl: React.FC = () => {
    const [currentPlayData, setPlayData] = useState<PlayData>({gameVersion: "1.0", pageName: PageNames.BANDIT, pageResult:[]});

    useEffect(() => {
        // on page load
    }, []);

    let result:string|null = null;
    const updateCode = (resultFromPage:string|null) => {
        result = resultFromPage;
    };

    let demoPage;
    switch (currentPlayData.pageName) {
        case PageNames.BANDIT:
            demoPage = <DemonstratorBandit playData={currentPlayData} updatePageResult={updateCode}/>;
            break;
        case PageNames.CHAT:
            demoPage = <DemonstratorChat playData={currentPlayData} updatePageResult={updateCode}/>;
            break;
        case PageNames.END:
            demoPage = <DemonstratorEnd playData={currentPlayData} updatePageResult={updateCode}/>;
            break;
        default:
            demoPage = <DemonstratorOops playData={currentPlayData} updatePageResult={updateCode}/>;
            break;
    }

    return (
        <div className="flex h-full w-full flex-grow flex-col justify-center">
            <main className="flex h-full w-full flex-grow flex-col items-center justify-start">
                {demoPage}
            </main>
            <footer className={twMerge(`flex w-8/12 flex-nowrap flex-row items-center m-auto justify-around p-3 rounded-md bg-transparent
                bg-white bg-opacity-20`
            )}>
                <Button title={"Next"} onClick={() => nextPage(result, setPlayData)}></Button>
                <Button title={"reset"} onClick={() => resetGame(setPlayData)}></Button>
                <Text className={"text-amber-500"} variant="body">{JSON.stringify(currentPlayData.pageResult)}</Text>
            </footer>
        </div>
    );
};
export default DemonstratorControl;
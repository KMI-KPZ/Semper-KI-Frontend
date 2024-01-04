import React, {useEffect, useState} from 'react';
import LogoURL from '@images/logo192.png';
import Background from '@/components/Background';
import {Text} from '@component-library/Typography';
import PlayForm from './components/PlayForm';
import {Button} from "@component-library/Button";
import DemonstratorPage1 from "@/pages/Demonstrator/components/DemonstratorPage1";
import DemonstratorPage2 from "@/pages/Demonstrator/components/DemonstratorPage2";
import DemonstratorPageEnd from "@/pages/Demonstrator/components/DemonstratorPageEnd";

interface IPlayData {
    page: number;
    counter: number;
}
const renderHomeButton: JSX.Element = (
    <div className="group flex flex-row items-center gap-3 p-2 duration-300 hover:cursor-pointer hover:text-türkis ">
        <img className="h-8 duration-300 group-hover:scale-110  md:h-10" data-testid="logo" src={LogoURL} alt="Kiss Logo"/>
        <div className=" flex flex-col items-end justify-start text-inherit">
            <Text variant="custom" className="text-2xl font-bold text-[#263652] xs:text-3xl md:text-4xl">{"Play Semper"}</Text>
        </div>
    </div>
);
function getSesionData() {
    let sd = sessionStorage.getItem("play_data");
    let playData: IPlayData;
    if (sd === null) {
        playData = {
            page: 1,
            counter: 1
        }
    } else {
        playData = JSON.parse(sd);
    }
    return playData;
}

const Demonstrator: React.FC = () => {
    const [currentPlayData, setPlayData] = useState<IPlayData>({counter: 1, page: 1});
    function setSessionData(playData:IPlayData) {
        sessionStorage.setItem("play_data", JSON.stringify(playData));
        setPlayData(playData);
    }
    function raiseCounter() {
        const playData = getSesionData();
        playData.counter++;
        setSessionData(playData)
    }
    function nextPage() {
        const playData = getSesionData();
        playData.page++;
        setSessionData(playData)
    }
    function resetGame() {
        setSessionData( {
            page: 1,
            counter: 1
        })
    }
    useEffect(() => {
        raiseCounter();
    }, []);  // on page load

    let demoPage;
    switch (currentPlayData.page) {
        case 1:
            demoPage = <DemonstratorPage1 playData={currentPlayData}/>;
            break;
        case 2:
            demoPage = <DemonstratorPage2 playData={currentPlayData}/>;
            break;
        default:
            demoPage = <DemonstratorPageEnd playData={currentPlayData}/>;
            break;
    }

    return (
        <div>
            <div className={`flex min-h-screen flex-col items-center justify-center overflow-x-auto font-ptsans text-base`}
                data-testid="demo" id="demo">
                <header data-testid="header"
                        className="flex w-full flex-row items-center justify-between bg-white p-1 shadow-lg">
                    <nav>{renderHomeButton}</nav>
                </header>

                {demoPage}

                <Button title={"Next"} onClick={nextPage}></Button>
                <Button title={"reset"} onClick={resetGame}></Button>
            </div>
            <Background/>
        </div>
    );
};
export default Demonstrator;
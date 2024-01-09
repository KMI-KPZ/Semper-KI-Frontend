import React from 'react';
import Background from '@/components/Background';
import LogoURL from "@images/logo192.png";
import {Text} from "@component-library/Typography";
import DemonstratorControl from "@/pages/Demonstrator/DemonstratorControl";
import {twMerge} from "tailwind-merge";

const DemonstratorApp: React.FC = () => {

    return (
        <div>
            <div
                className={`flex min-h-screen flex-col items-center justify-center overflow-x-auto font-ptsans text-base`}
                data-testid="demo"
                id="demo">
                <header data-testid="header"
                        className="flex w-full flex-row items-center justify-between bg-white p-1 shadow-lg">
                    <nav>
                        <div
                            className="group flex flex-row items-center gap-3 p-2 duration-300 hover:cursor-pointer hover:text-türkis ">
                            <img className="h-8 duration-300 group-hover:scale-110  md:h-10" data-testid="logo"
                                 src={LogoURL}
                                 alt="Kiss Logo"/>
                            <div className=" flex flex-col items-end justify-start text-inherit">
                                <Text variant="custom"
                                      className="text-2xl font-bold text-[#263652] xs:text-3xl md:text-4xl">{"Play Semper"}</Text>
                            </div>
                        </div>
                    </nav>
                </header>
               <DemonstratorControl/>
            </div>
            <Background/>
        </div>
    );
};
export default DemonstratorApp;
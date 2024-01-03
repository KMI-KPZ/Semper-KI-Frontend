import Background from "@/components/Background";
import React from "react";
import {NavigationItemData} from "@/data/navigation";
import {UserType} from "@/hooks/useUser";
import LogoURL from "@images/logo192.png";
import {Text} from "@component-library/Typography";
import {useTranslation} from "react-i18next";


const Demonstrator: React.FC = () => {
    const { t, i18n } = useTranslation();

    const renderHomeButton: JSX.Element = (
        <div className="group flex flex-row items-center gap-3 p-2 duration-300 hover:cursor-pointer hover:text-türkis ">
            <img
                className="h-8 duration-300 group-hover:scale-110  md:h-10"
                data-testid="logo"
                src={LogoURL}
                alt="Kiss Logo"
            />
            <div className=" flex flex-col items-end justify-start text-inherit">
                <Text
                    variant="custom"
                    className="text-2xl font-bold text-[#263652] xs:text-3xl md:text-4xl"
                >
                    {"Semper-Demonstator"}
                </Text>
            </div>
        </div>
    );

    return (
        <div>
            <div
                className={`flex min-h-screen flex-col items-center justify-center overflow-x-auto font-ptsans text-base`}
                data-testid="app"
                id="app"
            >
                <header data-testid="header" className="flex w-full flex-row items-center justify-between bg-white p-1 shadow-lg">
                    <nav>{renderHomeButton}</nav>
                </header>

                <main className="flex h-full w-full flex-grow flex-col items-center justify-startn ">

                    This is a Demonstrator

                </main>
            </div>
            <Background/>
        </div>
    );
};

export default Demonstrator;

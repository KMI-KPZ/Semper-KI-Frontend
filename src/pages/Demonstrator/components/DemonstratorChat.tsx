import React from "react";
import {BanditValues, DemonstratorProps} from "@/pages/Demonstrator/demonstrator_types";
import {Button} from "@component-library/Button";

const DemonstratorChat: React.FC<DemonstratorProps> = (props) => {
    const {} = props;

    props.updatePageResult(null);
    const banditCode = props.playData.pageResult[0];

    const knowledge = BanditValues.Knowledge[banditCode[0]];
    const persona = BanditValues.Persona[banditCode[1]];
    const model = BanditValues.Model[banditCode[2]];
    const network = BanditValues.Network[banditCode[3]];

    return (
        <div className="flex h-full w-full flex-grow flex-row items-left justify-start">
            <div
                className={"flex h-full w-8/12 min-w-[900] flex-col items-center justify-center p-3  md:flex-row bg-red-400"}>

            </div>
            <div
                className={"flex h-full w-4/12 max-w-7xl flex-col items-center justify-center p-3 md:flex-row bg-red-500"}>

            </div>
            <div className={"bg-white p-30 text-türkis-600"}>CHAT mit </div>
            <div className={"bg-white p-30 text-türkis-600"}>knowledge: {knowledge}</div>
            <div className={"bg-white p-30 text-türkis-600"}>persona: {persona}</div>
            <div className={"bg-white p-30 text-türkis-600"}> model: {model}</div>
            <div className={"bg-white p-30 text-türkis-600"}> network: {network}</div>
            <Button title={"set active"} onClick={() => props.updatePageResult("c")}></Button>
        </div>
    );
};
export default DemonstratorChat;

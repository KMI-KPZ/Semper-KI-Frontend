import React from "react";
import {BanditValues, DemonstratorProps} from "@/pages/Demonstrator/demonstrator_types";
import {Button} from "@component-library/Button";
import {nextPage} from "@/pages/Demonstrator/DemonstratorControl";
import {twMerge} from "tailwind-merge";


const DemonstratorBandit: React.FC<DemonstratorProps> = (props) => {
    const {} = props;

    // init page result (null means no next page possible)
    props.updatePageResult(null);

    const code={
        "Knowledge": "1",
        "Persona": "1",
        "Model": "1",
        "Network": "1",
    }
    const updatePageResult = (column:string, key: string) => {
        switch (column){
            case "Knowledge": code["Knowledge"]=key;break;
            case "Persona": code["Persona"]=key;break;
            case "Model": code["Model"]=key;break;
            case "Network": code["Network"]=key;break;
        }
        props.updatePageResult(code["Knowledge"]+code["Persona"]+code["Model"]+code["Network"]);
    };

    return (
        <div className={twMerge(
            `flex flex-grow h-full w-8/12 flex-col justify-center rounded-s bg-transparent bg-türkis-400 bg-opacity-80 m-5`)}>
            <div className={"flex flex-grow flex-row p-5 text-center"}>
                <div className={"flex flex-grow w-1/4 flex-col p-2 bg-türkis-900"}>
                    <div className="flex-grow bg-red-200" onClick={() => updatePageResult("Knowledge", "1")}>{BanditValues.Knowledge["1"]}</div>
                    <div className="flex-grow bg-red-300" onClick={() => updatePageResult("Knowledge","2")}>{BanditValues.Knowledge["2"]}</div>
                    <div className="flex-grow bg-red-400" onClick={() => updatePageResult("Knowledge","3")}>{BanditValues.Knowledge["3"]}</div>
                    <div className="flex-grow bg-red-500" onClick={() => updatePageResult("Knowledge","4")}>{BanditValues.Knowledge["4"]}</div>
                    <div className="flex-grow bg-red-600" onClick={() => updatePageResult("Knowledge","5")}>{BanditValues.Knowledge["5"]}</div>
                </div>
                <div className={"flex  flex-grow w-1/4  flex-col p-2 bg-türkis-800"}>
                    <div className="flex-grow bg-green-200" onClick={() => updatePageResult("Persona","1")}>{BanditValues.Persona["1"]}</div>
                    <div className="flex-grow bg-green-300" onClick={() => updatePageResult("Persona","2")}>{BanditValues.Persona["2"]}</div>
                    <div className="flex-grow bg-green-400" onClick={() => updatePageResult("Persona","3")}>{BanditValues.Persona["3"]}</div>
                    <div className="flex-grow bg-green-500" onClick={() => updatePageResult("Persona","4")}>{BanditValues.Persona["4"]}</div>
                    <div className="flex-grow bg-green-600" onClick={() => updatePageResult("Persona","5")}>{BanditValues.Persona["5"]}</div>
                </div>
                <div className={"flex flex-grow w-1/4 flex-col  p-2 bg-türkis-900"}>
                    <div className="flex-grow bg-blue-200" onClick={() => updatePageResult("Model","1")}>{BanditValues.Model["1"]}</div>
                    <div className="flex-grow bg-blue-300" onClick={() => updatePageResult("Model","2")}>{BanditValues.Model["2"]}</div>
                    <div className="flex-grow bg-blue-400" onClick={() => updatePageResult("Model","3")}>{BanditValues.Model["3"]}</div>
                    <div className="flex-grow bg-blue-500" onClick={() => updatePageResult("Model","4")}>{BanditValues.Model["4"]}</div>
                    <div className="flex-grow bg-blue-600" onClick={() => updatePageResult("Model","5")}>{BanditValues.Model["5"]}</div>
                </div>
                <div className={"flex flex-grow w-1/4 flex-col p-2 bg-türkis-800"}>
                    <div className="flex-grow bg-grau-200" onClick={() => updatePageResult("Network", "1")}>{BanditValues.Network["1"]}</div>
                    <div className="flex-grow bg-grau-300" onClick={() => updatePageResult("Network", "2")}>{BanditValues.Network["2"]}</div>
                    <div className="flex-grow bg-grau-400" onClick={() => updatePageResult("Network", "3")}>{BanditValues.Network["3"]}</div>
                    <div className="flex-grow bg-grau-500" onClick={() => updatePageResult("Network", "4")}>{BanditValues.Network["4"]}</div>
                    <div className="flex-grow bg-grau-600" onClick={() => updatePageResult("Network", "5")}>{BanditValues.Network["5"]}</div>
                </div>
            </div>
        </div>
    );
};
export default DemonstratorBandit;
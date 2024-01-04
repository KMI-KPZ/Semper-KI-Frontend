import React from "react";
import PlayForm from "@/pages/Demonstrator/components/PlayForm";

interface IPlayData {
    page: number;
    counter: number;
}
interface Props {
  playData: IPlayData
}

const DemonstratorPage1: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <main className="flex h-full w-full flex-grow flex-row-reverse items-left justify-start">
            <div
                className={"flex h-full w-8/12 min-w-[900] flex-col items-center justify-center p-3  md:flex-row bg-red-400"}>
                <PlayForm data={"testdatastring"}/>
            </div>
            <div
                className={"flex h-full w-4/12 max-w-7xl flex-col items-center justify-center p-3 md:flex-row bg-red-500"}>
                <PlayForm data={"test: " + props.playData.counter + ""}/>
            </div>
        </main>
    );
};
export default DemonstratorPage1;

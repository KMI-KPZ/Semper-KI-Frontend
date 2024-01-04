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
        <main className="flex h-full w-full flex-grow flex-col items-left justify-center items-center">
           <div className={"bg-white p-30"}>End</div>
        </main>
    );
};
export default DemonstratorPage1;
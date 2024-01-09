import React from "react";
import {DemonstratorProps} from "@/pages/Demonstrator/demonstrator_types";
import {twMerge} from "tailwind-merge";
import {Button} from "@component-library/Button";

const DemonstratorEnd: React.FC<DemonstratorProps> = (props) => {
    const {} = props;

    props.updatePageResult(null);

    return (
        <div
            className={twMerge(`flex w-8/12 flex-nowrap flex-row items-center m-auto justify-around p-3 rounded-md bg-transparent bg-white bg-opacity-20`)}>

            <div className={"bg-white p-30"}>End</div>
            <Button title={"set active"} onClick={() =>  props.updatePageResult("e")}></Button>
        </div>
    );
};
export default DemonstratorEnd;
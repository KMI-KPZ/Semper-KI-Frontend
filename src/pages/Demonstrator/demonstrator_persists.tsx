import {Dispatch, SetStateAction} from "react";
import {gameVersion, PageNames, PlayData} from "@/pages/Demonstrator/demonstrator_types";

const sessionStorageKey = "play_data";

export function getSessionData() {
    let sd = sessionStorage.getItem(sessionStorageKey);
    let data: PlayData;
    if (sd === null) {
        data = {
            gameVersion: gameVersion,
            pageName: PageNames.BANDIT,
            pageResult: [],
        };
    } else {
        data = JSON.parse(sd);
    }
    return data;
}

export function setPlayData(data: PlayData, setPlayDataState: Dispatch<SetStateAction<PlayData>>) {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
    setPlayDataState(data);
}
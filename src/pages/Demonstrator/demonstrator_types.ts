export const gameVersion = "1.0";
export enum PageNames {
    BANDIT = "BANDIT",
    CHAT = "CHAT",
    END = "END"
}

export type PlayData = {
    gameVersion: string;
    pageName: PageNames;
    pageResult: string[];
}
export type DemonstratorProps = {
    playData: PlayData
    updatePageResult: (arg: string|null) => void
}


export const BanditValues = {
    Knowledge: {
        "1" : "Allgemeines chatGPT-4 Wissen",
        "2" : "experimentell",
        "3" : "semantischer Graph der Forschung",
        "4" : "semantischer Graph der M",
        "5" : "semantischer Graph der AM",
    },
    Persona: {
        "1" : "Messebesucher",
        "2" : "Facharzt",
        "3" : "Industrieller Einkäufer",
        "4" : "Designer",
        "5" : "Forscher",
    },
    Model: {
        "1" : "Scheibenwischer",
        "2" : "7-Kantschraube",
        "3" : "Schlüsselanhänger",
        "4" : "Lampe",
        "5" : "Kanüle",
    },
    Network: {
        "1" : "Institutsdrucker",
        "2" : "Druckerfarm",
        "3" : "5 Große Firmen",
        "4" : "Alle",
        "5" : "1 Demonstrationsdrucker",
    },
}



import React, { createContext, useContext, useState, ReactNode } from "react";

interface TopicsContextType {
  topics: Map<string, string>;
  maintopic: string;
  response: string;
  choices: object;
  userChoice: string | null;
  setTopics: (
    newTopics: Map<string, string>,
    newMainTopic: string,
    responseStructure: string,
    newChoices: object,
    addedHelp: Map<string, string> | null
  ) => void;
  setUserChoice: (choice: string | null) => void;
  closeChatbot: boolean;
  removeTopics: (topicsToRemove: string[]) => void;
  detailedHelp: Map<string, string>;
  // removeTopics: (topicsToRemove: string[]) => void;
}

// const arraysEqual = (a: string[], b: string[]) => {
//   if (a === undefined) {
//     a = [];
//   }

//   if (b === undefined) {
//     b = [];
//   }
//   if (a.length !== b.length) return false;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// };

function objectsEqual(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

// check if a Map<string,string> is equal
// function mapsEqual(
//   map1: Map<string, string>,
//   map2: Map<string, string>
// ): boolean {
//   if (map1.size !== map2.size) {
//     return false;
//   }

//   for (const [key, val] of map1) {
//     if (map2.get(key) !== val) {
//       return false;
//     }
//   }

//   return true;
// }

function formatTopicsToJSON(topics: Map<string, string>): string {
  const formattedTopics: Array<{ key: string; help_intro: string }> = [];
  topics.forEach((value, key) => {
    formattedTopics.push({ key, help_intro: value });
  });
  return JSON.stringify(formattedTopics);
}
const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

const TopicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const logger: boolean = false;
  const [topics, setTopicsState] = useState<Map<string, string>>(
    new Map([["semper-ki", "Plattform für additive Fertigung"]])
  );
  const [maintopic, setMaintopicState] = useState<string>("Semper-KI");
  const [response, setResponseStructureState] = useState<string>("{}");
  const [choices, setChoices] = useState<object>({});
  const [userChoice, setUserChoiceState] = useState<string | null>(null);
  const [closeChatbot, _] = useState<boolean>(false);
  const [detailedHelp, setDetailedHelp] = useState<Map<string, string>>(
    new Map([
      [
        "semper-ki",
        "Wir vermitteln, was Sie brauchen\n" +
          "Wir machen 3D-Druck für alle nutzbar. Unser Ziel ist, Kunden zu vernetzen - so früh wie nötig und so gut wie möglich. Für jedes Produkt erzeugen wir eine individuell angepasste Produktionsstrategie. Dazu gehören vorgelagerte Services wie Modellerstellung und Materialberatung genauso wie die Vermittlung von Nachbearbeitung oder Rechtsberatung. Der Druck findet beim optimalen Partner statt. Für all das setzen wir auf KI-Technologien. Gefördert vom Bundesministerium für Wirtschaft und Klimaschutz.\n" +
          "Mit KI zum 3D-Druck\n" +
          "Kern unserer Plattform sind Künstliche Intelligenzen. Diese Technologien haben wir speziell für die Vernetzung von Kunden mit der 3D-Druck-Branche entwickelt. Unsere KI ist ein semantisches Netz. In dieses Netz speisen wir Informationen über alle verfügbaren 3D-Druck-Prozesse ein. In Kombination mit den Anfragen, die auf der Plattform eingehen, ermitteln unsere KI-Technologien daraus die optimale Produktionsstrategie.",
      ],
    ])
  );

  const setTopics = (
    newTopics: Map<string, string>,
    newMainTopic: string,
    responseStructure: string,
    newChoices: object,
    addedHelp: Map<string, string> | null
  ) => {
    setTopicsState((prevTopics) => {
      // merge prev topics and new topics uniquely and return the old array if nothing changed, the new one otherwise
      const mergedTopics = new Map([
        ...Array.from(prevTopics.entries()),
        ...Array.from(newTopics.entries()),
      ]);
      if (logger)
        console.log("mergedTopics: ", formatTopicsToJSON(mergedTopics));
      if (logger) console.log("prevTopics: ", formatTopicsToJSON(prevTopics));
      return mergedTopics.size === prevTopics.size ? prevTopics : mergedTopics;
    });
    setMaintopicState(newMainTopic);
    setResponseStructureState(responseStructure);
    if (logger) console.log("choices: " + newChoices);
    setChoices((prevChoices) => {
      if (!newChoices) {
        newChoices = {};
      }
      if (logger) console.log("newChoices: " + newChoices);
      return objectsEqual(newChoices, prevChoices) ? prevChoices : newChoices;
    });
    setDetailedHelp((prevHelp) => {
      if (!addedHelp) {
        return prevHelp;
      }
      const mergedHelp = new Map([
        ...Array.from(prevHelp.entries()),
        ...Array.from(addedHelp.entries()),
      ]);
      // lower case every key
      mergedHelp.forEach((value, key) => {
        mergedHelp.set(key.toLowerCase(), value);
      });
      if (logger) console.log("mergedHelp: ", mergedHelp);
      return mergedHelp.size === prevHelp.size ? prevHelp : mergedHelp;
    });
  };

  const setUserChoice = (choice: string | null) => {
    if (choice === null || choices.hasOwnProperty(choice)) {
      setUserChoiceState(choice);
      // setCloseChatbot(true);
    } else {
      throw new Error("Invalid choice: " + choice);
    }
  };

  const removeTopics = (topicsToRemove: string[]) => {
    setTopicsState((prevTopics) => {
      for (let key in topicsToRemove.keys())
        if (prevTopics.has(key)) {
          prevTopics.delete(key);
        }
      return prevTopics;
    });
  };

  return (
    <TopicsContext.Provider
      value={{
        topics,
        maintopic,
        response,
        choices,
        userChoice,
        setTopics,
        setUserChoice,
        closeChatbot,
        removeTopics,
        detailedHelp,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
};

const useTopics = (): TopicsContextType => {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error("useTopics must be used within a TopicsProvider");
  }
  return context;
};

export { TopicsProvider, useTopics };

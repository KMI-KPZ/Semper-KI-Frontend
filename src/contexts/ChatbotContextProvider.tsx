import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TopicsContextType {
  topics: string[];
  maintopic: string;
  addTopics: (newTopics: string[]) => void;
  removeTopics: (topicsToRemove: string[]) => void;
  setMainTopic: (topic: string) => void;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

const TopicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<string[]>(["Semper-KI"]);
  const [maintopic, setMaintopic] = useState<string>("Semper-KI");
  const addTopics = (newTopics: string[]) => {
    setTopics((prevTopics) => {
      // merge prev topics and new topics uniquely and return the old array if nothing changed, the new one otherwise
        const mergedTopics = Array.from(new Set([...prevTopics, ...newTopics]));
        return mergedTopics.length === prevTopics.length ? prevTopics : mergedTopics;
    });
  };

  const removeTopics = (topicsToRemove: string[]) => {
    setTopics((prevTopics) => prevTopics.filter(topic => !topicsToRemove.includes(topic)));
    // Hintergrundoperationen hier hinzufügen
  };

  const setMainTopic = (topic: string) => {
    setMaintopic(topic);
  }

  return (
      <TopicsContext.Provider value={{ topics, maintopic, addTopics, removeTopics, setMainTopic }}>
        {children}
      </TopicsContext.Provider>
  );
};

const useTopics = (): TopicsContextType => {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
};

export { TopicsProvider, useTopics };

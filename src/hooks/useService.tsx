import React, { useEffect, useState } from "react";
import { IService, IServiceChapter } from "../components/Service/Interface";
import _Services from "./Data/Services.json";
const Services = _Services as IService[];

interface ReturnProps {
  serviceChapters: IServiceChapter[];
  loadService(title: string): void;
}

const useService = (): ReturnProps => {
  const [serviceChapters, setServiceChapters] = useState<IServiceChapter[]>([]);

  const loadService = (title: string) => {
    setServiceChapters(
      Services.filter((service) => service.title === title)[0].chapters
    );
  };

  return { serviceChapters, loadService };
};

export default useService;

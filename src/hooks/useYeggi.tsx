import axios from "axios";
import React, { useState } from "react";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  models: any;
  searchModels(name: string): void;
}

export interface IYeggiModel {
  m_id: number;
  m_img_url: string;
  m_page_name: string;
  m_price: string;
  m_title: string;
  m_url: string;
}

const useYeggi = (): ReturnProps => {
  const [models, setModels] = useState([]);

  const searchModels = async (name: string) => {
    const response = await fetch(
      `https://www.yeggi.com/api/v1/InfAIKIJug7hh643DrFF7jU84ErGt3/jhGFZF65e56t8tgRf/search/broad/${name}?gz=no`,
      {
        mode: "no-cors",
      }
    );
    logger(response);
  };
  return { models, searchModels };
};

export default useYeggi;

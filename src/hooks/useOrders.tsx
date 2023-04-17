import { useQuery } from "@tanstack/react-query";
import { EOrderState } from "../interface/enums";
import { IOrderCollection } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IOrderCollection[];
  status: "error" | "success" | "loading";
  error: Error | null;
}

export const useOrders = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const {
    data: _data,
    status,
    error,
  } = useQuery<IOrderCollection[], Error>(["orders"], async () => {
    const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getOrders/`;
    return axiosCustom.get(apiUrl).then((response) => {
      console.log("useOrders | ✅ |", response.data);
      return response.data;
    });
  });

  const data: IOrderCollection[] = [
    {
      id: "frebhb8h42uhnfwjafuidvnet",
      date: new Date().toLocaleDateString(),
      state: EOrderState.requested,
      orders: [
        {
          id: "efwAGRHTRJZETUKIULK%U&E$WGREAVFBGNMFJZT",
          orderState: EOrderState.requested,
          chat: [
            {
              userId: "agsdhnfjhzhtgefwegrhdtjzf",
              text: "Hallo",
              userName: "Du",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "weGRAHZNBRSETBET",
              text: "Guten Tag",
              userName: "Hersteller X",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "agsdhnfjhzhtgefwegrhdtjzf",
              text: "können sie das Drucken?",
              userName: "Du",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "weGRAHZNBRSETBET",
              text: "Nein!",
              userName: "Hersteller X",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "agsdhnfjhzhtgefwegrhdtjzf",
              text: "=´(",
              userName: "Du",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "agsdhnfjhzhtgefwegrhdtjzf",
              text: "Hallo",
              userName: "Du",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "weGRAHZNBRSETBET",
              text: "Guten Tag",
              userName: "Hersteller X",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "agsdhnfjhzhtgefwegrhdtjzf",
              text: "können sie das Drucken?",
              userName: "Du",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "weGRAHZNBRSETBET",
              text: "Nein!",
              userName: "Hersteller X",
              date: new Date().toLocaleTimeString(),
            },
            {
              userId: "agsdhnfjhzhtgefwegrhdtjzf",
              text: "=´(",
              userName: "Du",
              date: new Date().toLocaleTimeString(),
            },
          ],
          processList: [],
        },
        {
          id: "ijanbih5847nztajpfjghnkbj9vl3acrjmifwkgrehntv",
          orderState: EOrderState.verify,
          chat: [],
          processList: [],
        },
        {
          id: "ijanbih5847nztajpfjghnkbj9vl3acrjmifwkgrehntv",
          orderState: EOrderState.confirmed,
          chat: [],
          processList: [],
        },
        {
          id: "ijanbih5847nztajpfjghnkbj9vl3acrjmifwkgrehntv",
          orderState: EOrderState.rejected,
          chat: [],
          processList: [],
        },
        {
          id: "ijanbih5847nztajpfjghnkbj9vl3acrjmifwkgrehntv",
          orderState: EOrderState.production,
          chat: [],
          processList: [],
        },
        {
          id: "ijanbih5847nztajpfjghnkbj9vl3acrjmifwkgrehntv",
          orderState: EOrderState.delivery,
          chat: [],
          processList: [],
        },
      ],
    },
    {
      id: "erasznmjkr675dnebmi7utzrgd",
      date: new Date().toLocaleDateString(),
      state: EOrderState.requested,
      orders: [
        {
          id: "efwAGRHTRJZETUKIULK%U&E$WGREAVFBGNMF;KJZT",
          orderState: EOrderState.requested,
          chat: [],
          processList: [],
        },
        {
          id: "ijanbih5847nztajpfjghnkbj9vl3acrjmifwkgrehntv",
          orderState: EOrderState.requested,
          chat: [],
          processList: [],
        },
      ],
    },
  ];

  return { data, status, error };
};

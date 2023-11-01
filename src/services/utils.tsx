import logger from "@/hooks/useLogger";
import { Address, UserType } from "@/hooks/useUser/types";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";

export const getFileSizeAsString = (size: number): string => {
  let unit: string;
  let newSize: number;
  if (size / 1000000 >= 1) {
    newSize = size / 1000000;
    unit = "MB";
  } else if (size / 1000 >= 1) {
    newSize = size / 1000;
    unit = "KB";
  } else {
    newSize = size >= 0 ? size : 0;
    unit = "B";
  }
  return Math.round(newSize).toString() + unit;
};

export const isNumber = (element: any): element is number => {
  return typeof element === "number";
};

export const getTimeAsText = (time: number): string => {
  let timeString: string = "";
  const day = Math.round(time / (24 * 60 * 60));
  if (day >= 1) {
    timeString += `${day} Tage`;
    time -= day * 24 * 60 * 60;
  }
  const hour = Math.round(time / (60 * 60));
  if (hour >= 1) {
    timeString += `${day > 0 ? " " : ""}${hour} Stunde`;
    time -= hour * 60 * 60;
  }
  const sec = Math.round(time / 60);
  if (sec >= 1) {
    timeString += `${hour > 0 ? " " : ""}${sec} Sekunden`;
  }
  return timeString;
};

export const getCurrentTimeInSeconds = (): number => {
  const now = new Date();
  return Math.round(now.getTime() / 1000);
};

export const removeItem = <T,>(arr: Array<T>, value: T): Array<T> => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const removeItemByIndex = <T,>(
  arr: Array<T>,
  index: number
): Array<T> => {
  let newArr = arr;
  if (index > -1 && index < arr.length) {
    newArr.splice(index, 1);
  }
  return newArr;
};

export const getUserType = (name?: string): UserType => {
  if (name === undefined) return UserType.ANONYM;
  switch (name.toLocaleLowerCase()) {
    case "user":
      return UserType.USER;
    case "organization":
      return UserType.ORGANIZATION;
    case "organisation":
      return UserType.ORGANIZATION;
    case "admin":
      return UserType.ADMIN;
    default:
      return UserType.ANONYM;
  }
};

export const parseAddress = (unparsedAddress: string): Address => {
  const parseAddress = JSON.parse(unparsedAddress);
  let newAddress: Address = {
    street: parseAddress.street,
    houseNumber: parseAddress.number,
    city: parseAddress.city,
    country: parseAddress.country,
    zipcode: parseAddress.zipcode,
  };
  return newAddress;
};

export const getModelURI = (model: ModelProps): string => {
  const convertStringForImage = (input: string): string => {
    let base64 = input;
    base64 = base64.slice(2);
    base64 = base64.slice(0, -1);
    return base64;
  };
  if (model.URI === undefined) return "";

  return model.createdBy === "kiss"
    ? model.URI
    : `data:image/jpeg;base64,${convertStringForImage(model.URI)}`;
};

export const isKey = <T extends object>(x: T, k: PropertyKey): k is keyof T => {
  return k in x;
};

export const splitFindArray = <T extends any>(
  array: T[] | undefined,
  conditionFunction: (event: T) => boolean
): {
  otherArray: T[];
  item: T | undefined;
} => {
  if (array === undefined || (array !== undefined && array.length === 0))
    return { otherArray: [], item: undefined };
  const otherArray = array.filter((item) => !conditionFunction(item));
  const item = array.find((item) => conditionFunction(item));
  return { otherArray, item };
};
export const splitArray = <T extends any>(
  array: T[] | undefined,
  conditionFunction: (event: T) => boolean
): {
  arrayTrue: T[];
  arrayFalse: T[];
} => {
  if (array === undefined || (array !== undefined && array.length === 0))
    return { arrayFalse: [], arrayTrue: [] };
  const arrayTrue = array.filter((item) => conditionFunction(item));
  const arrayFalse = array.filter((item) => !conditionFunction(item));
  return { arrayTrue, arrayFalse };
};

export const JSONIsParseable = (input: any): boolean => {
  if (typeof input !== "string") return false;
  try {
    JSON.parse(input);
    return true;
  } catch (error) {
    logger("JSONIsParseable error: ", error);
    return false;
  }
};

export const JSONSafeParse = <T,>(input: any): T | undefined => {
  if (typeof input !== "string") return undefined;
  try {
    return JSON.parse(input) as T;
  } catch (error) {
    logger("JSONSafeParse error: ", error);
    return undefined;
  }
};

export const sortByKey = <T,>(item1: T, item2: T, key: keyof T): number => {
  if (item1[key] === undefined || item2[key] === undefined) return 0;
  if (item1[key] > item2[key]) {
    return 1;
  }
  if (item1[key] < item2[key]) {
    return -1;
  }
  return 0;
};

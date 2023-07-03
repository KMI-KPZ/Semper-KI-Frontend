import { Address, UserType } from "@/hooks/useUser/types";
import { IProcessItem } from "@/pages/Process/types";
import { EProcessStatusType } from "@/pages/Process/Header/types";
import { IModel } from "@/pages/Process/Model/types";

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

export const getUserType = (name: string): UserType => {
  let type: UserType = UserType.client;
  switch (name.toLocaleLowerCase()) {
    case "client":
      type = UserType.client;
      break;
    case "manufacturer":
      type = UserType.manufacturer;
      break;
    case "admin":
      type = UserType.admin;
      break;
    case "anonym":
      type = UserType.anonym;
      break;
    default:
      type = UserType.anonym;
      break;
  }
  return type;
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

export const getModelURI = (model: IModel): string => {
  const convertStringForImage = (input: string): string => {
    let base64 = input;
    base64 = base64.slice(2);
    base64 = base64.slice(0, -1);
    return base64;
  };
  return model.createdBy === "kiss"
    ? model.URI
    : `data:image/jpeg;base64,${convertStringForImage(model.URI)}`;
};

export const checkForSelectedData = (items: IProcessItem[]): boolean => {
  let contains: boolean = false;
  items.forEach((item) => {
    if (
      item.model !== undefined ||
      item.material !== undefined ||
      item.postProcessings !== undefined
    )
      contains = true;
  });
  return contains;
};

export const isKey = <T extends object>(x: T, k: PropertyKey): k is keyof T => {
  return k in x;
};

export const getStatusByIndex = (process: IProcessItem): EProcessStatusType => {
  if (process.model === undefined) return EProcessStatusType.missing;
  if (process.material === undefined) return EProcessStatusType.missing;
  if (process.postProcessings === undefined) return EProcessStatusType.missing;
  return EProcessStatusType.ok;
};

export const splitFindArray = <T,>(
  array: T[] | undefined,
  conditionFunction: (event: T) => boolean
): {
  otherArray: T[];
  item: T | undefined;
} => {
  if (array === undefined) return { otherArray: [], item: undefined };
  const otherArray = array.filter((item) => !conditionFunction(item));
  const item = array.find((item) => conditionFunction(item));
  return { otherArray, item };
};
export const splitArray = <T,>(
  array: T[] | undefined,
  conditionFunction: (event: T) => boolean
): {
  arrayTrue: T[];
  arrayFalse: T[];
} => {
  if (array === undefined) return { arrayFalse: [], arrayTrue: [] };
  const arrayTrue = array.filter((item) => conditionFunction(item));
  const arrayFalse = array.filter((item) => !conditionFunction(item));
  return { arrayTrue, arrayFalse };
};

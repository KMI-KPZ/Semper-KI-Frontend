import { EUserType } from "../interface/enums";
import { IModel, IProcessItem } from "../interface/Interface";

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
  const day = time / (24 * 60 * 60);
  if (day >= 1) {
    timeString += `${Math.round(day)}Tage`;
    time -= day * 24 * 60 * 60;
  }
  const hour = time / (60 * 60);
  if (hour >= 1) {
    timeString += `${Math.round(hour)}Stunde`;
    time -= hour * 60 * 60;
  }
  const sec = time / 60;
  if (sec >= 1) {
    timeString += `${Math.round(sec)}Sekunden`;
  }
  return timeString;
};

export const getCurrentTimeInSecons = (): number => {
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
  if (index > -1) {
    newArr.splice(index, 1);
  }
  return newArr;
};

export const getUserType = (name: string): EUserType => {
  let type: EUserType = EUserType.indefinite;
  switch (name.toLocaleLowerCase()) {
    case "client":
      type = EUserType.client;
      break;
    case "contractor":
      type = EUserType.contractor;
      break;
    case "admin":
      type = EUserType.admin;
      break;
    default:
      type = EUserType.indefinite;
      break;
  }
  return type;
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

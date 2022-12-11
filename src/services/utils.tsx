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

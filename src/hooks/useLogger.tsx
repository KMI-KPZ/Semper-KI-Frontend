const logger = (...data: any[]) => {
  const includeList: string[] = [];
  const excludeList: string[] = [];
  let shouldLog = true;

  if (
    includeList.length > 0 &&
    data[0] !== undefined &&
    includeList.filter((item) => data[0].includes(item)).length > 0
  )
    shouldLog = true;
  if (
    excludeList.length > 0 &&
    data[0] !== undefined &&
    excludeList.filter((item) => data[0].includes(item)).length > 0
  )
    shouldLog = false;
  if (shouldLog) console.log(...data);
};
export default logger;

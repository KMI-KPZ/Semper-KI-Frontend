export const getFileSizeAsString = (size:number):string => {
  let unit:string;
  let newSize:number;
  if(size/1000000 > 1){
    newSize = size/1000000;
    unit = "MB";
  }else if(size/1000 > 1){
    newSize = size/1000;
    unit = "KB";
  }else{
    newSize = size;
    unit = "B";
  }
  return Math.round(newSize).toString()+unit;
}
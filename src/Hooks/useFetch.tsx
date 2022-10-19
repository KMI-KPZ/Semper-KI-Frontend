import {useEffect, useState} from "react";
import axios from "axios";

interface Props<T> {
  url:string
}

interface ReturnProps {
  data:any
  isLoading:boolean
  error:any
}

export const useFetch = <T extends unknown>({url}:Props<T>):ReturnProps => {
    const [data,setData] = useState<T|null>(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect( ()=>{
      setIsLoading(true);
      axios
        .get(url)
        .then((response)=>{
          setData(response.data);
        })
        .catch((error)=>{
          setError(error);
        })
        .finally(()=>{
          setIsLoading(false);
        })

    },[url])

    return {data, isLoading, error};
}
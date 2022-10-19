import {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          console.log("Fetch Hook Loaded Data",url,response.data);
          setData(response.data);
        })
        .catch((error)=>{
          console.log("Fetch Hook Error",error);
          setError(error);
        })
        .finally(()=>{
          setIsLoading(false);
        })

    },[url])

    return {data, isLoading, error};
}
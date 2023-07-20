import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

interface ReturnProps {}

const useFileView = (
  fileName: string,
  orderFileQuery: UseQueryResult<any, Error>,
  setFileName: React.Dispatch<React.SetStateAction<string>>
): ReturnProps => {
  useEffect(() => {
    if (fileName !== "") {
      orderFileQuery.refetch();
    }
  }, [fileName]);
  useEffect(() => {
    if (orderFileQuery.data !== undefined) {
      const url = window.URL.createObjectURL(orderFileQuery.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      setFileName("");

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode!.removeChild(link);
    }
  }, [orderFileQuery.data]);
  return {};
};

export default useFileView;

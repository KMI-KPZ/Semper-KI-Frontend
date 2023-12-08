import useCSRFTokenQuerys from "@/api/CSRFToken/useCSRFTokenQuerys";
import useCSRFToken from "@/hooks/useCSRFToken";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren } from "react";

interface CSRFOutletProps {}

const CSRFOutlet: React.FC<PropsWithChildren<CSRFOutletProps>> = (props) => {
  const { children } = props;
  const { CSRFTokenQuery } = useCSRFTokenQuerys();
  const { CSRFTokenIsLoaded } = useCSRFToken();

  if (
    CSRFTokenQuery.isFetched &&
    CSRFTokenQuery.data !== undefined &&
    CSRFTokenIsLoaded()
  ) {
    return children;
  } else return <AppLoadingSuspense />;
};

export default CSRFOutlet;

import React from "react";

interface Props {
  isLoading: boolean;
  error: any;
  data: any;
  loadingText: string;
  loadingErrorText: string;
  errorText: string;
  component: React.ReactNode;
}

const Loading: React.FC<Props> = (props) => {
  const {
    isLoading,
    error,
    data,
    loadingText,
    loadingErrorText,
    errorText,
    component,
  } = props;
  return (
    <>
      {error && (
        <div>
          {loadingErrorText}
          <br />
          {errorText}
          {error.message}
        </div>
      )}
      {(isLoading || !data) && !error && <div>{loadingText}</div>}
      {!isLoading && data && !error && component}
    </>
  );
};

export default Loading;

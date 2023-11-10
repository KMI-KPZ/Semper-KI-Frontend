import Container from "@component-library/Container";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/Typography";
import useTest from "./hooks/useTest";
import { Button } from "@component-library/Button";
import ModelPreview from "./STLViewer";

interface TestRenderProps {}

const TestRender: React.FC<TestRenderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [url, setUrl] = useState<string>("assets/test/3DBenchy.stl");
  const { downloadFileMutation } = useTest();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleOnClick = () => {
    downloadFileMutation.mutate(url);
  };

  return (
    <Container direction="col" width="full" className="bg-white p-10">
      <Container direction="row" className="justify-between">
        <input
          value={url}
          placeholder="STL URL einfügen"
          type="text"
          onChange={handleOnChange}
          className="rounded border-2 bg-slate-100 p-3"
        />
        <Button title="Download" onClick={handleOnClick} />
      </Container>
      {url !== "" ? <ModelPreview file={url} /> : null}
    </Container>
  );
};

export default TestRender;

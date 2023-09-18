import Container from "@component-library/Container";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/Typography";
import STLViewer from "./STLViewer";

interface TestRenderProps {}

const TestRender: React.FC<TestRenderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [stlFile, setStlFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files !== null && files[0] !== null) {
      setStlFile(files[0]);
    }
  };

  return (
    <Container direction="col" width="full" className="bg-white p-5">
      <input type="file" accept=".stl" onChange={handleFileChange} />
      {stlFile !== undefined ? (
        <>
          <Heading variant="h1">{stlFile.name}</Heading>
        </>
      ) : null}
      <STLViewer file="/assets/test/3DBenchy.stl" />
    </Container>
  );
};

export default TestRender;

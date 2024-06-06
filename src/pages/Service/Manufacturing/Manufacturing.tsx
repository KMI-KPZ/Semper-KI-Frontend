import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { ServiceContext } from "@/contexts/ServiceContext";
import useFilter from "@/hooks/useFilter";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceSearch from "./Search/Search";
import { Navigate, Route, Routes } from "react-router-dom";
import { ManufacturingModels } from "./Model/Model";
import { ManufacturingMaterials } from "./Material/Material";
import { ManufacturingPostProcessings } from "./PostProcessing/PostProcessing";
import { Error } from "@/pages/Error/Error";
import { Container, Heading } from "@component-library/index";

export const ServiceManufacturing: React.FC = () => {
  const { t } = useTranslation();
  const { serviceDetails: service_ } = useContext(ServiceContext);
  const service = service_ as ManufacturingServiceProps;
  const [searchText, setSearchText] = useState<string>("");
  const { filtersQuery } = useFilter();

  return (
    <Container
      width="none"
      direction="col"
      justify="start"
      className="h-full w-screen max-w-6xl p-5 pt-14 md:p-0"
    >
      <ServiceSearch searchText={searchText} setSearchText={setSearchText} />
      <Routes>
        <Route index element={<Navigate to="model" />} />
        <Route
          path="model"
          element={
            <ManufacturingModels
              searchText={searchText}
              models={service.models}
              filters={filtersQuery.data}
            />
          }
        />
        <Route
          path="material"
          element={
            <ManufacturingMaterials
              materials={service.materials}
              filters={filtersQuery.data}
              searchText={searchText}
            />
          }
        />
        <Route
          path="postprocessing"
          element={
            <ManufacturingPostProcessings
              postProcessings={service.postProcessings}
              searchText={searchText}
              filters={filtersQuery.data}
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
};

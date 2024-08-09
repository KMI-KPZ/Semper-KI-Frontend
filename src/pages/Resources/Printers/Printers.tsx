import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import ResourcesPrintersTable from "./Table/Table";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import ResourcesPrintersAdd from "./Add/Add";

interface ResourcesPrintersProps {}

const ResourcesPrinters: React.FC<ResourcesPrintersProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3">
      <Routes>
        <Route index element={<ResourcesPrintersTable />} />
        <Route
          path="add"
          element={
            <PermissionGate
              children={<ResourcesPrintersAdd />}
              element="ResourcesPrintersAdd"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default ResourcesPrinters;

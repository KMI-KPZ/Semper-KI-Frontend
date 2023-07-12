import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import ResourcesMaterialsForm from "./components/Form";
import ResourcesMaterialsTable from "./components/Table";

interface ResourcesMaterialsProps {}

const ResourcesMaterials: React.FC<ResourcesMaterialsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-3">
      <Routes>
        <Route index element={<ResourcesMaterialsTable />} />
        <Route path="add" element={<ResourcesMaterialsForm />} />
      </Routes>
    </div>
  );
};

export default ResourcesMaterials;

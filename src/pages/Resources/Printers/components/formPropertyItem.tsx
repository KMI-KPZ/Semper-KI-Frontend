import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesPrintersFormPropertyItemProps {}

const ResourcesPrintersFormPropertyItem: React.FC<
  ResourcesPrintersFormPropertyItemProps
> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">ResourcesPrintersFormPropertyItem</div>;
};

export default ResourcesPrintersFormPropertyItem;

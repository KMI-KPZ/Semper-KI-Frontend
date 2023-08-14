import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderServiceSelectProps {}

const SubOrderServiceSelect: React.FC<SubOrderServiceSelectProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      SubOrderServiceSelect
    </div>
  );
};

export default SubOrderServiceSelect;

import { on } from "events";

type StatusItemConnector = {
  active: boolean;
  ongoging: boolean;
};

const StatusItemConnector: React.FC<StatusItemConnector> = (props) => {
  const { active, ongoging } = props;

  if (ongoging === true)
    return (
      <>
        <div
          className={
            "h-14 w-[2px] bg-gradient-to-b from-orange-200 to-slate-100 md:hidden"
          }
        />
        <div
          className={
            "hidden h-[2px] w-20 bg-gradient-to-r from-orange-200 to-slate-100 md:block"
          }
        />
      </>
    );

  return (
    <div
      className={`bproject-l-2 md:bproject-l-0 md:bproject-t-2 h-14 md:h-0 md:w-20 ${
        active ? "bproject-orange-200" : "bproject-slate-100"
      }`}
    />
  );
};

export default StatusItemConnector;

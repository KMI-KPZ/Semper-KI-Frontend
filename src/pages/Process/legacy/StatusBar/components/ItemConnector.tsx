type StatusItemConnector = {
  active: boolean;
  onGoing: boolean;
};

const StatusItemConnector: React.FC<StatusItemConnector> = (props) => {
  const { active, onGoing } = props;

  if (onGoing === true)
    return (
      <>
        <div
          className={
            "h-14 w-[2px] bg-gradient-to-b from-orange to-slate-100 md:hidden"
          }
        />
        <div
          className={
            "hidden h-[2px] w-20 bg-gradient-to-r from-orange to-slate-100 md:block"
          }
        />
      </>
    );

  return (
    <div
      className={`h-14 border-l-2 md:h-0 md:w-20 md:border-l-0 md:border-t-2 ${
        active ? "border-orange-200" : "border-slate-100"
      }`}
    />
  );
};

export default StatusItemConnector;

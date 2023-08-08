type StatusItemConnector = {
  active: boolean;
};

const StatusItemConnector: React.FC<StatusItemConnector> = (props) => {
  const { active } = props;
  return (
    <div
      className={`h-2 border-l-2 md:h-0 md:w-5 md:border-t-2 ${
        active ? "border-orange-200" : "border-slate-100"
      }`}
    />
  );
};

export default StatusItemConnector;

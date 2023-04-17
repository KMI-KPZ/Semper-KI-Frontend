import { useLogout } from "../../hooks/useLogin";
import Loading from "../Loading/Loading";

const Logout = () => {
  const { data, error, status } = useLogout();
  return (
    <Loading error={error} status={status} animation>
      <h1>Weiterleiten zur Abmeldung</h1>
    </Loading>
  );
};

export default Logout;

import React, { PropsWithChildren, useState } from "react";
import { Button, Heading } from "@component-library/index";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

interface PasswordAuthOutletProps {}
interface FormData {
  password: string;
}

const PasswordAuthOutlet: React.FC<
  PropsWithChildren<PasswordAuthOutletProps>
> = (props) => {
  const { children } = props;
  const hiddenPW = "h5XxXR8o9NISyZiZJeiQ";
  const [userPassword, setUserPassword] = useState<string>(
    Cookies.get("NRU-APP-PASSWORD") || ""
  );

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Cookies.set("NRU-APP-PASSWORD", data.password);
    setUserPassword(data.password);
  };

  if (hiddenPW !== userPassword)
    return (
      <form className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-white text-black">
        <Heading variant="h1">Password Authentification</Heading>
        <input
          type="password"
          {...register("password")}
          className="rounded-md border-2 p-2"
        />
        <Button title="Entsperren" onClick={handleSubmit(onSubmit)} size="sm" />
      </form>
    );
  return children;
};

export default PasswordAuthOutlet;

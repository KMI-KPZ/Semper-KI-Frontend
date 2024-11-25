import React, { PropsWithChildren, useState } from "react";
import { Button, Heading } from "@component-library/index";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";

interface PasswordAuthOutletProps {}
interface FormData {
  password: string;
}

const PasswordAuthOutlet: React.FC<
  PropsWithChildren<PasswordAuthOutletProps>
> = (props) => {
  const { children } = props;

  // Store the hashed version of the password
  const hiddenPWHash =
    "$2a$12$xELjU7VcxqPEScFh8kQ0wOiTGY2DP8blYFQPtCtHeaeVDJYNjeMCa";
  const [userPassword, setUserPassword] = useState<string>(
    Cookies.get("NRU-APP-PASSWORD") || ""
  );

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Compare the hash of the input password with the stored hash
    const isMatch = bcrypt.compareSync(data.password, hiddenPWHash);
    if (isMatch) {
      Cookies.set("NRU-APP-PASSWORD", data.password);
      setUserPassword(data.password);
    } else {
      alert("Incorrect password");
    }
    reset();
  };

  // Verify password validity
  const isValidPassword = bcrypt.compareSync(userPassword, hiddenPWHash);

  if (!isValidPassword)
    return (
      <form className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-white text-black">
        <Heading variant="h1">Password Authentication</Heading>
        <input
          type="password"
          {...register("password")}
          className="rounded-md border-2 p-2"
        />
        <Button title="Unlock" onClick={handleSubmit(onSubmit)} size="sm" />
      </form>
    );
  return children;
};

export default PasswordAuthOutlet;

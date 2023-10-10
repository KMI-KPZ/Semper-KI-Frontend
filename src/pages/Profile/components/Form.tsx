import logger from "@/hooks/useLogger";
import { UserProps } from "@/hooks/useUser/types";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ProfileFormProps {
  user: UserProps;
}

interface FormData {
  address: string;
}

const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { address: props.user.details.address },
  });

  const onSubmit = (data: FormData) => {
    logger("onSubmit", data);
  };

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("Profile.components.Form.title")}</Heading>
      <form className="flex w-full flex-col items-center justify-center gap-5">
        <label className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Text variant="body">{t("Profile.components.Form.address")}</Text>
          <input
            className="bproject-2 bproject-gray-300 w-full rounded-md p-2"
            type="text"
            placeholder={t("Profile.components.Form.address")}
            {...register("address", { required: true })}
          />
        </label>
        {errors.address !== undefined ? (
          <Text variant="body" className="text-red-500">
            {t("Profile.components.Form.error.address")}
          </Text>
        ) : null}
        <Button
          title={t("Profile.components.Form.button.save")}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default ProfileForm;

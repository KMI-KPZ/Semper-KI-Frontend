import { Heading, Text } from "@component-library/Typography";
import { useForm } from "react-hook-form";

interface FormData {
  choose: string;
}
interface PlayFormProps {
  data: string;
}

const PlayForm: React.FC<PlayFormProps> = (props) => {
  const {} = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { choose: props.data },
    values:{ choose: props.data },
  });

  return (
      <div className="flex w-fit flex-col items-center justify-center gap-5 bg-white p-5">
        <Heading variant="h1">Titel</Heading>
        <form className="flex w-full flex-col items-center justify-center gap-5">
          <label className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <Text variant="body">hier deine auswahl</Text>
            <input
                className="w-full rounded-md border-2 border-gray-300 p-2"
                type="text"
                placeholder={"eingabe"}
                {...register("choose", { required: true })}
            />
          </label>
        </form>
      </div>
  );
};

export default PlayForm;

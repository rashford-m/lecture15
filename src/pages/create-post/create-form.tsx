import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a title"),
  });

  const { register } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form>
      <input placeholder="Title..." {...register("title")} />
      <input placeholder="Description..." {...register("description")} />
      <input type="submit" />
    </form>
  );
};

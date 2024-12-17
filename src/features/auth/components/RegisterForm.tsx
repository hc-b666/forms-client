import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { useRegisterMutation } from "../services/authApi";
import { AuthInput } from "./AuthInput";

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export function RegisterForm() {
  const intl = useIntl();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useRegisterMutation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>();
  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const res = await signup(data).unwrap();
      toast({ description: res.message });
      navigate("/login");
    } catch (err) {
      const msg = (err as any).data.message;
      toast({ variant: "destructive", description: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[450px] p-8 flex flex-col gap-4 border rounded-lg">
      <h1 className="text-xl font-semibold">
        {intl.formatMessage({ id: "registerpage.title" })}
      </h1>

      <AuthInput
        label={intl.formatMessage({ id: "registerpage.firstname" })}
        type="text"
        id="firstName"
        register={register("firstName", { required: intl.formatMessage({ id: "registerpage.firstname.error" }) })}
        error={errors.firstName?.message}
      />

      <AuthInput
        label={intl.formatMessage({ id: "registerpage.lastname" })}
        type="text"
        id="lastName"
        register={register("lastName", { required: intl.formatMessage({ id: "registerpage.lastname.error" }) })}
        error={errors.lastName?.message}
      />

      <AuthInput
        label={intl.formatMessage({ id: "registerpage.username" })}
        type="text"
        id="username"
        register={register("username", { required: intl.formatMessage({ id: "registerpage.username.error" }) })}
        error={errors.username?.message}
      />

      <AuthInput
        label={intl.formatMessage({ id: "registerpage.email" })}
        type="email"
        id="email"
        register={register("email", { required: intl.formatMessage({ id: "registerpage.email.error" }) })}
        error={errors.email?.message}
      />

      <AuthInput
        label={intl.formatMessage({ id: "registerpage.password" })}
        type="password"
        id="password"
        register={register("password", { required: intl.formatMessage({ id: "registerpage.password.error" }) })}
        error={errors.password?.message}
      />

      <div className="text-sm flex items-center gap-1">
        <p>{intl.formatMessage({ id: "registerpage.haveaccount" })}</p>
        <Link to={"/login"} className="underline">
          {intl.formatMessage({ id: "registerpage.login" })}
        </Link>
      </div>

      <Button type="submit" disabled={isLoading}>
        {intl.formatMessage({ id: "registerpage.button" })}
      </Button>
    </form>
  );
}

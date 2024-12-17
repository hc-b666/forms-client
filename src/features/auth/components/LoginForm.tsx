import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { useLoginMutation } from "../services/authApi";
import { AuthInput } from "./AuthInput";

export interface ILoginForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export function LoginForm() {
  const intl = useIntl();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signin, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res: ILoginResponse = await signin(data).unwrap();
      toast({ description: res.message });
      navigate(`/profile/${res.user.id}`);
    } catch (err) {
      const msg = (err as any).data.message;
      toast({ variant: "destructive", description: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[450px] p-8 flex flex-col gap-4 border rounded-lg">
      <h1 className="text-xl font-semibold">
        {intl.formatMessage({ id: "loginpage.title" })}
      </h1>

      <AuthInput 
        label={intl.formatMessage({ id: "loginpage.email" })}
        type="email"
        id="email"
        register={register("email", { required: intl.formatMessage({ id: "loginpage.email.error" }) })}
        error={errors.email?.message}
      />

      <AuthInput 
        label={intl.formatMessage({ id: "loginpage.password" })}
        type="password"
        id="password"
        register={register("password", { required: intl.formatMessage({ id: "loginpage.password.error" }) })}
        error={errors.password?.message}
      />
      
      <div className="text-sm flex items-center gap-1">
        <p>{intl.formatMessage({ id: "loginpage.noaccount" })}</p>
        <Link to={"/register"} className="underline">
          {intl.formatMessage({ id: "loginpage.register" })}
        </Link>
      </div>

      <Button type="submit" disabled={isLoading}>
        {intl.formatMessage({ id: "loginpage.button" })}
      </Button>
    </form>
  );
}

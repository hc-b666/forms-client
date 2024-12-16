import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { useToast } from "@/hooks/use-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLoginMutation } from "../services/authApi";

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

  const { register, handleSubmit } = useForm<ILoginForm>();
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
      
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email">
          {intl.formatMessage({ id: "loginpage.email" })}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={intl.formatMessage({ id: "loginpage.email" })}
          {...register("email")}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password">
          {intl.formatMessage({ id: "loginpage.password" })}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={intl.formatMessage({ id: "loginpage.password" })}
          {...register("password")}
        />
      </div>

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

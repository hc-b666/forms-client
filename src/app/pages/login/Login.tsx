import { Link, Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

import { useLoginMutation } from "@/app/services/authApi";
import { selectIsAuthenticated } from "@/app/features/authSlice";
import { useToast } from "@/app/hooks/use-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export interface ILoginForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const intl = useIntl();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const { register, handleSubmit } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res: ILoginResponse = await login(data).unwrap();
      toast({ description: res.message });
      navigate(`/profile/${res.user.id}`);
    } catch (err) {
      const msg = (err as any).data.message;
      toast({ variant: "destructive", description: msg });
    }
  };

  if (isAuthenticated) {
    toast({ description: "You are already logged in" });
    return <Navigate to="/" />;
  }

  return (
    <div className="container flex-grow flex items-center justify-center">
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

        <Button type="submit">
          {intl.formatMessage({ id: "loginpage.button" })}
        </Button>
      </form>
    </div>
  );
}

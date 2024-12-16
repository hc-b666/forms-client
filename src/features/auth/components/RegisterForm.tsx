import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { useToast } from "@/hooks/use-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRegisterMutation } from "../services/authApi";

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
  
  const { register, handleSubmit } = useForm<IRegisterForm>();
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

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="firstName">
          {intl.formatMessage({ id: "registerpage.firstname" })}
        </Label>
        <Input
          id="firstName"
          type="text"
          placeholder={intl.formatMessage({ id: "registerpage.firstname" })}
          {...register("firstName")}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="lastName">
          {intl.formatMessage({ id: "registerpage.lastname" })}
        </Label>
        <Input
          id="lastName"
          type="text"
          placeholder={intl.formatMessage({ id: "registerpage.lastname" })}
          {...register("lastName")}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="username">
          {intl.formatMessage({ id: "registerpage.username" })}
        </Label>
        <Input
          id="username"
          type="text"
          placeholder={intl.formatMessage({ id: "registerpage.username" })}
          {...register("username")}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email">
          {intl.formatMessage({ id: "registerpage.email" })}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={intl.formatMessage({ id: "registerpage.email" })}
          {...register("email")}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password">
          {intl.formatMessage({ id: "registerpage.password" })}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={intl.formatMessage({ id: "registerpage.password" })}
          {...register("password")}
        />
      </div>

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

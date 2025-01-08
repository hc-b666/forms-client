import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { useLoginMutation } from "../services/authApi";
import { AuthInput } from "./AuthInput";
import { useTranslations } from "@/hooks/useTranslations";

export function LoginForm() {
  const { t } = useTranslations();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signin, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res: LoginResponse = await signin(data).unwrap();
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
        {t("loginpage.title")}
      </h1>

      <AuthInput 
        label={t("loginpage.email")}
        type="email"
        id="email"
        register={register("email", { required: t("loginpage.email.error") })}
        error={errors.email?.message}
      />

      <AuthInput 
        label={t("loginpage.password")}
        type="password"
        id="password"
        register={register("password", { required: t("loginpage.password.error") })}
        error={errors.password?.message}
      />
      
      <div className="text-sm flex items-center gap-1">
        <p>{t("loginpage.noaccount")}</p>
        <Link to={"/register"} className="underline">
          {t("loginpage.register")}
        </Link>
      </div>

      <Button type="submit" disabled={isLoading}>
        {t("loginpage.button")}
      </Button>
    </form>
  );
}

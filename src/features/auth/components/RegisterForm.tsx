import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { useRegisterMutation } from "../services/authApi";
import { AuthInput } from "./AuthInput";
import { useTranslations } from "@/hooks/useTranslations";

export function RegisterForm() {
  const { t } = useTranslations();
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
        {t("registerpage.title")}
      </h1>

      <AuthInput
        label={t("registerpage.firstname")}
        type="text"
        id="firstName"
        register={register("firstName", { required: t("registerpage.firstname.error") })}
        error={errors.firstName?.message}
      />

      <AuthInput
        label={t("registerpage.lastname")}
        type="text"
        id="lastName"
        register={register("lastName", { required: t("registerpage.lastname.error") })}
        error={errors.lastName?.message}
      />

      <AuthInput
        label={t("registerpage.username")}
        type="text"
        id="username"
        register={register("username", { required: t("registerpage.username.error") })}
        error={errors.username?.message}
      />

      <AuthInput
        label={t("registerpage.email")}
        type="email"
        id="email"
        register={register("email", { required: t("registerpage.email.error") })}
        error={errors.email?.message}
      />

      <AuthInput
        label={t("registerpage.password")}
        type="password"
        id="password"
        register={register("password", { required: t("registerpage.password.error") })}
        error={errors.password?.message}
      />

      <div className="text-sm flex items-center gap-1">
        <p>{t("registerpage.haveaccount")}</p>
        <Link to={"/login"} className="underline">
          {t("registerpage.login")}
        </Link>
      </div>

      <Button type="submit" disabled={isLoading}>
        {t("registerpage.button")}
      </Button>
    </form>
  );
}

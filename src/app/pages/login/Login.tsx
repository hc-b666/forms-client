import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useLoginMutation } from "@/app/services/authApi";
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

interface LoginRes {
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
}

export function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signIn] = useLoginMutation();
  const { register, handleSubmit } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res: LoginRes = await signIn(data).unwrap();
      toast({ description: res.message });
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/profile");
    } catch (err) {
      const msg = (err as any).data.message;
      toast({ variant: "destructive", description: msg });
    }
  };

  return (
    <div className="container flex-grow flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[450px] p-8 flex flex-col gap-4 border rounded-lg">
        <h1 className="text-xl font-semibold">Login Form</h1>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        <div className="text-sm flex items-center gap-1">
          <p>Don't have an account?</p>
          <Link to={"/register"} className="underline">Register here</Link>
        </div>

        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}

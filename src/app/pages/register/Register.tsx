import { Link, Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useRegisterMutation } from "@/app/services/authApi";
import { selectIsAuthenticated } from "@/app/features/authSlice";
import { useToast } from "@/app/hooks/use-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface RegisterRes {
  message: string;
}

export default function RegisterPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signUp] = useRegisterMutation();
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const res: RegisterRes = await signUp(data).unwrap();
      toast({ description: res.message });
      navigate("/login");
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
        <h1 className="text-xl font-semibold">Register Form</h1>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            {...register("firstName")}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            {...register("lastName")}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
        </div>
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
          <p>Already have an account?</p>
          <Link to={"/login"} className="underline">Login here</Link>
        </div>

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}

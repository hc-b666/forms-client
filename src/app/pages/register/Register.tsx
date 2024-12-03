import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export function RegisterPage() {
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onSubmit: SubmitHandler<IRegisterForm> = (data) => console.log(data);

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

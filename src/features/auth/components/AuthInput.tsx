import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { UseFormRegisterReturn } from "react-hook-form";

interface IAuthInput {
  label: string;
  type: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

export function AuthInput({ label, type, id, register, error }: IAuthInput) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={label}
        {...(register || {})}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

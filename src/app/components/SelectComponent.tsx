import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { capitalize } from "../lib/stringUtils";

interface ISelect {
  onValueChange: (v: string) => void;
  options: string[];
  placeholder: string;
  label: string;
  defaultValue?: string;
  className?: string;
}

export function SelectComponent({ onValueChange, options, placeholder, label, defaultValue, className = "w-full" }: ISelect) {
  return (
    <Select onValueChange={onValueChange} value={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, id) => (
            <SelectItem key={id} value={option}>
              {capitalize(option)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

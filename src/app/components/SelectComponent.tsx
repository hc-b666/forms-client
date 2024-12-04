import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface ISelect {
  onValueChange: (v: string) => void;
  options: string[];
  placeholder: string;
  label: string;
  defaultValue?: string;
}

export function SelectComponent({ onValueChange, options, placeholder, label, defaultValue }: ISelect) {
  return (
    <Select onValueChange={onValueChange} value={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, id) => (
            <SelectItem key={id} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

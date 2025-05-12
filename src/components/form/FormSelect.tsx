import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldPath, FieldValues } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
};

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option",
}: FormSelectProps<T>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

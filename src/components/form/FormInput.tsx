import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FieldPath, FieldValues } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "input" | "textarea";
};

export const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder = "",
  type = "input",
}: FormInputProps<T>) => {
  const Component = type === "textarea" ? Textarea : Input;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Component {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

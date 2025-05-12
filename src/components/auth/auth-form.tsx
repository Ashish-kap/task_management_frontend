import type { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormErrorMessage from "./form-error-message";
import { FormInput } from "../form/FormInput";

type AuthFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<void>;
  fields: Array<{
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
  }>;
  error?: string;
  submitText: string;
};

export const AuthForm = ({
  form,
  onSubmit,
  fields,
  error,
  submitText,
}: AuthFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormInput<any>
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
          />
        ))}

        {error && <FormErrorMessage message={error} />}

        <Button type="submit" className="w-full cursor-pointer">
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

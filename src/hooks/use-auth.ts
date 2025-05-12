import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAuthForm = <T extends z.ZodTypeAny>(schema: T) => {
  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      schema instanceof z.ZodObject
        ? (Object.fromEntries(
            Object.keys(schema.shape).map((key) => [key, ""])
          ) as z.infer<typeof schema>)
        : undefined,
  });
};
  
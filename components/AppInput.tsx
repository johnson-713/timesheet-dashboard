import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type {
  UseFormReturn,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AppInputProps<T extends FieldValues> {
  label?: string;
  description?: string;
  topDescription?: string;
  name: Path<T>;
  formUtils: UseFormReturn<T>;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  type?: "text" | "password" | "email";
  formMessageClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rules?: Omit<RegisterOptions<T, Path<T>>, "deps">;
}

const AppInput = <T extends FieldValues>({
  label,
  description,
  topDescription,
  formUtils,
  name,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  type = "text",
  formMessageClassName,
  disabled = false,
  readOnly = false,
  rules,
}: AppInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={formUtils.control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className={`mb-[8px] ${labelClassName}`}>
              {label}
            </FormLabel>
          )}
          {topDescription && (
            <FormDescription className="mt-[-6px] mb-2">
              {topDescription}
            </FormDescription>
          )}
          <FormControl>
            <div className="relative">
              <Input
                aria-invalid={!!error}
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={(e) => {
                  const value = e.target.value;
                  onChange(value);
                }}
                {...field}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                className={`${inputClassName} ${
                  type === "password" ? "pr-10" : ""
                }`}
                disabled={disabled}
              />
              {type === "password" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={formMessageClassName}>
            {error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default AppInput;

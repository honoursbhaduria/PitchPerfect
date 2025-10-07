import React from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text"
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormDescription>
          {type === 'password'
            ? 'Make sure your password is secure.'
            : 'This is your public display domain'}
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;

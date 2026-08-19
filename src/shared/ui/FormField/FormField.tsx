import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { Input } from '../Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormField({ name, onChange, onBlur, ...rest }: FormFieldProps) {
  const [field, meta] = useField<string>(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
    onChange?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    field.onBlur(event);
    onBlur?.(event);
  };

  return (
    <Input
      {...rest}
      name={field.name}
      value={field.value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={meta.touched ? meta.error : undefined}
    />
  );
}

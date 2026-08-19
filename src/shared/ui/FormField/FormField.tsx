import type { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { Input } from '../Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormField({ name, ...rest }: FormFieldProps) {
  const [field, meta] = useField(name);

  return <Input {...field} {...rest} error={meta.touched ? meta.error : undefined} />;
}

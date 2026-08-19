import { useId, type InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { Input } from '../Input';
import styles from './FormField.module.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormField({ name, ...rest }: FormFieldProps) {
  const [field, meta] = useField(name);
  const errorId = useId();
  const error = meta.touched && meta.error ? meta.error : null;

  return (
    <div className={styles.field}>
      <Input
        {...field}
        {...rest}
        invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

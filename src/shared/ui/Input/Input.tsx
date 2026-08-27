import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@shared/lib';
import sprite from '@/assets/icons.svg';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: ReactNode;
}

const PASSWORD_TYPE = 'password';

export function Input({ type = 'text', error, className, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const errorId = useId();
  const isPassword = type === PASSWORD_TYPE;
  const isInvalid = Boolean(error);
  const inputType = isPassword && isPasswordVisible ? 'text' : type;

  return (
    <div className={styles.field}>
      <div className={styles.control}>
        <input
          {...rest}
          type={inputType}
          aria-invalid={isInvalid}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            styles.input,
            isPassword && styles.withToggle,
            isInvalid && styles.invalid,
            className,
          )}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use href={`${sprite}#icon-${isPasswordVisible ? 'eye' : 'eye-off'}`} />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

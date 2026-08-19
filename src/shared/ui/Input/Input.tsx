import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@shared/lib';
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M1.7 10S4.9 4.6 10 4.6 18.3 10 18.3 10 15.1 15.4 10 15.4 1.7 10 1.7 10Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4" />
              {!isPasswordVisible && (
                <path
                  d="M3.5 3.5 16.5 16.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              )}
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

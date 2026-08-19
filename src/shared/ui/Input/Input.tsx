import { useState, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const PASSWORD_TYPE = 'password';

export function Input({ type = 'text', invalid = false, className = '', ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === PASSWORD_TYPE;
  const inputType = isPassword && isPasswordVisible ? 'text' : type;

  return (
    <div className={styles.wrap}>
      <input
        {...rest}
        type={inputType}
        aria-invalid={invalid}
        className={`${styles.input} ${isPassword ? styles.withToggle : ''} ${invalid ? styles.invalid : ''} ${className}`}
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
  );
}

import { useState } from 'react';
import { Field } from 'formik';
import styles from './PasswordField.module.css';

interface PasswordFieldProps {
  name: string;
  placeholder: string;
  autoComplete: 'current-password' | 'new-password';
  className?: string;
}

export function PasswordField({
  name,
  placeholder,
  autoComplete,
  className = '',
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.wrap}>
      <Field
        name={name}
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={placeholder}
        className={className}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
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
          {!isVisible && (
            <path
              d="M3.5 3.5 16.5 16.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

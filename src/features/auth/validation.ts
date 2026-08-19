import * as Yup from 'yup';
import { AUTH_FIELD_LIMIT } from './constants';

const passwordBytes = (value: string): number => new TextEncoder().encode(value).length;

export const AUTH_SCHEMA = {
  name: Yup.string()
    .trim()
    .max(
      AUTH_FIELD_LIMIT.nameMaxChars,
      `Name must be at most ${AUTH_FIELD_LIMIT.nameMaxChars} characters`,
    )
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .max(
      AUTH_FIELD_LIMIT.emailMaxChars,
      `Email must be at most ${AUTH_FIELD_LIMIT.emailMaxChars} characters`,
    )
    .required('Email is required'),
  newPassword: Yup.string()
    .min(
      AUTH_FIELD_LIMIT.passwordMinChars,
      `Password must be at least ${AUTH_FIELD_LIMIT.passwordMinChars} characters`,
    )
    .test(
      'password-bytes',
      `Password must be at most ${AUTH_FIELD_LIMIT.passwordMaxBytes} bytes`,
      (value) => passwordBytes(value ?? '') <= AUTH_FIELD_LIMIT.passwordMaxBytes,
    )
    .required('Password is required'),
  currentPassword: Yup.string().required('Password is required'),
} as const;

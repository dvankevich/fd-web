import { Formik, Form, Field, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import type { RegisterPayload } from '@shared/types';
import { AUTH_FIELD_LIMIT } from '../constants';
import { register } from '../operations';
import { selectAuthError, selectIsAuthLoading } from '../selectors';
import styles from '../SignInForm/SignInForm.module.css';

const passwordBytes = (value: string): number => new TextEncoder().encode(value).length;

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .max(AUTH_FIELD_LIMIT.nameMax, `Name must be at most ${AUTH_FIELD_LIMIT.nameMax} characters`)
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .max(AUTH_FIELD_LIMIT.emailMax, `Email must be at most ${AUTH_FIELD_LIMIT.emailMax} characters`)
    .required('Email is required'),
  password: Yup.string()
    .min(
      AUTH_FIELD_LIMIT.passwordMin,
      `Password must be at least ${AUTH_FIELD_LIMIT.passwordMin} characters`,
    )
    .test(
      'password-bytes',
      `Password must be at most ${AUTH_FIELD_LIMIT.passwordMaxBytes} bytes`,
      (value) => passwordBytes(value ?? '') <= AUTH_FIELD_LIMIT.passwordMaxBytes,
    )
    .required('Password is required'),
});

const initialValues: RegisterPayload = {
  name: '',
  email: '',
  password: '',
};

interface SignUpFormProps {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (
    values: RegisterPayload,
    { setSubmitting }: FormikHelpers<RegisterPayload>,
  ) => {
    const result = await dispatch(
      register({ ...values, name: values.name.trim(), email: values.email.trim() }),
    );
    setSubmitting(false);

    if (register.fulfilled.match(result)) {
      onSuccess?.();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.field}>
            <Field
              as={Input}
              name="name"
              type="text"
              placeholder="Name*"
              autoComplete="name"
              aria-label="Name"
              invalid={Boolean(touched.name && errors.name)}
            />
            {touched.name && errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <Field
              as={Input}
              name="email"
              type="email"
              placeholder="Email*"
              autoComplete="email"
              aria-label="Email"
              invalid={Boolean(touched.email && errors.email)}
            />
            {touched.email && errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <Field
              as={Input}
              name="password"
              type="password"
              placeholder="Password*"
              autoComplete="new-password"
              aria-label="Password"
              invalid={Boolean(touched.password && errors.password)}
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          {error && (
            <p className={styles.serverError} role="alert">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth disabled={isLoading || isSubmitting}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

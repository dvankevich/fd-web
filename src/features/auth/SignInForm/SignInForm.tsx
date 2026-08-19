import { Formik, Form, Field, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import type { LoginPayload } from '@shared/types';
import { PasswordField } from '../PasswordField';
import { AUTH_FIELD_LIMIT } from '../constants';
import { login } from '../operations';
import { selectAuthError, selectIsAuthLoading } from '../selectors';
import styles from './SignInForm.module.css';

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .max(AUTH_FIELD_LIMIT.emailMax, `Email must be at most ${AUTH_FIELD_LIMIT.emailMax} characters`)
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (
    values: LoginPayload,
    { setSubmitting }: FormikHelpers<LoginPayload>,
  ) => {
    const result = await dispatch(login({ ...values, email: values.email.trim() }));
    setSubmitting(false);

    if (login.fulfilled.match(result)) {
      onSuccess?.();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.field}>
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              autoComplete="email"
              aria-label="Email"
              className={styles.input}
            />
            {touched.email && errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <PasswordField
              name="password"
              placeholder="Password*"
              autoComplete="current-password"
              className={styles.input}
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
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

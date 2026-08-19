import { Formik, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormError, FormField } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import type { LoginPayload } from '@shared/types';
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
      {({ isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <FormField name="email" type="email" placeholder="Email*" autoComplete="email" />
          <FormField
            name="password"
            type="password"
            placeholder="Password*"
            autoComplete="current-password"
          />

          <FormError>{error}</FormError>

          <Button type="submit" fullWidth disabled={isLoading || isSubmitting}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

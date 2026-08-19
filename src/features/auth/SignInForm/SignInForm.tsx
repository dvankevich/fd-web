import { Formik, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { applyFieldErrors, hasFieldErrors } from '@shared/lib';
import { Button, FormError, FormField } from '@shared/ui';
import type { AppDispatch } from '@app/store';
import type { LoginPayload } from '@shared/types';
import { login } from '../operations';
import { clearError } from '../slice';
import { AUTH_SCHEMA } from '../validation';
import { selectAuthError, selectIsAuthLoading } from '../selectors';
import styles from './SignInForm.module.css';

const schema = Yup.object({
  email: AUTH_SCHEMA.email,
  password: AUTH_SCHEMA.currentPassword,
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
    { setSubmitting, setFieldError }: FormikHelpers<LoginPayload>,
  ) => {
    const result = await dispatch(login({ ...values, email: values.email.trim() }));
    setSubmitting(false);

    if (login.fulfilled.match(result)) {
      onSuccess?.();
      return;
    }

    const fields = result.payload?.fields;
    const unplaced = applyFieldErrors({ fields, values, setFieldError });

    if (hasFieldErrors(fields) && unplaced.length === 0) {
      dispatch(clearError());
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

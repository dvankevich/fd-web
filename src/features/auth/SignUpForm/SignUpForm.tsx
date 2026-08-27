import { Formik, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { applyFieldErrors, hasFieldErrors } from '@shared/lib';
import { Button, FormError } from '@shared/ui';
import { FormField } from '@shared/ui/FormField';
import type { AppDispatch } from '@app/store/store';
import type { RegisterPayload } from '@shared/types';
import { register } from '../operations';
import { clearError } from '../slice';
import { AUTH_SCHEMA } from '../validation';
import { selectAuthError, selectIsAuthLoading } from '../selectors';
import styles from '../SignInForm/SignInForm.module.css';
import { notify } from '@shared/lib';

const schema = Yup.object({
  name: AUTH_SCHEMA.name,
  email: AUTH_SCHEMA.email,
  password: AUTH_SCHEMA.newPassword,
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
    { setSubmitting, setFieldError }: FormikHelpers<RegisterPayload>,
  ) => {
    const result = await dispatch(
      register({ ...values, name: values.name.trim(), email: values.email.trim() }),
    );
    setSubmitting(false);

    if (register.fulfilled.match(result)) {
      notify.success('Account created!');
      onSuccess?.();
      return;
    }

    const fields = result.payload?.fields;
    const unplaced = applyFieldErrors({ fields, values, setFieldError });

    if (hasFieldErrors(fields) && unplaced.length === 0) {
      dispatch(clearError());
      return;
    }

    const message =
      result.payload?.message ??
      (typeof result.payload === 'string' ? result.payload : null) ??
      'Registration failed';

    notify.error(message);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <FormField name="name" type="text" placeholder="Name*" autoComplete="name" />
          <FormField name="email" type="email" placeholder="Email*" autoComplete="email" />
          <FormField
            name="password"
            type="password"
            placeholder="Password*"
            autoComplete="new-password"
          />

          <FormError>{error}</FormError>

          <Button type="submit" fullWidth disabled={isLoading || isSubmitting}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

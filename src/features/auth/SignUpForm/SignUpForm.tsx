import { Formik, Form, Field, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@shared/ui/Button';
import { register } from '@features/auth/operations';
import {
  selectIsAuthLoading,
  selectAuthError,
} from '@features/auth/selectors';
import type { AppDispatch } from '@app/store';
import type { RegisterPayload } from '@shared/types';
import styles from '../SignInForm/SignInForm.module.css';

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
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
    const result = await dispatch(register(values));
    setSubmitting(false);

    if (register.fulfilled.match(result)) {
      onSuccess?.();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.field}>
            <Field
              name="name"
              type="text"
              placeholder="Name*"
              className={styles.input}
            />
            {touched.name && errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>

          <div className={styles.field}>
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={styles.input}
            />
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <Field
              name="password"
              type="password"
              placeholder="Password*"
              className={styles.input}
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          {error && <p className={styles.serverError}>{error}</p>}

          <Button type="submit" fullWidth disabled={isLoading || isSubmitting}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

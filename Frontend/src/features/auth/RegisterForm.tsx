import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../../config/api';
import type { RegisterFormValues } from './registerSchema';
import { registerSchema } from './registerSchema';

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setServerError('');
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
      clearError(name);
    },
    [clearError]
  );

  const validate = (values: RegisterFormValues) => {
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach(({ path, message }) => {
        const key = path[0]?.toString() || 'form';
        fieldErrors[key] = message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);

    if (!validate(values)) {
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting form:', values);

      // Generate username from email (or replace with your logic)
      const username = values.email.split('@')[0];

      const res = await fetch(`${API_BASE_URL}/accounts/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: values.email, password: values.password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log('Response:', data);
      setSuccess(true);
      setValues(initialValues);
      setErrors({});
    } catch (err: any) {
      const backendError = err.message || 'Registration failed';
      console.error('Registration error:', backendError);
      setServerError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-sm rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>

      {serverError && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          Registration successful. You can now log in.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        {/** Email */}
        <InputField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
          required
        />

        {/** Password */}
        <InputField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password}
          required
        />

        {/** Confirm Password */}
        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}

function InputField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  required,
}: {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 ${
          error ? 'border-red-600' : ''
        }`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

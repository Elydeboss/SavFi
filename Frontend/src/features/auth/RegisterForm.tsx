// src/features/auth/RegisterForm.tsx
import { useState } from 'react';
import { api } from '../../lib/api'; // axios client configured with VITE_API_BASE_URL
import type { RegisterFormValues } from './registerSchema';
import { registerSchema } from './registerSchema';

export default function RegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);
    setLoading(true);

    // Client-side validation
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString() || 'form';
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting form:', values);

      // Only send fields required by backend
      const res = await api.post('/accounts/register/', {
        email: values.email,
        username: values.username?.trim() || values.email.split('@')[0],
        password: values.password,
      });

      console.log('Response:', res.data);
      setSuccess(true);
    } catch (err: any) {
      const backendError =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).join(', ') ||
        err.message ||
        'Registration failed';

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
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username (optional)
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={values.username || ''}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First name (optional)
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={values.firstName || ''}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last name (optional)
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={values.lastName || ''}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

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

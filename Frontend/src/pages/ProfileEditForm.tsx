import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string; // locked
  phone?: string;
  country: string;
  state: string;
};

type Props = {
  initial?: ProfileFormValues;
  onSave?: (values: ProfileFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

const DEFAULT_VALUES: ProfileFormValues = {
  firstName: 'Jolly',
  lastName: 'Akeju',
  email: 'Jollyakeju@gmail.com',
  phone: '+234',
  country: 'Nigeria',
  state: 'Lagos',
};

export default function ProfileEditForm({
  initial = DEFAULT_VALUES,
  onSave,
  onCancel,
}: Props) {
  const [values, setValues] = useState<ProfileFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Simple validation
  const errors = useMemo(() => {
    const e: Partial<Record<keyof ProfileFormValues, string>> = {};
    if (!values.firstName.trim()) e.firstName = 'First name is required';
    if (!values.lastName.trim()) e.lastName = 'Last name is required';
    if (!values.country.trim()) e.country = 'Country is required';
    if (!values.state.trim()) e.state = 'State is required';
    if (values.phone && !/^\+?\d{1,15}$/.test(values.phone.trim())) {
      e.phone = 'Enter a valid international number (e.g., +234...)';
    }
    return e;
  }, [values]);

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initial),
    [values, initial]
  );
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange = <K extends keyof ProfileFormValues>(
    key: K,
    val: ProfileFormValues[K]
  ) => {
    setValues((v) => ({ ...v, [key]: val }));
  };

  const handleBlur = (key: keyof ProfileFormValues) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleCancel = () => {
    setValues(initial);
    setTouched({});
    setMessage(null);
    onCancel?.();
  };

  const handleSave = async () => {
    setMessage(null);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      country: true,
      state: true,
    });

    if (!isValid) {
      setMessage({
        type: 'error',
        text: 'Please fix the errors before saving.',
      });
      return;
    }

    try {
      setSaving(true);
      await Promise.resolve(onSave?.(values));
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err) {
      console.error(err); // log the error
      setMessage({
        type: 'error',
        text: 'Failed to save changes. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* Container */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Card animated */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-4 sm:p-6 dark:bg-gray-700 dark:text-white"
        >
          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold">Edit profile</h2>
          <p className="text-sm text-neutral-600 mt-1 dark:text-gray">
            Update your personal details, contact information, and address.
          </p>

          {/* Feedback message */}
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message.text}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-700 dark:text-green-100 dark:border-green-600'
                    : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-700 dark:text-red-100 dark:border-red-600'
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sections */}
          <div className="mt-6 space-y-8">
            {/* Personal information */}
            <section>
              <h3 className="text-base font-semibold">Personal information</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm bg-gray  dark:bg-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500   dark:text-white dark:border-neutral-500"
                    placeholder="Jolly"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-300">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray  dark:bg-gray-800 dark:text-white dark:border-neutral-500"
                    placeholder="Akeju"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-300">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Contact information */}
            <section>
              <h3 className="text-base font-semibold">Contact information</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email (locked) */}
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    disabled
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm bg-neutral-100 text-neutral-700 cursor-not-allowed  dark:bg-gray-500 dark:text-neutral-200 dark:border-neutral-500"
                  />
                  <p className="mt-1 text-xs text-neutral-500 dark:text-gray">
                    Email is locked. Contact support to change.
                  </p>
                </div>

                {/* Phone (optional) */}
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone number (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={values.phone ?? ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray  dark:bg-gray-800 dark:text-white dark:border-neutral-500"
                    placeholder="+234"
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Address */}
            <section>
              <h3 className="text-base font-semibold">Address</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    value={values.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    onBlur={() => handleBlur('country')}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray  dark:bg-gray-800 dark:text-white dark:border-neutral-500"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                  {touched.country && errors.country && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-300">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium">
                    State
                  </label>
                  <select
                    id="state"
                    value={values.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray  dark:bg-gray-800   dark:text-white dark:border-neutral-500"
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja (FCT)">Abuja (FCT)</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Kaduna">Kaduna</option>
                  </select>
                  {touched.state && errors.state && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-300">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-medium transition ${
                saving
                  ? 'bg-blue-300 text-white cursor-wait'
                  : isDirty
                  ? 'bg-blue text-white hover:bg-blue-700'
                  : 'bg-blue  text-white cursor-not-allowed'
              }`}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-medium border border-blue text-blue-600 bg-white hover:bg-blue-50 dark:bg-gray-700  dark:text-white dark:border-blue-600 dark:hover:bg-neutral-500"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

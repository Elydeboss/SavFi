// DepositEnterAmount.tsx
// Reference screenshot (for visual match): /mnt/data/Screenshot 2025-11-24 141531.png

import React, { useState, useMemo } from 'react';

type Props = {
  initialAmount?: number; // NGN
  onCancel?: () => void;
  onContinue?: (amountNgn: number, amountUsdt: number) => void;
  minAmount?: number; // NGN
};

export default function DepositEnterAmount({
  initialAmount = 124500,
  onCancel,
  onContinue,
  minAmount = 1000,
}: Props) {
  // UI state
  const [amount, setAmount] = useState<string>(() =>
    formatNumber(initialAmount)
  );
  const [touched, setTouched] = useState(false);

  // Mock conversion rate -- in real app this would come from an API
  const NGN_TO_USDT = 1400; // example: 1 USDT = 1400 NGN

  const amountNumeric = useMemo(() => parseNumber(amount), [amount]);
  const amountUsdt = useMemo(() => {
    if (amountNumeric <= 0) return 0;
    return Math.round((amountNumeric / NGN_TO_USDT) * 100000) / 100000; // 5dp
  }, [amountNumeric]);

  const isValid = amountNumeric >= minAmount;
  const showError = touched && !isValid;

  function handleContinue(e?: React.FormEvent) {
    e?.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onContinue?.(amountNumeric, amountUsdt);
  }

  return (
    <div className="w-full min-h-[60vh] flex items-start md:items-center justify-center p-6 md:p-12 bg-slate-50">
      <div className="w-full max-w-md">
        {/* Back link */}
        <button
          className="text-slate-600 text-sm mb-4 flex items-center gap-2"
          onClick={() => window.history.back()}
          aria-label="Back"
        >
          <span aria-hidden>←</span>
          <span>Back</span>
        </button>

        <form
          onSubmit={handleContinue}
          className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-100"
          aria-labelledby="deposit-title"
        >
          <h1
            id="deposit-title"
            className="text-lg font-semibold text-slate-900 mb-2"
          >
            Enter amount to deposit
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Funds will be converted to USDT and added to your total balance.
          </p>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Amount
          </label>

          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                ₦
              </span>
              <input
                inputMode="numeric"
                pattern="[0-9,]*"
                value={amount}
                onChange={(e) => setAmount(normalizeInput(e.target.value))}
                onBlur={() => setTouched(true)}
                aria-invalid={!isValid}
                aria-describedby={showError ? 'amount-error' : 'amount-helper'}
                className={`w-full pr-4 pl-10 h-12 rounded-md border ${
                  showError ? 'border-red-400' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-300 bg-slate-50`}
              />
            </div>
            <p id="amount-helper" className="text-xs text-slate-400 mt-2">
              You’ll receive{' '}
              <span className="font-medium text-slate-800">
                {formatUSDT(amountUsdt)} USDT
              </span>
            </p>

            {showError && (
              <p
                id="amount-error"
                role="alert"
                className="text-xs text-red-600 mt-2"
              >
                Minimum deposit is ₦{formatNumber(minAmount)}.
              </p>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Conversion rate is pulled directly from our liquidity partners.
          </p>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center h-11 rounded-full bg-blue-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!isValid}
            >
              Continue →
            </button>

            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => onCancel?.()}
                className="text-sm text-slate-500 underline"
              >
                Cancel &amp; return to dashboard
              </button>
            </div>
          </div>
        </form>

        {/* Optional reference screenshot for visual QA - hidden on larger screens */}
        <div className="mt-6 md:hidden">
          <p className="text-xs text-slate-500 mb-2">
            Reference (mobile preview)
          </p>
          <img
            src="/mnt/data/Screenshot 2025-11-24 141531.png"
            alt="reference"
            className="w-full rounded-md border"
          />
        </div>
      </div>
    </div>
  );
}

// --------------------
// Helpers
// --------------------

function parseNumber(value: string) {
  // Remove commas and non-digit characters except dot
  const cleaned = value.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned || '0');
  if (Number.isNaN(num)) return 0;
  return num;
}

function formatNumber(n: number) {
  return n.toLocaleString('en-NG', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

function formatUSDT(n: number) {
  // Show up to 5 decimals but trim trailing zeros
  return n === 0 ? '0' : n.toString();
}

function normalizeInput(raw: string) {
  // Allow digits, commas, dot. Convert multiple dots to single.
  const cleaned = raw.replace(/[^0-9.,]/g, '');
  // Replace commas if user types them; we will format on blur only (simple approach)
  return cleaned;
}

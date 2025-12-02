import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// --------------------
// Helpers
// --------------------
function parseNumber(value: string) {
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
  return n === 0 ? '0' : n.toString();
}
function normalizeInput(raw: string) {
  return raw.replace(/[^0-9.,]/g, '');
}

// --------------------
// DepositEnterAmount
// --------------------
export default function DepositEnterAmount({
  initialAmount = 124500,
  onCancel,
  onContinue,
  minAmount = 1000,
}: {
  initialAmount?: number;
  onCancel?: () => void;
  onContinue?: (amountNgn: number, amountUsdt: number) => void;
  minAmount?: number;
}) {
  const [amount, setAmount] = useState<string>(() =>
    formatNumber(initialAmount)
  );
  const [touched, setTouched] = useState(false);

  const NGN_TO_USDT = 1400;
  const amountNumeric = useMemo(() => parseNumber(amount), [amount]);
  const amountUsdt = useMemo(() => {
    if (amountNumeric <= 0) return 0;
    return Math.round((amountNumeric / NGN_TO_USDT) * 100000) / 100000;
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
    <div className="w-full min-h-[60vh] flex flex-col justify-center p-6 md:p-12 md:pt-2 bg-neutral-50 dark:bg-gray-900">
      <button
        className="text-muted-foreground text-sm mb-7 flex items-center -ml-7 cursor-pointer"
        onClick={() => onCancel?.()}
      >
        <ChevronLeft /> Back
      </button>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleContinue}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 border border-border"
        >
          <h1 className="text-lg font-semibold text-foreground mb-2">
            Enter amount to deposit
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Funds will be converted to USDT and added to your total balance.
          </p>
          <label className="block text-sm font-medium text-foreground mb-2">
            Amount
          </label>
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                ₦
              </span>
              <input
                inputMode="numeric"
                pattern="[0-9,]*"
                value={amount}
                onChange={(e) => setAmount(normalizeInput(e.target.value))}
                onBlur={() => setTouched(true)}
                className={`w-full pr-4 pl-10 h-12 rounded-md border ${
                  showError ? 'border-red-400' : 'border-border'
                } focus:outline-none focus:ring-2 focus:ring-blue-300 bg-neutral-50 dark:bg-gray-900 text-foreground`}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              You'll receive{' '}
              <span className="font-medium text-foreground">
                {formatUSDT(amountUsdt)} USDT
              </span>
            </p>
            {showError && (
              <p className="text-xs text-red-600 mt-2">
                Minimum deposit is ₦{formatNumber(minAmount)}.
              </p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full h-11 rounded-full bg-blue text-white font-semibold disabled:opacity-60 cursor-pointer"
              disabled={!isValid}
            >
              Continue <ChevronRight className="inline-block ml-2" />
            </button>
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => onCancel?.()}
                className="text-sm text-muted-foreground underline"
              >
                Cancel & return to dashboard
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// --------------------
// DepositBankDetails
// --------------------
export function DepositBankDetails({
  accountNumber = '8123456789',
  bankName = 'Providus',
  accountName = 'Paystack check',
  amountToPay,
  onContinue,
  onCancel,
}: {
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
  amountToPay: number;
  onContinue?: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="w-full min-h-[60vh] flex justify-center p-6 md:p-12 bg-neutral-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border">
          <h1 className="text-lg font-semibold text-foreground mb-2">
            Send NGN to this Account Details
          </h1>
          <div className="bg-slate-50 border rounded-xl p-5 mb-4">
            <div className="mb-4">
              <label className="text-xs text-slate-500">
                Virtual Account Number
              </label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-blue font-semibold text-lg">
                  {accountNumber}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(accountNumber)}
                  className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-xs"
                >
                  ⧉
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs text-slate-500">Bank Name</label>
              <p className="text-slate-800 font-medium mt-1">{bankName}</p>
            </div>
            <div className="mb-3">
              <label className="text-xs text-slate-500">Account Name</label>
              <p className="text-slate-800 font-medium mt-1">{accountName}</p>
            </div>
            <div>
              <label className="text-xs text-slate-500">Amount to pay</label>
              <p className="text-slate-800 font-medium mt-1">
                ₦{amountToPay.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => onContinue?.()}
            className="w-full h-11 rounded-full bg-blue text-white font-semibold"
          >
            I have made the transfer
          </button>
          <div className="mt-3 text-center">
            <button
              onClick={() => onCancel?.()}
              className="text-sm text-slate-500 underline"
            >
              Cancel & return to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

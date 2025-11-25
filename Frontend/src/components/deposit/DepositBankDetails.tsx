// DepositBankDetails.tsx
// Screenshot reference: /mnt/data/Screenshot 2025-11-24 142457.png

import React from 'react';

type Props = {
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
  amountToPay: number; // ← required so amount always passes through
  onContinue?: () => void; // "I have made the transfer"
  onCancel?: () => void; // back button → return to Deposit Amount
};

export default function DepositBankDetails({
  accountNumber = '8123456789',
  bankName = 'Providus',
  accountName = 'Paystack check',
  amountToPay,
  onContinue,
  onCancel,
}: Props) {
  return (
    <div className="w-full min-h-[60vh] flex justify-center p-6 md:p-12 bg-slate-50">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          className="text-slate-600 text-sm mb-4 flex items-center gap-2 cursor-pointer"
          onClick={() => onCancel?.()}
        >
          <span aria-hidden>←</span> Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-100">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            Send NGN to this Account Details
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Use the exact amount to ensure instant confirmation
          </p>

          {/* Account Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative mb-4">
            {/* Account Number */}
            <div className="mb-4">
              <label className="text-xs text-slate-500">
                Virtual Account Number
              </label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-blue-600 font-semibold text-lg">
                  {accountNumber}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(accountNumber)}
                  aria-label="Copy account number"
                  className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-xs cursor-pointer"
                >
                  ⧉
                </button>
              </div>
            </div>

            {/* Bank Name */}
            <div className="mb-3">
              <label className="text-xs text-slate-500">Bank Name</label>
              <p className="text-slate-800 font-medium mt-1">{bankName}</p>
            </div>

            {/* Account Name */}
            <div className="mb-3">
              <label className="text-xs text-slate-500">Account Name</label>
              <p className="text-slate-800 font-medium mt-1">{accountName}</p>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs text-slate-500">Amount to pay</label>
              <p className="text-slate-800 font-medium mt-1">
                ₦{amountToPay.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <span className="text-slate-500 text-lg">ⓘ</span>
            Most transactions confirm within 1–5 minutes
          </div>

          {/* Instructions */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-slate-700 mb-6">
            <p className="font-medium mb-1">How to send</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Copy the account number</li>
              <li>Complete the transfer in your banking app</li>
              <li>Return here and tap “I have made the transfer”</li>
            </ul>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => onContinue?.()}
            className="w-full h-11 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center cursor-pointer"
          >
            I have made the transfer
          </button>

          {/* Cancel */}
          <div className="mt-3 text-center">
            <button
              onClick={() => onCancel?.()}
              className="text-sm text-slate-500 underline cursor-pointer"
            >
              Cancel &amp; return to dashboard
            </button>
          </div>
        </div>

        {/* Reference Image */}
        <div className="mt-6 md:hidden">
          <p className="text-xs text-slate-500 mb-2">
            Reference (mobile preview)
          </p>
          <img
            src="/mnt/data/Screenshot 2025-11-24 142457.png"
            alt="reference"
            className="w-full rounded-md border"
          />
        </div>
      </div>
    </div>
  );
}

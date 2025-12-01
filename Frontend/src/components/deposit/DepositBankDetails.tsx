import { ChevronLeft } from 'lucide-react';
type Props = {
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
  amountToPay: number;
  onContinue?: () => void;
  onCancel?: () => void;
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
    <div className="w-full max-w-md">
      {/* Back Button */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 md:p-8 border border-border">
        <button
          className="text-muted-foreground text-sm mb-5 flex items-center -ml-5 cursor-pointer"
          onClick={() => onCancel?.()}
        >
          <ChevronLeft /> Back
        </button>
        <h1 className="text-lg font-semibold text-foreground mb-2">
          Send NGN to this Account Details
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Use the exact amount to ensure instant confirmation
        </p>

        {/* Account Box */}
        <div className="bg-neutral-50 dark:bg-gray-900 border border-border rounded-xl p-5 relative mb-4">
          {/* Account Number */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground">
              Virtual Account Number
            </label>
            <div className="flex items-center justify-between mt-1">
              <span className="text-blue font-semibold text-lg">
                {accountNumber}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(accountNumber)}
                aria-label="Copy account number"
                className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600 flex items-center justify-center text-xs cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600 dark:text-blue-300"
                >
                  <path
                    d="M5 9.1665C5 6.80948 5 5.63097 5.73223 4.89874C6.46447 4.1665 7.64298 4.1665 10 4.1665H12.5C14.857 4.1665 16.0355 4.1665 16.7678 4.89874C17.5 5.63097 17.5 6.80948 17.5 9.1665V13.3332C17.5 15.6902 17.5 16.8687 16.7678 17.6009C16.0355 18.3332 14.857 18.3332 12.5 18.3332H10C7.64298 18.3332 6.46447 18.3332 5.73223 17.6009C5 16.8687 5 15.6902 5 13.3332V9.1665Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332V8.33317C2.5 5.19047 2.5 3.61913 3.47631 2.64281C4.45262 1.6665 6.02397 1.6665 9.16667 1.6665H12.5C13.8807 1.6665 15 2.78579 15 4.1665"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Bank Name */}
          <div className="mb-3">
            <label className="text-xs text-muted-foreground">Bank Name</label>
            <p className="text-foreground font-medium mt-1">{bankName}</p>
          </div>

          {/* Account Name */}
          <div className="mb-3">
            <label className="text-xs text-muted-foreground">
              Account Name
            </label>
            <p className="text-foreground font-medium mt-1">{accountName}</p>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs text-muted-foreground">
              Amount to pay
            </label>
            <p className="text-foreground font-medium mt-1">
              ₦{amountToPay.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="text-muted-foreground text-lg">ⓘ</span>
          Most transactions confirm within 1-5 minutes
        </div>

        {/* Instructions */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-sm text-foreground mb-6">
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
          className="w-full h-11 rounded-full bg-blue text-white font-semibold flex items-center justify-center cursor-pointer"
        >
          I have made the transfer
        </button>

        {/* Cancel */}
        <div className="mt-3 text-center">
          <button
            onClick={() => onCancel?.()}
            className="text-sm text-muted-foreground underline cursor-pointer"
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
  );
}

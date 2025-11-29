import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const walletAddress = '0x1A2b25dbduF4DSinciNHC3D4';

export default function DepositUSDT({
  onBack,
  onClose,
}: {
  onBack?: () => void;
  onClose?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 text-foreground">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBack}
          className="text-blue text-sm font-medium hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Deposit USDT</h1>
      </div>

      {/* Description */}
      <p className="text-sm mb-4">
        Receive USDT to your SaveFi wallet. Send USDT using{' '}
        <strong>TRC-20</strong> network only to this wallet.
      </p>

      {/* Wallet Address */}
      <div className="bg-neutral-100 dark:bg-gray-800 rounded-xl p-4 mb-4">
        <label className="text-xs text-muted-foreground mb-1 block">
          Your USDT wallet address (TRC-20)
        </label>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-mono break-all">{walletAddress}</span>
          <button
            onClick={handleCopy}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          ⓘ This address is generated automatically for your SaveFi account
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-6 bg-white p-4 rounded-xl">
        <QRCodeSVG value={walletAddress} size={128} />
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">⚠️ Important</p>
        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
          Only send USDT on TRC-20 network. Sending other coins or using a
          different network may result in a permanent loss of funds.
        </p>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2">How to deposit</h2>
        <ul className="list-disc list-inside text-sm text-foreground space-y-1">
          <li>Copy your USDT wallet address above</li>
          <li>Open your external wallet (Metamask, Trust, OKX etc.)</li>
          <li>Choose Send USDT and paste address</li>
          <li>Confirm transaction</li>
          <li>
            Return to SaveFi. Your deposit will reflect once confirmed on-chain
          </li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2">
          ⓘ Most transactions confirm within 1–5 minutes
        </p>
      </div>

      {/* Footer */}
      <div className="text-center">
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-full bg-blue hover:bg-blue-300 text-white font-semibold"
        >
          Return to dashboard
        </button>
      </div>
    </div>
  );
}

import DepositModalWrapper from './DepositModalWrapper';

type Props = {
  isOpen: boolean;
  onRetry: () => void;
  onClose: () => void;
};

export default function DepositFailed({ isOpen, onRetry, onClose }: Props) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center text-center py-6">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-red-600 text-2xl">✕</span>
        </div>

        <h2 className="text-lg font-semibold text-slate-900">Deposit Failed</h2>
        <p className="text-sm text-slate-600 mt-2">
          We couldn't verify your transfer. You may try again.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
          >
            Retry
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </DepositModalWrapper>
  );
}

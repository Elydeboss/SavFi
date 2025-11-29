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
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
          <span className="text-red-600 dark:text-red-400 text-2xl">✕</span>
        </div>

        <h2 className="text-lg font-semibold text-foreground">Deposit Failed</h2>
        <p className="text-sm text-muted-foreground mt-2">
          We couldn't verify your transfer. You may try again.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-full bg-blue hover:bg-blue-300 text-white font-semibold cursor-pointer"
          >
            Retry
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600 text-foreground font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </DepositModalWrapper>
  );
}

import DepositModalWrapper from './DepositModalWrapper';
import progress from '../../assets/menu/Progress.png';

type Props = { isOpen: boolean };

export default function DepositVerifyingTransfer({ isOpen }: Props) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center justify-center text-center py-6">
        <div className="flex justify-center mb-4 animate-spin">
          <img src={progress} alt="loading icon" className=" h-12 w-12 " />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Verifying Transfer…
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          Please wait while we confirm your payment.
        </p>
      </div>
    </DepositModalWrapper>
  );
}

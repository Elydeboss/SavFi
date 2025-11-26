const VerifyingModal = () => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-neutral-50/95 rounded-2xl max-w-md w-full p-8 shadow-xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          {/* Spinner */}
          <div className="w-16 h-16 mb-6">
            <div className="w-full h-full border-4 border-blue border-t-neutral-200 rounded-full animate-spin"></div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3">
            Verifying your transfer
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your withdrawal is being processed, This usually takes 1-3 minutes.
            Please keep this window open while we verify your withdrawal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyingModal;

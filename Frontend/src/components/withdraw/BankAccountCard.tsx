interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface BankAccountCardProps {
  account: BankAccount;
  selected: boolean;
  onSelect: () => void;
}

const BankAccountCard = ({
  account,
  selected,
  onSelect,
}: BankAccountCardProps) => {
  const maskAccountNumber = (num: string) => {
    return "******" + num.slice(-4);
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        selected
          ? "border-blue"
          : " bg-neutral border-neutral-200 hover:border-blue/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            selected ? "border-blue" : "border-neutral-200"
          }`}
        >
          {selected && <div className="w-3 h-3 rounded-full bg-blue"></div>}
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-blue font-bold text-sm">
              {account.bankName.substring(0, 2).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">
              {account.bankName}
            </p>
            <p className="text-sm text-muted-foreground">
              {maskAccountNumber(account.accountNumber)}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default BankAccountCard;

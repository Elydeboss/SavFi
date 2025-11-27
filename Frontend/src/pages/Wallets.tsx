import Breadcrumb from "../components/Breadcrumb";
import {
  ExternalLink,
  Copy,
  Trash2,
  Plus,
  ChevronRight,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import Toast from "../components/withdraw/Toast";

export default function Wallets() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  // NEW: State management for wallets and bank accounts
  const [additionalWallets, setAdditionalWallets] = useState([
    { id: 1, name: "Metamask", address: "0X1A2b...C8G0", icon: "M" },
  ]);

  const [linkedBankAccounts, setLinkedBankAccounts] = useState([
    { id: 1, name: "Opay bank", accountNumber: "****4567", icon: "OPY" },
  ]);

  // NEW: Modal states
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showSetActiveModal, setShowSetActiveModal] = useState(false);
  const [showDeleteWalletModal, setShowDeleteWalletModal] = useState(false);
  const [showRemoveBankModal, setShowRemoveBankModal] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  const [activeWalletId, setActiveWalletId] = useState<number | null>(null); // Track the active wallet ID

  // NEW: Form states for modals
  const [newWalletType, setNewWalletType] = useState("");
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [newBankAccountNumber, setNewBankAccountNumber] = useState("");
  const [newBankAccountName, setNewBankAccountName] = useState("");

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setToast({ message: "Address copied to clipboard", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="bg-neutral-200 dark:bg-gray-600 dark:text-white  min-h-screen">
      <div className="">
        <div className="px-3">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl space-y-8">
              <Breadcrumb
                items={[
                  { label: "Profile", href: "/profile" },
                  { label: "Wallet & accounts" },
                ]}
              />

              <div className="space-y-4">
                {/* Primary wallet */}

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Primary wallet</h2>
                  <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          {activeWalletId
                            ? additionalWallets.find(
                                (wallet) => wallet.id === activeWalletId
                              )?.name
                            : "Google MPC"}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-lg font-mono font-semibold">
                            {activeWalletId
                              ? additionalWallets.find(
                                  (wallet) => wallet.id === activeWalletId
                                )?.address
                              : "0x1A2b...C3D4"}
                          </p>
                          <button
                            onClick={() =>
                              copyAddress(
                                activeWalletId
                                  ? additionalWallets.find(
                                      (wallet) => wallet.id === activeWalletId
                                    )?.address || ""
                                  : "0x1A2b...C3D4"
                              )
                            }
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        {activeWalletId && (
                          <p className="text-sm font-medium w-fit bg-green-100 text-green-500 px-3 py-1 rounded-2xl mb-3">
                            Active wallet
                          </p>
                        )}
                        {/* NEW: View on explorer link */}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setToast({
                              message: "Opening blockchain explorer...",
                              type: "success",
                            });
                            setTimeout(() => setToast(null), 3000);
                          }}
                          className="inline-flex items-center gap-2 text-sm text-blue font-semibold hover:underline"
                        >
                          View on explorer
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex justify-center md:justify-end">
                        <div className="w-32 h-32 bg-neutral-200 p-2 rounded-lg">
                          <QrCode className="w-full h-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* NEW: Additional wallets section with dynamic content and conditional delete buttons */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Additional wallets
                  </h2>

                  <div className="space-y-3">
                    {additionalWallets.map((wallet) => (
                      <div
                        key={wallet.id}
                        className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {wallet.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {wallet.name}
                              </p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {wallet.address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* NEW: Set as active button */}
                            <button
                              onClick={() => {
                                setActiveWalletId(wallet.id); // Set selected wallet as active
                                setShowSetActiveModal(true);
                              }}
                              className={`text-sm font-medium rounded-lg py-1 px-3 ${
                                activeWalletId === wallet.id
                                  ? "bg-green-100 text-green-500" // Active button style
                                  : "bg-blue-100 text-blue-500" // Set as Active style
                              }`}
                            >
                              {activeWalletId === wallet.id
                                ? "Active"
                                : "Set as active"}{" "}
                              {/* Change button text */}
                            </button>
                            {/* NEW: Delete button - only show if more than one wallet */}
                            {additionalWallets.length > 1 && (
                              <button
                                onClick={() => {
                                  setSelectedWalletId(wallet.id);
                                  setShowDeleteWalletModal(true);
                                }}
                                className="p-2 text-red-500 bg-red-100 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* NEW: Connect wallet button with modal trigger */}
                    <div className="flex justify-center mb-6">
                      <button
                        onClick={() => setShowConnectWalletModal(true)}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue text-blue hover:bg-[#E9F4FD] dark:hover:bg-none cursor-pointer hover:text-blue rounded-full semibold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Connect wallet
                      </button>
                    </div>
                  </div>
                </div>
                {/*  */}
                {/* NEW: Linked bank accounts section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Linked bank accounts
                  </h2>

                  <div className="space-y-3 mb-4">
                    {linkedBankAccounts.map((bank) => (
                      <div
                        key={bank.id}
                        className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              {bank.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{bank.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {bank.accountNumber}
                              </p>
                            </div>
                          </div>

                          {/* NEW: Delete button - only show if more than one bank account */}
                          {linkedBankAccounts.length > 1 && (
                            <button
                              onClick={() => {
                                setSelectedBankId(bank.id);
                                setShowRemoveBankModal(true);
                              }}
                              className="p-2 text-red-500 bg-red-100 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* NEW: Add bank account button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowAddBankModal(true)}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue text-blue hover:bg-[#E9F4FD] dark:hover:bg-none cursor-pointer hover:text-blue rounded-full semibold transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add bank account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Connect wallet modal */}
      {showConnectWalletModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-50 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-2">Connect new wallet</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Link an external crypto wallet for deposits and withdrawals.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Select wallet
                </label>
                {/* NEW: Controlled select input */}
                <select
                  value={newWalletType}
                  onChange={(e) => setNewWalletType(e.target.value)}
                  className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  <option value="">Choose wallet</option>
                  <option value="Metamask">Metamask</option>
                  <option value="Trust Wallet">Trust Wallet</option>
                  <option value="Coinbase Wallet">Coinbase Wallet</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Enter wallet address
                </label>
                {/* NEW: Controlled input */}
                <input
                  type="text"
                  placeholder="e.g 0x1A2b3C4d5E6f..."
                  value={newWalletAddress}
                  onChange={(e) => setNewWalletAddress(e.target.value)}
                  className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>

              {/* NEW: Connect wallet button with functionality */}
              <button
                onClick={() => {
                  if (newWalletType && newWalletAddress) {
                    const newWallet = {
                      id: additionalWallets.length + 1,
                      name: newWalletType,
                      address:
                        newWalletAddress.substring(0, 6) +
                        "..." +
                        newWalletAddress.substring(newWalletAddress.length - 4),
                      icon: newWalletType.substring(0, 1).toUpperCase(),
                    };
                    setAdditionalWallets([...additionalWallets, newWallet]);

                    setToast({
                      message: "Wallet connected successfully",
                      type: "success",
                    });
                    setTimeout(() => setToast(null), 3000);
                    setShowConnectWalletModal(false);
                    setNewWalletType("");
                    setNewWalletAddress("");
                  } else {
                    setToast({
                      message: "Please fill in all fields",
                      type: "success",
                    });
                    setTimeout(() => setToast(null), 3000);
                  }
                }}
                className="w-full py-3 bg-blue hover:bg-blue/80 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Connect wallet
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Add bank account modal */}
      {showAddBankModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-50 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-2">Add bank account</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Add a Nigerian naira bank account to receive your withdrawal
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Select bank
                </label>
                {/* NEW: Controlled select input */}
                <select
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                  className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  <option value="">Choose bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="Citibank">Citibank</option>
                  <option value="Ecobank">Ecobank</option>
                  <option value="FCMB">FCMB</option>
                  <option value="First Bank">First Bank</option>
                  <option value="GTBank">GTBank</option>
                  <option value="Heritage Bank">Heritage Bank</option>
                  <option value="Keystone Bank">Keystone Bank</option>
                  <option value="Opay bank">Opay bank</option>
                  <option value="Polaris Bank">Polaris Bank</option>
                  <option value="Providus Bank">Providus Bank</option>
                  <option value="Stanbic IBTC">Stanbic IBTC</option>
                  <option value="Stanbic Chartered">Stanbic Chartered</option>
                  <option value="Sterling Bank">Sterling Bank</option>
                  <option value="UBA">UBA</option>
                  <option value="Union Bank">Union Bank</option>
                  <option value="Unity Bank">Unity Bank</option>
                  <option value="Wema Bank">Wema Bank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Enter account number
                </label>
                {/* NEW: Controlled input */}
                <input
                  type="text"
                  placeholder="e.g 0123456789"
                  value={newBankAccountNumber}
                  onChange={(e) => setNewBankAccountNumber(e.target.value)}
                  className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Account name
                </label>
                {/* NEW: Controlled input */}
                <input
                  type="text"
                  placeholder="John Doe"
                  value={newBankAccountName}
                  onChange={(e) => setNewBankAccountName(e.target.value)}
                  className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-md">
                <div className="text-primary text-xs">ℹ️</div>
                <p className="text-xs text-primary">
                  Your bank name must match your KYC to avoid failed withdrawals
                </p>
              </div>

              {/* NEW: Add bank button with functionality */}
              <button
                onClick={() => {
                  if (
                    newBankName &&
                    newBankAccountNumber &&
                    newBankAccountName
                  ) {
                    const newBank = {
                      id: linkedBankAccounts.length + 1,
                      name: newBankName,
                      accountNumber:
                        "****" +
                        newBankAccountNumber.substring(
                          newBankAccountNumber.length - 4
                        ),
                      icon: newBankName.substring(0, 3).toUpperCase(),
                    };
                    setLinkedBankAccounts([...linkedBankAccounts, newBank]);

                    setToast({
                      message: "Bank account added successfully",
                      type: "success",
                    });
                    setTimeout(() => setToast(null), 3000);
                    setShowAddBankModal(false);
                    setNewBankName("");
                    setNewBankAccountNumber("");
                    setNewBankAccountName("");
                  } else {
                    setToast({
                      message: "Please fill in all fields",
                      type: "error",
                    });
                    setTimeout(() => setToast(null), 3000);
                  }
                }}
                className="w-full py-3 bg-blue hover:bg-blue/80 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Set as active wallet modal */}
      {showSetActiveModal && (
        <div
          onClick={() => setShowSetActiveModal(false)}
          className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-neutral-50 rounded-lg max-w-md w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Set as active wallet?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Switching your wallet won't move existing funds. If you want all
              funds to appear under new active wallet, transfer your balance
              before switching.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowSetActiveModal(false)}
                className="flex-1 h-10 px-4 py-2 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedWalletId) {
                    setActiveWalletId(selectedWalletId); // Set selected wallet as active
                    setToast({
                      message: "Wallet set as active",
                      type: "success",
                    });
                    setTimeout(() => setToast(null), 3000);
                    setShowSetActiveModal(false); // Close the modal
                  }
                }} // Confirm button
                className="flex-1 h-10 px-4 py-2 bg-primary text-blue rounded-md font-semibold hover:bg-primary/90 transition-colors text-sm"
              >
                Set as active
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Delete wallet modal */}
      {showDeleteWalletModal && (
        <div
          onClick={() => setShowDeleteWalletModal(false)}
          className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-neutral-50 rounded-lg max-w-md w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Delete wallet?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Removing this wallet will disconnect it from your SaveFi account.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You'll no longer be able to use this wallet for deposits or
              withdrawals. If this is your active wallet, make sure your balance
              is moved to another wallet before deleting.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  if (selectedWalletId) {
                    setAdditionalWallets(
                      additionalWallets.filter((w) => w.id !== selectedWalletId)
                    );

                    setToast({
                      message: "Wallet deleted successfully",
                      type: "error",
                    });
                    setTimeout(() => setToast(null), 3000);
                  }
                  setShowDeleteWalletModal(false);
                  setSelectedWalletId(null);
                }}
                className="flex-1 h-10 px-4 py-2 bg-destructive text-red-500 cursor-pointer rounded-md font-semibold hover:bg-destructive/90 transition-colors text-sm"
              >
                Delete wallet
              </button>
              <button
                onClick={() => setShowDeleteWalletModal(false)}
                className="flex-1 h-10 px-4 py-2 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Remove bank account modal */}
      {showRemoveBankModal && (
        <div
          onClick={() => setShowRemoveBankModal(false)}
          className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-neutral-50 rounded-lg max-w-md w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Remove bank account?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This bank account will no longer be available for withdrawals. you
              can add it again anytime.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              N.B: make sure you don't have a withdrawal currently processing to
              this account
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowRemoveBankModal(false)}
                className="flex-1 h-10 px-4 py-2 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedBankId) {
                    setLinkedBankAccounts(
                      linkedBankAccounts.filter((b) => b.id !== selectedBankId)
                    );

                    setToast({
                      message: "Bank account removed successfully",
                      type: "success",
                    });
                    setTimeout(() => setToast(null), 3000);
                  }
                  setShowRemoveBankModal(false);
                  setSelectedBankId(null);
                }}
                className="flex-1 h-10 px-4 py-2 bg-destructive text-red-500 rounded-md font-semibold cursor-pointer hover:bg-destructive/90 transition-colors text-sm"
              >
                Remove bank account
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

import Breadcrumb from "../components/Breadcrumb";
import {
  ExternalLink,
  Copy,
  Trash2,
  Plus,
  ChevronRight,
  QrCode,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import Toast from "../components/withdraw/Toast";
import { useUserProfile } from "../contexts/UserProfileContext";
import { getMetaMaskDeepLink } from "../lib/api";

interface WalletAddress {
  address: string;
  type: string;
  isActive: boolean;
}

const API_BASE = "https://wallet-api-55mt.onrender.com";

export default function Wallets() {
  const { wallet, setWallet } = useUserProfile();
  const [toast, setToast] = useState<{
    message: string;
    description?: string;
    type: "success" | "error";
  } | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [additionalWallets, setAdditionalWallets] = useState<WalletAddress[]>(
    []
  );

  const [linkedBankAccounts, setLinkedBankAccounts] = useState([
    { id: 1, name: "Opay bank", accountNumber: "****4567", icon: "OPY" },
  ]);

  // NEW: Modal states
  //const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  //const [showSetActiveModal, setShowSetActiveModal] = useState(false);
  //const [showDeleteWalletModal, setShowDeleteWalletModal] = useState(false);
  const [showRemoveBankModal, setShowRemoveBankModal] = useState(false);
  //const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  //const [activeWalletId, setActiveWalletId] = useState<number | null>(null); // Track the active wallet ID

  // NEW: Form states for modals

  const [newBankName, setNewBankName] = useState("");
  const [newBankAccountNumber, setNewBankAccountNumber] = useState("");
  const [newBankAccountName, setNewBankAccountName] = useState("");

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setToast({ message: "Address copied to clipboard", type: "success" });
  };

  useEffect(() => {
    // Parse wallet addresses from backend
    if (wallet?.addresses && Array.isArray(wallet.addresses)) {
      const wallets = wallet.addresses.map((addr, index) => ({
        address: addr,
        type: addr.startsWith("0x") ? "MetaMask" : "SaveFi",
        isActive: index === 0,
      }));
      setAdditionalWallets(wallets);
    }
  }, [wallet]);

  const formatWalletAddress = (address: string) => {
    if (!address || address.length < 10) return address || "No wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectWallet = async () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (typeof (window as any).ethereum === "undefined") {
      if (isMobile) {
        const deepLink = getMetaMaskDeepLink();
        if (deepLink) {
          window.location.href = deepLink;
          return;
        }
      }
      setToast({
        message: "Metamask not found",
        description: isMobile
          ? "Opening MetaMask app..."
          : "Please install MetaMask to continue",
        type: "error",
      });

      return;
    }

    try {
      setIsConnecting(true);

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const newWalletAddress = accounts[0];

      // Check if address already exists
      if (
        additionalWallets.some(
          (w) => w.address.toLowerCase() === newWalletAddress.toLowerCase()
        )
      ) {
        setToast({
          message: "Wallet already connected",
          description: "This wallet address is already linked to your account",
          type: "error",
        });

        return;
      }

      // Add wallet to backend
      const authToken = localStorage.getItem("authToken");
      const currentAddresses = wallet?.addresses || [];

      const response = await fetch(`${API_BASE}/wallets/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: wallet?.owner || localStorage.getItem("username"),
          addresses: [...currentAddresses, newWalletAddress],
          idempotency_key: `wallet-update-${Date.now()}`,
        }),
      });

      if (response.ok || response.status === 201) {
        const updatedWallet = await response.json();
        setWallet(updatedWallet);

        setToast({
          message: "Wallet connected!",
          description: `${formatWalletAddress(
            newWalletAddress
          )} has been added to your account`,
          type: "success",
        });
      } else {
        // Try to update existing wallet via PUT or just add locally
        setAdditionalWallets((prev) => [
          ...prev,
          {
            address: newWalletAddress,
            type: "MetaMask",
            isActive: false,
          },
        ]);

        setToast({
          message: "Wallet connected!",
          description: "Wallet linked successfully",
          type: "success",
        });
      }
    } catch (error: any) {
      console.error("MetaMask error:", error);

      setToast({
        message: "Connection failed",
        description: error.message || "Failed to connect wallet",
        type: "error",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSetActive = (address: string) => {
    setAdditionalWallets((prev) =>
      prev.map((w) => ({
        ...w,
        isActive: w.address === address,
      }))
    );
    setToast({
      message: "Active wallet changed",
      description: `${formatWalletAddress(address)} is now your active wallet`,
      type: "success",
    });
  };

  const handleRemoveWallet = (address: string) => {
    setAdditionalWallets((prev) => prev.filter((w) => w.address !== address));
    setToast({
      message: "Wallet removed",
      description: "Wallet has been disconnected from your account",
      type: "success",
    });
  };

  const primaryWallet =
    additionalWallets.find((w) => w.isActive) || additionalWallets[0];
  const otherWallets = additionalWallets.filter(
    (w) => !w.isActive || additionalWallets.indexOf(w) > 0
  );

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
                    {primaryWallet ? (
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">
                            {primaryWallet.type}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-lg font-mono font-semibold">
                              {formatWalletAddress(primaryWallet.address)}
                            </p>
                            <button
                              onClick={() =>
                                handleCopyAddress(primaryWallet.address)
                              }
                              className="p-1 hover:bg-muted rounded"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-sm font-medium w-fit bg-green-100 text-green-500 px-3 py-1 rounded-2xl mb-3">
                            Active wallet
                          </p>

                          {/* NEW: View on explorer link */}
                          <a
                            href={`https://etherscan.io/address/${primaryWallet.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            View on explorer
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        <div className="flex justify-center md:justify-end">
                          <div className="w-32 h-32 bg-neutral-200 p-2 rounded-lg">
                            <QrCode className="w-full h-full" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">
                          No wallet connected yet
                        </p>
                        <div className="flex justify-center">
                          <button
                            onClick={handleConnectWallet}
                            disabled={isConnecting}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue text-blue hover:bg-[#e9f4fd] dark:hover:bg-transparent cursor-pointer hover:text-blue rounded-full font-semibold transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            {isConnecting ? "Connecting..." : "Connect wallet"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* NEW: Additional wallets section with dynamic content and conditional delete buttons */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Additional wallets
                  </h2>

                  <div className="space-y-3">
                    {otherWallets.length > 0
                      ? otherWallets.map((w) => (
                          <div
                            key={w.address}
                            className="flex items-center justify-between p-4 rounded-lg border"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                                <Wallet className="h-5 w-5 text-orange-600" />
                              </div>
                              <div>
                                <p className="font-medium">{w.type}</p>
                                <p className="text-sm text-muted-foreground font-mono">
                                  {formatWalletAddress(w.address)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSetActive(w.address)}
                                className="text-primary border-primary hover:bg-primary/10"
                              >
                                Set as active
                              </button>
                              <button
                                onClick={() => handleRemoveWallet(w.address)}
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      : null}

                    <div className="flex justify-center mb-6">
                      <button
                        onClick={handleConnectWallet}
                        disabled={isConnecting}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue text-blue hover:bg-[#e9f4fd] dark:hover:bg-transparent cursor-pointer hover:text-blue rounded-full font-semibold transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        {isConnecting ? "Connecting..." : "Connect wallet"}
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
      {/* {showSetActiveModal && (
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
      )} */}

      {/* NEW: Delete wallet modal */}
      {/* {showDeleteWalletModal && (
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
                      additionalWallets.filter(
                        (w) => w.address !== selectedWalletId
                      )
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
      )} */}

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

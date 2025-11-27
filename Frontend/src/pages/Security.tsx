import Breadcrumb from "../components/Breadcrumb";
import Toast from "../components/withdraw/Toast";
import { Shield, Monitor, Smartphone, Copy } from "lucide-react";
import { useState } from "react";

export default function Security() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // NEW: State for managing devices list
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Chrome on windows",
      location: "192.168.07 · Nigeria",
      icon: Monitor,
    },
    {
      id: 2,
      name: "Metamask smart contract on mobile",
      location: "192.168.07 · Nigeria",
      icon: Smartphone,
    },
  ]);

  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      setShowDisableModal(true);
    } else {
      setShowEnableModal(true);
    }
  };

  const handleEnable2FA = () => {
    setIs2FAEnabled(true);
    setShowEnableModal(false);
    setAuthCode("");
    setToast({ message: "2FA successfully enabled", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    setShowDisableModal(false);
    setToast({ message: "2FA successfully disabled", type: "success" });
    setTimeout(() => setToast(null), 3000);
    setAuthCode("");
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText("AT2BcCD4FSY8");
    setToast({ message: "Secret key copied to clipboard", type: "success" });
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
                  { label: "Security" },
                ]}
              />

              <div className="space-y-4">
                {/* Two-factor authentication */}
                <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold border-b border-muted-foreground pb-4">
                    Two-factor authentication (2FA)
                  </h2>
                  <p className="text-sm text-muted-foreground my-4">
                    Add an extra layer of security to your account
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Status: {is2FAEnabled ? "Enabled" : "Disabled"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {is2FAEnabled
                          ? "2 FA is currently enabled on your device"
                          : "2FA is currently disabled"}
                      </p>
                    </div>
                    <button
                      onClick={handleToggle2FA}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        is2FAEnabled
                          ? "bg-blue"
                          : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          is2FAEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Authentication */}
                <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold border-b border-muted-foreground pb-4">
                    Authentication
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Login Method:
                      </span>
                      <span className="text-sm font-medium">
                        Jollyakeju@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Connected:
                      </span>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-sm">Google</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NEW: Device management with dynamic list and functional remove buttons */}
                <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold border-b border-muted-foreground pb-4">
                    Device management
                  </h2>

                  <div className="space-y-4">
                    {devices.map((device, index) => {
                      const DeviceIcon = device.icon;
                      return (
                        <div
                          key={device.id}
                          className={`flex items-center justify-between py-3 ${
                            index < devices.length - 1
                              ? "border-0 border-neutral-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <DeviceIcon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">
                                {device.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {device.location}
                              </p>
                            </div>
                          </div>
                          {/* NEW: Functional remove button */}
                          <button
                            onClick={() => {
                              setDevices(
                                devices.filter((d) => d.id !== device.id)
                              );
                              setToast({
                                message: `${device.name} removed successfully`,
                                type: "success",
                              });
                              setTimeout(() => setToast(null), 3000);
                            }}
                            className="text-sm font-semibold cursor-pointer text-red-500 "
                          >
                            Remove device
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/*  */}
                {/* Activity summary */}
                <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold border-b border-muted-foreground pb-4">
                    Activity summary
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Last login:
                      </span>
                      <span className="text-sm">
                        June 5, 2024, 10:30AM (chrome on windows)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Last security verification:
                      </span>
                      <span className="text-sm">June 5, 2024, 10:30AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enable 2FA Modal */}
      {showEnableModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              Enable Two-factor authentification
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add an extra layer of protection to your SaveFi account. Scan the
              QR code or copy secret key into your authenticator app.
            </p>

            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-white p-4 rounded-lg">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="white" />
                  <rect x="0" y="0" width="10" height="10" fill="black" />
                  <rect x="20" y="0" width="10" height="10" fill="black" />
                  <rect x="40" y="0" width="10" height="10" fill="black" />
                  <rect x="70" y="0" width="10" height="10" fill="black" />
                  <rect x="90" y="0" width="10" height="10" fill="black" />
                  <rect x="0" y="10" width="10" height="10" fill="black" />
                  <rect x="60" y="10" width="10" height="10" fill="black" />
                  <rect x="90" y="10" width="10" height="10" fill="black" />
                  <rect x="0" y="20" width="10" height="10" fill="black" />
                  <rect x="20" y="20" width="10" height="10" fill="black" />
                  <rect x="40" y="20" width="10" height="10" fill="black" />
                  <rect x="60" y="20" width="10" height="10" fill="black" />
                  <rect x="90" y="20" width="10" height="10" fill="black" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 bg-muted p-3 rounded-lg">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono flex-1">
                Secret key: AT2BcCD4FSY8
              </span>
              <button
                onClick={copySecretKey}
                className="p-1 hover:bg-background rounded"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Enter 6 digit authentication code
              </label>
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleEnable2FA}
                className="flex-1  px-4 py-2 text-blue font-semibold transition-colors"
              >
                Enable 2FA
              </button>
              <button
                onClick={() => setShowEnableModal(false)}
                className="flex-1  px-4 py-2 text-muted-foreground font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disable 2FA Modal */}
      {showDisableModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              Disable Two-factor authentification
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Turning off 2FA reduces your account security. Enter your 6-digits
              authentication code to continue
            </p>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Enter 6 digit authentication code
              </label>
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDisable2FA}
                className="flex-1  px-4 py-2 text-red-500 font-semibold transition-colors"
              >
                Disable 2FA
              </button>
              <button
                onClick={() => setShowDisableModal(false)}
                className="flex-1  px-4 py-2 text-muted-foreground font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

import Breadcrumb from "../components/Breadcrumb";

import { Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";
import transactionIcon from "../assets/preferences/transactionalerts.svg";
import savingsIcon from "../assets/preferences/savings.svg";
import systemIcon from "../assets/preferences/systemalerts.svg";
import securityIcon from "../assets/preferences/securityalerts.svg";
import referralIcon from "../assets/preferences/referral.svg";

export default function Preferences() {
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [savingsAlerts, setSavingsAlerts] = useState(true);
  const [referralAlerts, setReferralAlerts] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  return (
    <div className="bg-neutral-200 dark:bg-gray-600 dark:text-white  min-h-screen">
      <div className="">
        <div className="px-3">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl space-y-8">
              <Breadcrumb
                items={[
                  { label: "Profile", href: "/profile" },
                  { label: "Preferences" },
                ]}
              />

              <div className="space-y-4">
                {/* Notification preferences */}
                <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Notification preferences
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Manage how we communicate with you
                  </p>

                  <div className="space-y-2 border-t border-border ">
                    {/* Transaction Alerts */}
                    <div className="flex items-center justify-between py-4 ">
                      <div className="flex items-center gap-3">
                        <img src={transactionIcon} className="" />
                        <div>
                          <p className="text-sm font-medium">
                            Transaction Alerts
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Receive alert for all account transaction
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setTransactionAlerts(!transactionAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          transactionAlerts
                            ? "bg-blue"
                            : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            transactionAlerts
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Savings Alerts */}
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <img src={savingsIcon} className="" />
                        <div>
                          <p className="text-sm font-medium">Savings Alerts</p>
                          <p className="text-xs text-muted-foreground">
                            Get notified about your saving progress and
                            milestones
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSavingsAlerts(!savingsAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          savingsAlerts
                            ? "bg-blue"
                            : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            savingsAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Referral and points alerts */}
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <img src={referralIcon} className="" />
                        <div>
                          <p className="text-sm font-medium">
                            Referral and points alerts
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Stay updated with referrals and points reward
                            updates
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setReferralAlerts(!referralAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          referralAlerts
                            ? "bg-blue"
                            : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            referralAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* System Alerts */}
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <img src={systemIcon} className="" />
                        <div>
                          <p className="text-sm font-medium">System Alerts</p>
                          <p className="text-xs text-muted-foreground">
                            Essential updates about services and maintenance
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSystemAlerts(!systemAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          systemAlerts
                            ? "bg-blue"
                            : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            systemAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Security Alerts */}
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <img src={securityIcon} className="" />
                        <div>
                          <p className="text-sm font-medium">Security Alerts</p>
                          <p className="text-xs text-muted-foreground">
                            Receive critical notifications about your account
                            security
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSecurityAlerts(!securityAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securityAlerts
                            ? "bg-blue"
                            : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securityAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/*  */}
                  </div>
                </div>
                {/* Display settings */}
                <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Display settings
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Customize your dashboard experience
                  </p>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Theme</h3>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          theme === "light"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:bg-muted"
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span className="text-sm">Light</span>
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          theme === "dark"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:bg-muted"
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span className="text-sm">Light</span>
                      </button>

                      <button
                        onClick={() => setTheme("system")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          theme === "system"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:bg-muted"
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        <span className="text-sm">System</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Breadcrumb from "../components/Breadcrumb";

import { useState } from "react";

export default function Settings() {
  const [autoTimezone, setAutoTimezone] = useState(true);
  const [showNaira, setShowNaira] = useState(true);
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("gmt");
  const [currency, setCurrency] = useState("usdt");

  return (
    <div className="bg-neutral-200 dark:bg-gray-600 dark:text-white  min-h-screen">
      <div className="">
        <div className="px-3">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl space-y-5">
              <Breadcrumb
                items={[
                  { label: "Profile", href: "/profile" },
                  { label: "Settings" },
                ]}
              />

              {/* Language */}
              <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                <h2 className="text-xl font-semibold mb-1">Language</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  select the language for the application
                </p>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="max-w-xs flex h-10 w-full items-center justify-between rounded-md bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-base placeholder:text-[#979799] dark:placeholder:text-white/85 focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                <h2 className="text-xl font-semibold mb-1">Timezone</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Set your local time for accurate transaction records
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Auto detect Timezone
                    </span>
                    <button
                      onClick={() => setAutoTimezone(!autoTimezone)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoTimezone
                          ? "bg-blue"
                          : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoTimezone ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {!autoTimezone && (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Manual time zone selection
                      </p>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="max-w-xs flex h-10 w-full items-center justify-between rounded-md bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-base placeholder:text-[#979799] dark:placeholder:text-white/85 focus:outline-none focus:ring-2 focus:ring-blue"
                      >
                        <option value="gmt">
                          GMT 07:00 (Central African Time)
                        </option>
                        <option value="est">EST (Eastern Standard Time)</option>
                        <option value="pst">PST (Pacific Standard Time)</option>
                      </select>
                    </>
                  )}
                </div>
              </div>

              {/* Currency Display */}
              <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                <h2 className="text-xl font-semibold mb-1">Currency display</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure how currency values are shown
                </p>

                <div className="space-y-4">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="max-w-xs flex h-10 w-full items-center justify-between rounded-md bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-base placeholder:text-[#979799] dark:placeholder:text-white/85 focus:outline-none focus:ring-2 focus:ring-blue"
                  >
                    <option value="usdt">Primary display: USDT</option>
                    <option value="usd">Primary display: USD</option>
                    <option value="eur">Primary display: EUR</option>
                  </select>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Show Naira equivalent
                    </span>
                    <button
                      onClick={() => setShowNaira(!showNaira)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showNaira
                          ? "bg-blue"
                          : "bg-[#b9b9ba] dark:bg-[#b9b9ba]/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          showNaira ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/*  */}
              {/* Data Privacy */}
              <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                <h2 className="text-xl font-semibold mb-1">Data privacy</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your account data and privacy settings
                </p>

                <div className="space-y-4 border-t border-border">
                  <div className="flex items-center justify-between py-4 b">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Export data</h3>
                      <p className="text-xs text-muted-foreground">
                        Get a full copy of your account information
                      </p>
                    </div>
                    <button className="w-35 px-2 py-2 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-colors cursor-pointer text-sm ">
                      Export data
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">
                        Download transaction history
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Download a CSV file of your transaction history
                      </p>
                    </div>
                    <button className="w-35 px-2 py-2 bg-black text-white rounded-full font-semibold hover:bg-black/90 cursor-pointer transition-colors text-sm">
                      Download
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">
                        Delete account
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete your SaveFi account
                      </p>
                    </div>
                    <button className="w-35 px-2 py-2 bg-[#e8362c] text-white rounded-full font-semibold hover:bg-[#e8362c]/90 transition-colors cursor-pointer text-sm">
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

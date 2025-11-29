import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";

import Breadcrumb from "../components/Breadcrumb";
import { ChevronDown } from "lucide-react";

import { useNavigate } from "react-router-dom";
import VaultFi from "../assets/savingplan/december.svg";

export default function VaultFiPlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState("");
  const [understood, setUnderstood] = useState(false);

  const [showAbout, setShowAbout] = useState(false);

  const availableBalance = 120.54;
  const lockedAmount = amount ? parseFloat(amount) : 0;
  const expectedInterest = lockedAmount * 0.08;
  const totalPayout = lockedAmount + expectedInterest;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnderstood(event?.target.checked); // Toggle the checked state
  };

  const isButtonDisabled = !(amount && parseFloat(amount) > 0 && understood);

  return (
    <div className="bg-neutral-200 min-h-screen dark:bg-gray-600 dark:text-white">
      <div className="">
        <Navbar title="Create VaultFi plan" />

        <div className="p-4 mt-18 md:mt-0">
          <Breadcrumb
            items={[
              { label: "Savings plan", href: "/savings" },
              { label: "Start new plan", href: "/savings/new" },
              { label: "VaultFi" },
            ]}
          />
        </div>

        <div className="max-w-3xl mx-auto p-4 pb-12">
          {/* Plan Header */}
          <div className="bg-neutral-50 dark:bg-gray-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-vaultfi-light flex items-center justify-center">
                <img src={VaultFi} alt="VaultFi Logo" className="" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  VaultFi
                </h2>
                <p className="text-muted-foreground">Locked plan</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#D0D3D6]">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="text-lg font-semibold text-foreground">
                  12 months
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Interest rate:
                </p>
                <p className="text-lg font-semibold text-[#27B97D]">8%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Early withdrawals
                </p>
                <p className="text-lg font-semibold text-[#E89E50]">
                  Locked until maturity
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-3 pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start date</p>
                <p className="text-base font-medium text-foreground">
                  Nov 25, 2025
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Maturity date
                </p>
                <p className="text-base font-medium text-foreground">
                  Nov 25, 2026
                </p>
              </div>
            </div>
          </div>

          {/* About This Plan */}
          <div className="mb-6">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="w-full mt-6 p-6 bg-neutral-50 dark:bg-gray-700 rounded-tl-2xl rounded-tr-2xl  flex items-center justify-between text-left hover:text-primary transition-colors"
            >
              <span className="font-semibold text-foreground">
                About this plan
              </span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  showAbout ? "rotate-180" : ""
                }`}
              />
            </button>

            {showAbout && (
              <ul className="mt-4 space-y-2 px-6 py-2 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start">
                  <span className="w-2 h-2  mt-1 bg-black-text dark:bg-white rounded-full shrink-0"></span>
                  <span>
                    VaultFi is designed for long-term savings with the highest
                    returns, perfect for users who want to lock fund for a full
                    year, ideal for big goals
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-2 h-2  mt-1 bg-black-text dark:bg-white rounded-full shrink-0"></span>
                  <span>
                    Interest is calculated daily and fully paid at maturity
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-2 h-2  mt-1 bg-black-text dark:bg-white rounded-full shrink-0"></span>
                  <span>
                    Your funds are securely locked on-chain using smart contract
                    logic until maturity.
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-2 h-2  mt-1 bg-black-text dark:bg-white rounded-full shrink-0"></span>
                  <span>
                    When your plan matures, your principal plus interest will
                    automatically move to your total USDT balance, where you can
                    withdraw or create a new plan.
                  </span>
                </li>
              </ul>
            )}
          </div>

          {/* Create Plan Form */}
          <div className="bg-neutral-50 dark:bg-gray-700 rounded-2xl p-6 ">
            <div className="space-y-6">
              {/* Plan Name */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Plan name{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g Rent 2025, Laptop savings"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="text-base w-full text-[#979799] placeholder:text-[#979799] rounded-md p-3 bg-[#EAEDEF] dark:bg-gray-600 dark:text-white/80 dark:placeholder:text-white/80  focus:outline-0 focus:ring-2 focus:ring-blue"
                />
              </div>

              {/* Amount to Lock */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Amount to lock (USDT)
                </label>
                <div className="flex items-center gap-4 text-[#979799] placeholder:text-[#979799] rounded-md p-3 bg-[#EAEDEF] dark:bg-gray-600 dark:text-white/80">
                  <input
                    type="number"
                    placeholder="e.g Rent 2025, Laptop savings"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-base flex-1 text-[#979799] placeholder:text-[#979799] bg-[#EAEDEF] dark:bg-gray-600 dark:text-white/80 dark:placeholder:text-white/80  focus:outline-0"
                  />
                  <button
                    onClick={() => setAmount(availableBalance.toString())}
                    className="text-sm text-blue font-medium"
                  >
                    Max
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">
                    Available balance:{" "}
                    <span className="font-bold">{availableBalance} USDT</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              {amount && parseFloat(amount) > 0 && (
                <div className="rounded-xl bg-[#EAFAF3] dark:bg-gray-600 dark:text-white/80 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Amount to be locked
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {lockedAmount.toFixed(2)} USDT
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Expected interest earned
                    </span>
                    <span className="text-base font-semibold text-[#27B97D]">
                      +{expectedInterest.toFixed(2)} USDT
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-sm font-medium text-foreground">
                      Total payout at maturity
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {totalPayout.toFixed(2)} USDT
                    </span>
                  </div>
                </div>
              )}

              {/* Confirmation Checkbox */}
              <div className="flex items-center gap-3 p-4 ">
                <input
                  type="checkbox"
                  id="understand"
                  checked={understood}
                  onChange={handleCheckboxChange}
                  className=" w-5 h-5 accent-blue"
                />
                <label
                  htmlFor="understand"
                  className="text-sm text-black-text dark:text-white font-medium cursor-pointer"
                >
                  I understand this amount will be locked till maturity date
                </label>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex gap-3 mt-5 w-[80%] mx-auto">
            <button
              onClick={() => navigate("/savings")}
              disabled={isButtonDisabled} // Disable button based on conditions
              className={`flex-1 border-2 font-semibold cursor-pointer py-2.5 rounded-full 
                  ${
                    isButtonDisabled
                      ? "bg-blue/40 border-blue/40 text-white/70 cursor-not-allowed"
                      : "bg-blue text-white border-blue hover:bg-blue/90"
                  }`}
            >
              Create plan
            </button>
            <button
              onClick={() => navigate("/savings/new")}
              className="flex-1 text-blue border-2 font-semibold cursor-pointer border-blue py-2.5 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

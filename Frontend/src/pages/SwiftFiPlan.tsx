import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import StartNewPlan from "./StartNewPlan";
import { sidebarItems } from "../data/sidebar";
import Breadcrumb from "../components/Breadcrumb";
import { Info, ArrowRight } from "lucide-react";

// import { useNavigate } from "react-router-dom";

import SwiftFi from "../assets/savingplan/emergency.svg";

const recentActivity = [
  {
    date: "Nov 15, 2025",
    type: "Deposit",
    amount: "+₦50,000",
    status: "success",
  },
  {
    date: "Nov 15, 2025",
    type: "Interest",
    amount: "+86 USDT",
    status: "pending",
  },
  {
    date: "Nov 15, 2025",
    type: "Conversion",
    amount: "-₦100,000",
    status: "failed",
  },
];

export default function SwiftFiPlan() {
  const [title, setTitle] = useState("Dashboard");
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(
    <StartNewPlan />
  );

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const maxDepositAmount = 89.57;
  const maxWithdrawAmount = 120.54;

  const handleMaxDeposit = () => {
    setDepositAmount(maxDepositAmount.toString());
  };

  const handleMaxWithdraw = () => {
    setWithdrawAmount(maxWithdrawAmount.toString());
  };

  return (
    <div className="bg-neutral-200 min-h-screen">
      <Sidebar
        items={sidebarItems}
        onTitleChange={setTitle}
        onPageChange={setCurrentPage}
      />

      <div className="md:ml-65 lg:ml-[332px] flex flex-col flex-1 bg-neutral-50">
        <Navbar title="SwiftFi plan" />
        <main className="px-3 pt-[70px] md:pt-[95px] bg-neutral-200 dark:bg-gray-600 dark:text-white">
          <Breadcrumb
            items={[
              { label: "Savings plan", href: "/savings" },
              { label: "Start new plan", href: "/savings/new" },
              { label: "SwiftFi" },
            ]}
          />

          <div className="mb-12">
            {/* Balance Card */}
            <div className="bg-neutral-50 dark:bg-gray-700 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-swiftfi/20 flex items-center justify-center">
                  <img src={SwiftFi} className="object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#67686B] dark:text-white/90 mb-1">
                    SwiftFi balance
                  </h2>
                  <p className="text-4xl font-bold text-foreground mb-2">
                    120.54{" "}
                    <span className="text-xl text-muted-foreground">USDT</span>
                  </p>
                  <p className="text-sm text-muted-foreground">~₦192,845.40</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-[#67686B] dark:text-white/80 mb-1">
                      Total deposit
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      75 USDT
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#67686B] dark:text-white/80 mb-1">
                      Total withdrawn
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      75 USDT
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-fit items-center gap-2 text-sm text-[#67686B] bg-[#F7F8F9] dark:bg-gray-600 dark:text-white/80 rounded-lg px-4 py-2">
                <Info className="w-4 h-4" />
                <span>Flexible plan - withdraw anytime</span>
              </div>
            </div>

            {/* Add/Withdraw Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Add Funds */}
              <div className="bg-neutral-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Add funds to SwiftFi
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground dark:text-white/80 mb-2 block">
                      Amount
                    </label>
                    <input
                      type="text"
                      placeholder="0.00 USDT"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="text-base w-full text-[#979799] placeholder:text-[#979799] rounded-md p-3 bg-[#EAEDEF] dark:bg-gray-600 dark:text-white/80 dark:placeholder:text-white/80  focus:outline-0 focus:ring-2 focus:ring-blue"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">
                        Total balance:
                      </span>
                      <span className="font-semibold">
                        {maxDepositAmount}USDT
                      </span>
                    </div>
                    <button
                      onClick={handleMaxDeposit}
                      className="text-primary font-medium cursor-pointer"
                    >
                      {" "}
                      <span className="text-blue ml-1">Max</span>
                    </button>
                  </div>

                  <button className="w-full bg-blue rounded-full cursor-pointer font-semibold text-white hover:bg-blue/90 py-2">
                    Add funds
                  </button>
                </div>
              </div>

              {/* Withdraw */}
              <div className="bg-neutral-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Withdraw from SaveFi
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground dark:text-white/80 mb-2 block">
                      Amount
                    </label>
                    <input
                      type="text"
                      placeholder="0.00 USDT"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="text-base w-full text-[#979799] placeholder:text-[#979799] rounded-md p-3 bg-[#EAEDEF] dark:bg-gray-600 dark:text-white/80 dark:placeholder:text-white/80 focus:outline-0 focus:ring-2 focus:ring-blue"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">
                        SwiftFi balance:
                      </span>
                      <span className="font-semibold">
                        {maxWithdrawAmount}USDT
                      </span>
                    </div>
                    <button
                      onClick={handleMaxWithdraw}
                      className="text-primary font-medium cursor-pointer"
                    >
                      {" "}
                      <span className="text-blue ml-1">Max</span>
                    </button>
                  </div>

                  <button className="w-full bg-blue rounded-full cursor-pointer font-semibold  text-white hover:bg-blue/90 py-2">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-neutral-50 p-4 dark:bg-gray-700 rounded-xl">
              <div className="">
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Activity
                </h3>
              </div>

              <div className="overflow-hidden mt-6 rounded-xl">
                <table className="min-w-full ">
                  <thead className="bg-[#E5E8EB] dark:bg-[#414c5d] rounded-md font-semibold">
                    <tr className=" ">
                      <th className="text-left px-4 py-3 text-sm text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 text-sm text-muted-foreground">
                        Type
                      </th>
                      <th className="text-left px-4 py-3 text-sm text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left px-4 py-3 text-sm text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#F7F8F9] dark:bg-gray-600 divide-y divide-slate-200 dark:divide-gray-700">
                    {recentActivity.map((activity, index) => (
                      <tr key={index} className="">
                        <td className="px-4 py-3 text-sm text-foreground">
                          {activity.date}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {activity.type}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {activity.amount}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          <span
                            className={` px-2 py-1 text-xs font-medium rounded-full ${
                              activity.status === "success"
                                ? "bg-[#EAFAF3] text-[#27B97D]"
                                : activity.status === "pending"
                                ? "bg-[#FFF7EE] text-[#E89E50]"
                                : "bg-[#FFEBEA] text-[#FF3B30]"
                            }`}
                          >
                            {activity.status === "success" && "Success"}
                            {activity.status === "pending" && "Pending"}
                            {activity.status === "failed" && "Failed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 flex justify-center">
              <button className="text-blue text-sm font-semibold hover:text-blue/80 flex items-center gap-1 cursor-pointer">
                See all recent activities
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

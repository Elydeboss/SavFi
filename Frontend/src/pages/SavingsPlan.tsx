import { useState } from "react";

import SavingsOverviewCard from "../components/savingplans/SavingsOverviewCard";
import SavingsPlanCard from "../components/savingplans/SavingsPlanCard";
import { TabButton } from "../components/savingplans/TabButton";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import { savingsOverview, savingsPlans } from "../data/savings";
import type { PlanStatus } from "../types/savings";
import PiggyBank from "../assets/savingplan/piggy.svg";
import Gift from "../assets/savingplan/3cubes.svg";
import Chartline from "../assets/savingplan/chartline.svg";
import Flames from "../assets/savingplan/fire.svg";
import FooterIcon from "../assets/savingplan/footericon.svg";

type TabFilter = "all" | PlanStatus;

const SavingsPlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [overviewTab, setOverviewTab] = useState<
    "all" | "active" | "completed"
  >("all");

  const filteredPlans =
    activeTab === "all"
      ? savingsPlans
      : savingsPlans.filter((plan) => plan.status === activeTab);

  return (
    <div className="min-h-screen dark:bg-gray-600 dark:text-white">
      <Navbar title="Savings plan" />
      <div className="p-4 mt-18 md:mt-0">
        {/* Header */}
        <div className="flex justify-end mt-3 mb-6">
          <button
            onClick={() => navigate("/savings/new")}
            className="bg-blue hover:bg-blue/90 px-7 font-semibold py-3 flex items-center gap-2 rounded-3xl text-white cursor-pointer shadow-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 8C12.5523 8 13 8.44772 13 9V11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H13V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H11V9C11 8.44772 11.4477 8 12 8Z"
                fill="white"
              />
            </svg>
            Start new plan
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Savings overview
          </h1>
          {/* Overview Tabs */}
          <div className="flex gap-2 mb-6">
            <TabButton
              active={overviewTab === "all"}
              onClick={() => setOverviewTab("all")}
            >
              All
            </TabButton>
            <TabButton
              active={overviewTab === "active"}
              onClick={() => setOverviewTab("active")}
            >
              Active
            </TabButton>
            <TabButton
              active={overviewTab === "completed"}
              onClick={() => setOverviewTab("completed")}
            >
              Completed
            </TabButton>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <SavingsOverviewCard
            title="Total saved"
            value={savingsOverview.totalSaved}
            subtitle={`~₦${savingsOverview.totalChange.toLocaleString()}`}
            icon={PiggyBank}
            delay={0}
          />
          <SavingsOverviewCard
            title="Active savings plan"
            value={`${savingsOverview.activePlans} plans`}
            icon={Gift}
            delay={0.1}
          />
          <SavingsOverviewCard
            title="Interest earned"
            value={savingsOverview.interestEarned}
            subtitle={`~₦${savingsOverview.interestChange.toLocaleString()}`}
            icon={Chartline}
            delay={0.2}
            color="text-[#27B97D]"
          />
          <SavingsOverviewCard
            title="Savings streak"
            value={`${savingsOverview.savingsStreak} days`}
            icon={Flames}
            delay={0.3}
          />
        </div>

        {/* Your Plans Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground mb-4">Your plans</h2>

          {/* Plan Tabs */}
          <div className="flex gap-2 flex-wrap">
            <TabButton
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            >
              All
            </TabButton>
            <TabButton
              active={activeTab === "active"}
              onClick={() => setActiveTab("active")}
            >
              Active
            </TabButton>
            <TabButton
              active={activeTab === "completed"}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </TabButton>
            <TabButton
              active={activeTab === "early_withdrawal"}
              onClick={() => setActiveTab("early_withdrawal")}
            >
              Early withdrawn
            </TabButton>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredPlans.map((plan, index) => (
            <SavingsPlanCard key={plan.id} plan={plan} delay={index * 0.05} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col w-full bg-[#EEF0F2] dark:bg-gray-700 dark:text-white border border-[#D0D3D6] rounded-xl items-center justify-center py-6 text-center mb-15">
          <button
            onClick={() => navigate("/savings/new")}
            className="bg-blue hover:bg-blue/90 px-7 font-semibold py-3 flex items-center gap-2 rounded-3xl text-white cursor-pointer shadow-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 8C12.5523 8 13 8.44772 13 9V11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H13V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H11V9C11 8.44772 11.4477 8 12 8Z"
                fill="white"
              />
            </svg>
            Start new plan
          </button>
          <div className="w-12 h-12 mt-6 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <img src={FooterIcon} alt="Footer Icon" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Start your savings journey
          </h3>
          <p className="text-muted-foreground mb-6 ">
            Set up your first saving plan today and watch your money grow
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlan;

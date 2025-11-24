export type PlanStatus =
  | "active"
  | "locked"
  | "completed"
  | "awaiting_withdrawal"
  | "early_withdrawal";

export type PlanType = "FlexiFi" | "GrowFi" | "VaultFi" | "SwiftFi";

export interface SavingsPlan {
  id: string;
  name: string;
  planType: PlanType;
  status: PlanStatus;
  principalAmount: number;
  interestEarned?: number;
  availablePayout?: number;
  totalPayout?: number;
  penalty?: number;
  progress?: number;
  maturityDate?: string;
  completedDate?: string;
  withdrawnDate?: string;
  icon: string;
}

export interface SavingsOverview {
  totalSaved: number;
  totalChange: number;
  activePlans: number;
  interestEarned: number;
  interestChange: number;
  savingsStreak: number;
}

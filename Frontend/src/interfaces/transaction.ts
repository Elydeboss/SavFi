// src/types/transactions.ts
export type TransactionStatus = "Success" | "Pending" | "Failed";
export type TransactionSource =
  | "Naira"
  | "Interest"
  | "Crypto"
  | "Referral"
  | "System";

export interface Transaction {
  id: string;
  date: string;
  type: string;
  usdt: string;
  amount: string;
  status: TransactionStatus;
  source: TransactionSource;
  details?: {
    txId?: string;
    date?: string;
    method?: string;
    destination?: string;
  };
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  // Profile
  name: string;
  email: string;
  image: string | null;
  savefiId: string;
  signupMethod: string;

  // Wallet
  walletAddress: string;

  // Points
  points: number;
  pointsInUsdt: number;

  // KYC
  kycStatus: string;

  // Savings
  totalSaved: number;
  totalPlans: number;
  savingStreak: string;

  // Actions
  updateProfile: (data: Partial<UserState>) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // DEFAULT USER INFO
      name: 'Jolly Akeju',
      email: 'jollyakeju@gmail.com',
      image: null,
      savefiId: 'SF-1234XYZ',
      signupMethod: 'Google',

      // WALLET
      walletAddress: '0x1A2b...C3D4',

      // POINTS
      points: 1.0,
      pointsInUsdt: 3.01,

      // KYC
      kycStatus: 'KYC: Unverified',

      // SAVINGS
      totalSaved: 35.72,
      totalPlans: 3,
      savingStreak: 'You saved 3 times this month!',

      // UPDATE PROFILE METHOD
      updateProfile: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: 'savefi-user-data', // localStorage key
    }
  )
);

export default useUserStore;

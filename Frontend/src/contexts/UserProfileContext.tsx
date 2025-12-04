import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
// BACKEND URL
const API_BASE = "https://wallet-api-55mt.onrender.com";

interface UserProfile {
  first_name: string;
  second_name: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  bio: string;
  avatar: string;
}

interface Wallet {
  id: string;
  owner: string;
  addresses: string[];
  balance: number;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  wallet: Wallet | null;
  isLoading: boolean;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  refreshProfile: () => Promise<void>;
  clearProfile: () => void;
  setWallet: (wallet: Wallet | null) => void;
}

const defaultProfile: UserProfile = {
  first_name: "",
  second_name: "",
  username: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  bio: "",
  avatar: "",
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    // Initialize from localStorage for instant display
    const cached = localStorage.getItem("userProfile");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    // Fallback to individual items
    return {
      ...defaultProfile,
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
      first_name: localStorage.getItem("firstName") || "",
      second_name: localStorage.getItem("secondName") || "",
    };
  });
  const [wallet, setWalletState] = useState<Wallet | null>(() => {
    const cached = localStorage.getItem("userWallet");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/accounts/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newProfile: UserProfile = {
          first_name: data.first_name || "",
          second_name: data.second_name || "",
          username: data.username || localStorage.getItem("username") || "",
          email: data.email || localStorage.getItem("email") || "",
          phone: data.phone || "",
          country: data.country || "",
          state: data.state || "",
          bio: data.bio || "",
          avatar: data.avatar || "",
        };
        setProfile(newProfile);
        // Cache for instant access
        localStorage.setItem("userProfile", JSON.stringify(newProfile));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback((newProfile: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newProfile } as UserProfile;
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    setWalletState(null);
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userWallet");
  }, []);

  const setWallet = useCallback((newWallet: Wallet | null) => {
    setWalletState(newWallet);
    if (newWallet) {
      localStorage.setItem("userWallet", JSON.stringify(newWallet));
    } else {
      localStorage.removeItem("userWallet");
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchProfile();
    }
  }, [fetchProfile]);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        wallet,
        isLoading,
        updateProfile,
        refreshProfile,
        clearProfile,
        setWallet,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}

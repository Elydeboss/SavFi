import { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useUserProfile } from "../../contexts/UserProfileContext";

// BACKEND URL
const API_BASE = "https://wallet-api-55mt.onrender.com";

interface WelcomeModalProps {
  onComplete: () => void;
}

const WelcomeModal = ({ onComplete }: WelcomeModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.info("Required fields", {
        description: "Please enter your first and last name",
      });
      return;
    }

    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("second_name", lastName);

      const response = await fetch(`${API_BASE}/accounts/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Update context immediately for instant sync
        updateProfile({
          first_name: firstName,
          second_name: lastName,
        });

        localStorage.setItem("profileCompleted", "true");
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("secondName", lastName);
        toast.success("Profile updated successfully!, Welcome to SaveFi");
        onComplete();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        "An error occurred while saving your profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#F2F8FE]  rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-linear-to-r from-blue-100 to-blue-200 dark:bg-neutral-50 relative h-20 ">
          <div className="absolute top-4 left-8">
            <Sparkles className="w-12 h-12 text-blue/30" />
          </div>
          <div className="absolute top-4 right-8">
            <Sparkles className="w-12 h-12 text-orange-500" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center">
            <div className="w-15 h-15 rounded-full absolute -bottom-5 bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>

        <div className="py-4 px-6 bg-neutral-50">
          <h2 className="text-xl font-bold text-center text-foreground mb-2">
            Congratulations, your account have been successfully created
          </h2>

          <p className="text-center text-muted-foreground mb-4">
            Please enter your details, let's help you personalize your profile.
          </p>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="w-full px-4 py-2.5 bg-neutral-200 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="w-full px-4 py-2.5 bg-neutral-200 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter Referral code"
                className="w-full px-4 py-2.5 bg-neutral-200 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue/90 transition-colors mt-2 cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save and continue to dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

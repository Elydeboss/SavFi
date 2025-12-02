import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Camera } from "lucide-react";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsFetching(true);
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("Please log in to view your profile");
        setIsFetching(false);
        return;
      }

      const response = await fetch(`/api/accounts/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFirstName(data.first_name || "");
        setSecondName(data.second_name || "");
        setUsername(data.username || localStorage.getItem("username") || "");
        setEmail(data.email || localStorage.getItem("email") || "");
        setPhone(data.phone || "");
        setCountry(data.country || "");
        setState(data.state || "");
        setBio(data.bio || "");
        setAvatar(data.avatar || "");
      } else {
        // Fallback to localStorage
        setUsername(localStorage.getItem("username") || "");
        setEmail(localStorage.getItem("email") || "");
        setFirstName(localStorage.getItem("firstName") || "");
        setSecondName(localStorage.getItem("secondName") || "");
        toast.error("Failed to load profile from server");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
      // Fallback to localStorage
      setUsername(localStorage.getItem("username") || "");
      setEmail(localStorage.getItem("email") || "");
    } finally {
      setIsFetching(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large. Please select an image under 2MB.");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !secondName.trim()) {
      toast.info("Please enter your first and second name");
      return;
    }

    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("Please log in to update your profile");
        setIsLoading(false);
        return;
      }

      // Create a new FormData object
      const formData = new FormData();

      // Append regular fields to the FormData
      formData.append("first_name", firstName);
      formData.append("second_name", secondName);
      formData.append("username", username);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("bio", bio);

      // If there's a file selected, append it as avatar
      if (fileInputRef.current?.files?.[0]) {
        console.log("File selected:", fileInputRef.current.files[0]); // Check if file is selected
        formData.append("avatar", fileInputRef.current.files[0]);
      } else {
        console.error("No file selected for avatar");
      }

      // Send the FormData as a PUT request
      const response = await fetch(`/api/accounts/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData, // Send the FormData object
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("firstName", data.first_name || firstName);
        localStorage.setItem("secondName", data.second_name || secondName);
        localStorage.setItem("profileCompleted", "true");

        toast.success("Profile updated successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(
          errorData.message || errorData.detail || "Failed to update profile"
        );
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(
        error.message || "An error occurred while saving your profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-200 dark:bg-gray-600 dark:text-white  min-h-screen">
      <div className="">
        <div className="px-3">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl space-y-8">
              <Breadcrumb
                items={[
                  { label: "Profile", href: "/profile" },
                  { label: "Edit Profile" },
                ]}
              />

              <div className="space-y-4">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold">Edit Profile</h1>
                  <p className="text-muted-foreground">
                    Update your personal details, contact information, and
                    address.
                  </p>
                </div>

                <div className="rounded-2xl p-8 bg-neutral-50 dark:bg-gray-700">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center justify-center gap-4 pb-6">
                      <div className="h-20 w-20 relative rounded-full bg-primary text-white overflow-hidden flex items-center justify-center text-3xl font-semibold">
                        {avatar ? (
                          <img
                            src={avatar}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          (
                            firstName.charAt(0) ||
                            username.charAt(0) ||
                            "U"
                          ).toUpperCase()
                        )}
                        <button
                          type="button"
                          onClick={handleAvatarClick}
                          disabled={isLoading}
                          className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full cursor-pointer"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          First Name
                        </label>
                        <input
                          placeholder="Enter first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={isLoading}
                          className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Second Name
                        </label>
                        <input
                          placeholder="Enter second name"
                          value={secondName}
                          onChange={(e) => setSecondName(e.target.value)}
                          disabled={isLoading}
                          className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">Username</label>
                      <input
                        value={username}
                        disabled
                        className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Username cannot be changed
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                          placeholder="+234"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isLoading}
                          className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium">Country</label>
                        <input
                          placeholder="Enter country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          disabled={isLoading}
                          className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">State</label>
                      <input
                        placeholder="Enter state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        disabled={isLoading}
                        className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        disabled={isLoading}
                        className="w-full rounded-md placeholder:text-muted-foreground bg-blue-50 px-6 dark:bg-gray-600 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 border-2 border-primary rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 cursor-pointer font-semibold"
                      >
                        {isLoading ? "Saving..." : "Save changes"}
                      </button>

                      <button
                        type="button"
                        onClick={fetchProfile}
                        disabled={isLoading}
                        className="px-6 py-2 rounded-full border-2 text-primary border-primary hover:bg-blue-50 dark:hover:bg-transparent cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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

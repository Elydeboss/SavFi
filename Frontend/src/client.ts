import { createThirdwebClient } from "thirdweb";

// Correct for React/Vite: import.meta.env.VITE_THIRDWEB_CLIENT_ID
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
  // Use the Vite variable name in the error message for clarity
  throw new Error("VITE_THIRDWEB_CLIENT_ID not provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

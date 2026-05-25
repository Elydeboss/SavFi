import { ethers, type Signer } from "ethers";
import { USX_ADDRESS, VAULT_ADDRESS,
   STABLECOIN_DECIMALS } from "./constant/addresses.js";

// NOTE: Ensure these paths correctly point to your compiled ABIs!
import USX_ABI from "./abis/StablecoinABI.json";
import VAULT_ABI from "./abis/VaultABI.json";

/**
 * Executes the entire two-step process: Approval and Deposit.
 * @param {string} amount The amount of USX to save (e.g., "100.5").
 * @returns {Promise<string>} The transaction hash of the final deposit transaction.
 */
// Added type for 'amount' (string) and the return value (Promise<string>)
export async function saveStablecoin(amount: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Wallet provider (e.g., MetaMask) not found.");
  }

  // TypeScript needs to know that window.ethereum exists and conforms to a Provider interface
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer: Signer = await provider.getSigner(); // Specify Signer type

  // Convert human-readable amount to contract units (6 decimals)
  const formattedAmount = ethers.parseUnits(
    amount.toString(),
    STABLECOIN_DECIMALS
  );

  // --- STEP 1: APPROVE the Vault to spend USX ---
  try {
    // Explicitly define Contract variable types
    const usxContract = new ethers.Contract(USX_ADDRESS, USX_ABI, signer);
    console.log("1. Requesting Approval...");

    // The approveTx variable must be typed, typically TransactionResponse
    const approveTx = await usxContract.approve(VAULT_ADDRESS, formattedAmount);

    console.log(`Approval TX submitted: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("✅ Approval confirmed.");
  } catch (error) {
    console.error("❌ Step 1 (Approval) failed:", error);
    // You can now safely throw a new Error
    throw new Error("Approval failed. Please check your transaction.");
  }

  // --- STEP 2: CALL the Vault's Deposit function ---
  try {
    const vaultContract = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
    console.log("2. Depositing to Vault...");

    // Call your vault contract's deposit function
    const depositTx = await vaultContract.deposit(formattedAmount);

    console.log(`Deposit TX submitted: ${depositTx.hash}`);
    await depositTx.wait();
    console.log("🎉 Deposit complete! Stablecoins saved to the Vault.");

    return depositTx.hash;
  } catch (error) {
    console.error("❌ Step 2 (Deposit) failed:", error);
    // Handle error type similar to the frontend component
    throw new Error("Deposit failed. Check if allowance was successful.");
  }
}

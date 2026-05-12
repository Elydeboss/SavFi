import { ethers } from "ethers";
import {
  USX_ADDRESS,
  VAULT_ADDRESS,
  STABLECOIN_DECIMALS,
} from "../constants/addresses";

// Assuming you import your ABIs like this:
import USX_ABI from "../abis/StablecoinABI.json";
import VAULT_ABI from "../abis/VaultABI.json"; // The ABI for your compiled Vault.sol

/**
 * Executes the entire two-step process: Approval and Deposit.
 * @param {string} amount The amount of USX to save (e.g., "100.5").
 */
export async function saveStablecoin(amount) {
  if (!window.ethereum) {
    throw new Error("Wallet provider (e.g., MetaMask) not found.");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Convert human-readable amount to contract units (6 decimals)
  const formattedAmount = ethers.parseUnits(
    amount.toString(),
    STABLECOIN_DECIMALS
  );

  // --- STEP 1: APPROVE the Vault to spend USX ---
  try {
    const usxContract = new ethers.Contract(USX_ADDRESS, USX_ABI, signer);
    console.log("1. Requesting Approval...");

    const approveTx = await usxContract.approve(VAULT_ADDRESS, formattedAmount);

    console.log(`Approval TX submitted: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("✅ Approval confirmed.");
  } catch (error) {
    console.error("❌ Step 1 (Approval) failed:", error);
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
    throw new Error("Deposit failed. Check if allowance was successful.");
  }
}

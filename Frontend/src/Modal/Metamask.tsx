import { useState } from "react";
import { ethers, Contract } from "ethers";
import savefiABI from "../contract/SaveFi.json";
const CONTRACT_ADDRESS = "0xYourContractAddressHere";
import { useNavigate } from "react-router-dom";

function connectWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState<Contract | null>(null);
  const navigate = useNavigate();

  // Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWalletAddress(accounts[0]);
    initContract();
    navigate("/dashboard");
  };

  // Initialize Contract
  const initContract = async () => {
    if (!window.ethereum) {
      alert("No wallet detected");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const instance = new ethers.Contract(CONTRACT_ADDRESS, savefiABI, signer);

    setContract(instance);
    if (contract) {
      console.log("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* Connect Wallet */}
      {walletAddress ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}> Continue with Metamask</button>
      )}
    </div>
  );
}

export default connectWallet;

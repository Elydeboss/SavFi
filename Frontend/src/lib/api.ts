import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // Vite proxy will forward this
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// MetaMask Deep Link Helper
export const getMetaMaskDeepLink = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) {
    // Deep link to open MetaMask app
    return `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
  }
  return null;
};

export const openMetaMask = () => {
  const deepLink = getMetaMaskDeepLink();
  if (deepLink) {
    window.location.href = deepLink;
    return true;
  }
  return false;
};

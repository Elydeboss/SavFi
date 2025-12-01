## 📸 Screenshot
![App Screenshot](assets//public/dashboard2.svg)  


# Savfi – Hybrid Web2 + Web3 Savings Infrastructure

Savfi is a hybrid financial platform combining a Django REST backend with an Ethereum smart contract backend deployed using Remix (remix.ethereum.org). It provides secure, automated savings features powered by both traditional databases and blockchain immutability.

Savfi is built for transparency, security, and programmable finance.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup - Django](#backend-setup--django)
  - [Backend Setup - Smart Contracts (Remix)](#backend-setup--smart-contracts-remix)
  - [Connecting Django to the Smart Contract](#connecting-django-to-the-smart-contract)
  - [Environment Variables](#environment-variables)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔐 Secure registration & authentication
- 💰 Automated deposits & savings workflow
- 🌐 Web3-powered backend actions
- 🔄 Hybrid logic (Django off-chain + Solidity on-chain)
- 📦 Immutable smart contract transactions
- 📊 Full savings + transaction history
- ⚡ Fast API access via Django REST Framework

---

## 🧱 Tech Stack

### Frontend

| Component | Purpose |
|-----------|---------|
| React | UI framework |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first styling |
| Ethers.js / Web3.js | Web3 wallet integration |

### Backend

| Component | Purpose |
|-----------|---------|
| Django | API, auth, business logic |
| Django REST Framework | API handling |
| PostgreSQL / SQLite | Off-chain data |
| Web3.py | Contract interaction from Django |
| Solidity + Remix IDE | On-chain backend logic |

### Smart Contract

- Solidity
- Remix (remix.ethereum.org)
- MetaMask
- Ethereum testnets (Sepolia, Holesky, Mumbai, etc.)

---

## 🏗️ Architecture

```
┌─────────────────────────────┐
│  React + TypeScript         │
│  Tailwind CSS               │
│  (Ethers.js for Web3)       │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  Django Backend API         │
└─────┬─────────────────┬─────┘
      │                 │
      ▼                 ▼
┌──────────┐      ┌──────────┐
│PostgreSQL│      │ Web3.py  │
│ Database │      └────┬─────┘
└──────────┘           │
                       ▼
            ┌──────────────────────┐
            │ Smart Contract       │
            │ (Solidity)           │
            └──────────────────────┘
```

### Full Stack Summary

| Layer | Role |
|-------|------|
| React + TypeScript | Frontend: user interface, wallet connection |
| Django | Off-chain: users, auth, savings logic |
| Smart Contract (Remix) | On-chain: immutable logs, balances, events |
| Web3.py & Ethers.js | Connects Django ↔ Ethereum & Frontend ↔ Ethereum |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have:

- **Backend:**
  - Python 3.10+
  - Git
- **Frontend:**
  - Node.js 18+ and npm/yarn
- **Web3:**
  - MetaMask wallet
  - Remix account (browser)
  - A testnet RPC provider (Infura, Alchemy, or Ankr)

---

### Frontend Setup – React + TypeScript

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

**Key Frontend Dependencies:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "ethers": "^6.0.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.0.0"
  }
}
```

**Connecting to MetaMask (Frontend):**

```typescript
import { ethers } from 'ethers';

// Connect wallet
const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  }
};

// Interact with smart contract
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  signer
);

const balance = await contract.getUserBalance(address);
```

---

### Backend Setup – Django

```bash
# Clone the repository
git clone https://github.com/your-username/savfi.git
cd savfi

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run backend
python manage.py runserver
```

---

### Backend Setup – Smart Contracts (Remix)

1. **Open Remix**  
   👉 https://remix.ethereum.org

2. **Create file**  
   `contracts/SavfiSavings.sol`

3. **Paste your smart contract code**  
   (If you want, I can generate a full audited Savfi contract.)

4. **Go to Solidity Compiler → Compile**

5. **Go to Deploy & Run**
   - Environment: **Injected Provider (MetaMask)**
   - Network: your testnet
   - Click **Deploy**

6. **Copy:**
   - Contract Address
   - ABI

   You'll need these for Django.

---

### Connecting Django to the Smart Contract

1. **Install Web3:**

```bash
pip install web3
```

2. **In your Django service:**

```python
from web3 import Web3
import json
import os

web3 = Web3(Web3.HTTPProvider(os.getenv("WEB3_PROVIDER")))

with open(os.getenv("CONTRACT_ABI_PATH")) as f:
    abi = json.load(f)

contract = web3.eth.contract(
    address=os.getenv("CONTRACT_ADDRESS"),
    abi=abi
)
```

3. **Example contract call:**

```python
balance = contract.functions.getUserBalance(user_address).call()
```

4. **Example transaction:**

```python
txn = contract.functions.deposit().build_transaction({
    "from": wallet_address,
    "nonce": web3.eth.get_transaction_count(wallet_address)
})
```

---

### Environment Variables

Create a `.env` file:

```env
SECRET_KEY=your-secret
DEBUG=True

WEB3_PROVIDER=https://sepolia.infura.io/v3/YOUR_KEY
CONTRACT_ADDRESS=0xyourcontractaddress
CONTRACT_ABI_PATH=./contracts/abi/SavfiSavings.json
```

---

## 🚢 Deployment

### Deploy Smart Contracts

You can deploy using:

- **Remix** (recommended for now)
- **Hardhat** (advanced — ask and I can generate the full Hardhat setup)

### Deploy Backend (Render/Railway/Heroku)

```bash
git push
```

If you want: I can generate `render.yaml`, `Dockerfile`, or Railway config.

---

## 📘 API Documentation

### Example endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create user |
| `/api/auth/login` | POST | Login user |
| `/api/savings/deposit` | POST | Create deposit (off-chain + triggers on-chain) |
| `/api/savings/balance` | GET | Fetch hybrid balance |
| `/api/smart/trigger` | POST | Call a smart contract function |

If you want, I can create a full Swagger/OpenAPI file.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

All contributions are welcome.

---

## 📄 License

[Add your license here - MIT, Apache 2.0, etc.]

---

**Built with ❤️ by the Savfi Team**

# Solana Token Launchpad 🚀

![Hero Section](./public/Launchpad.png)

A modern, user-friendly platform for creating and managing custom tokens on the Solana blockchain. Launch your own SPL tokens in minutes with a beautiful UI and seamless wallet integration.

## ✨ Features

### 🎯 Token Creation

- Create custom SPL tokens with configurable parameters
- Set token name, symbol, and initial supply
- Upload and store token images on IPFS via Pinata
- Automatic mint authority assignment to creator's wallet

### 💰 Token Management

- View all tokens created by your wallet
- Mint additional tokens as needed
- Track token supply and distribution
- Decentralized image storage on IPFS

### 🌟 Devnet Integration

- Request SOL airdrops for testing
- Deploy tokens on Solana Devnet
- Test token functionality before mainnet launch

### 🎨 Modern UI/UX

- Responsive design for all devices
- Dark/Light mode support
- Seamless wallet connection
- Real-time transaction feedback

## 🛠 Technology Stack

### Blockchain & Web3

- Solana Web3.js
- SPL Token Program
- Solana Wallet Adapter

### Frontend

- React 18
- TypeScript
- NextUI Components
- TailwindCSS
- Lucide Icons

### Storage & Database

- IPFS via Pinata
- MongoDB Atlas

## 📦 Project Structure

```
\
├── app/               # Route Pages
│   ├── airdrop/       # Airdrop page
│   ├── create/        # Create token page
│   ├── mint/          # Mint tokens page
│   └── api/           # backend code
├── components/        # React components for pages
├── config/            # siteconfig and backend func
│   ├── solana.ts      # Solana integration
│   └── site.ts        # Site config
├── models/            # Mongodb data model
├── types/             # Typescript types
└── utils/             # util files for connections
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (e.g., Phantom)
- MongoDB Atlas account
- Pinata account for IPFS

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_uri
PINATA_JWT=your_pinata_jwt
NEXT_PINATA_GATEWAY_URL=your_pinata_gateway_url
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abhiraj2404/Token_launchpad.git
cd token_launchpad
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 📱 Usage

1. **Connect Wallet**

   - Click "Connect Wallet" in the navbar
   - Select your Solana wallet (e.g., Phantom)
   - Approve the connection

2. **Get Test SOL**

   - Navigate to the Airdrop page
   - Click "Request Airdrop"
   - Receive 1 SOL on Devnet

3. **Create Token**

   - Go to Create Token page
   - Fill in token details
   - Upload token image
   - Click "Launch Token"

4. **Manage Tokens**
   - Visit My Tokens page
   - View created tokens
   - Mint additional supply
   - Track token details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Creator

Abhiraj Chauhan - [@abhiraj_2404](https://x.com/abhiraj_2404)

Project Link - [https://solanatokenlaunchpad.vercel.app](https://solanatokenlaunchpad.vercel.app)

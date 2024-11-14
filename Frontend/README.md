# Private Purchase Platform

This project is a web application that provides users with the ability to make private dataset purchases. The platform allows users to connect their Ethereum and Monero wallets and facilitates the transfer of funds in Monero.

## Features

- **Purchase Options**: Users can choose between a "Regular Purchase" or a "Private Purchase."
- **Connect Ethereum Wallet**: Integration with RainbowKit allows users to connect their EVM-compatible wallet.
- **Private Purchase Flow**: Obtain the required information to transfer the funds to Oval's Monero wallet.

## Technologies Used

- **React** (with TypeScript)
- **Vite** for fast development
- **TailwindCSS** for styling
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum account management
- **Git** for version control

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/0xalv/privacy-oval-fe.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server:**:

   ```bash
   npm run dev
   ```

4. **Open the app in your browser**:

By default, Vite should open a browser window, but if not, you can navigate to http://localhost:5173/.

## Usage

### Selection Menu:

- Click on the **"Connect Wallet"** button to connect your Ethereum wallet using RainbowKit.
- On the home page, you will see two options: **"Regular Purchase"** and **"Private Purchase."**
- You can click **"Private Purchase"** to navigate to the respective purchase flow.

### Private Purchase:

- If you connected your Ethereum wallet in the previous page, it will appear in the purchase details.
- You will also see the asset address, the price for the purchase and Oval's Monero address where the user has to send the payment.
- Click **"Start Buy Process"** indicate you want to inititate the purchase process.
- Send the amount required from your preferred wallet or CEX without having to reveal any private information.

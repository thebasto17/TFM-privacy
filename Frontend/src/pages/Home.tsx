// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { FaEthereum, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import axios from "axios";

const Home: React.FC = () => {
  const { status, address } = useAccount();
  const navigate = useNavigate();
  const API_URL = "http://privacy.oval.pepro.io/api";
  const [randomNumber, setRandomNumber] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const assetAddress = "0x128989317D1CE60a25caa3F792de2d43C4eF74fF";
  const erc20Address = "0x128989317D1CE60a25caa3F792de2d43C4eF74fF";
  const ovalMoneroAddress =
    "58m1WdekaBrcSLDKjfEXvY6dmk9aJzpunBKWqJVkhBqzS2pp4t1bJTASFfpLH7h4f7X6fmEGE5JnzHK2xaY1enut3XVmrqH";
  const price = 0.01;
  let ethUsd: number;
  let xmrUsd: number;
  let xmrPrice: number;
  const [totalPrice, setTotalPrice] = useState<number | null | undefined>(null);

  // Function to generate a 10-digit random number
  const generateRandomNumber = (): number => {
    const min = 1000000000; // 10 digits minimum
    const max = 9999999999; // 10 digits maximum
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to calculate the XMR price from the ETH price, and add the decimal part
  const calculateXMRPrice = async (rn: number): Promise<number> => {
    try {
      // Call the CoinGecko API to get the current price of ETH and XMR
      const coinData = await axios.get(`${API_URL}/price/prices`);
      ethUsd =
        typeof coinData.data.eth !== "number"
          ? Number(coinData.data.eth)
          : coinData.data.eth;
      xmrUsd =
        typeof coinData.data.xmr !== "number"
          ? Number(coinData.data.xmr)
          : coinData.data.xmr;

      // Call the API to get the conversion price from ETH to XMR
      const xmrData = await axios.get(
        `${API_URL}/price/convertEthToXmr/${ethUsd}/${xmrUsd}/${price}`
      );
      xmrPrice =
        typeof xmrData.data.price !== "number"
          ? Number(xmrData.data.price)
          : xmrData.data.price;
      return Number.parseFloat((xmrPrice + rn / 10e11).toFixed(12)); // Convert random number to a decimal
    } catch (error) {
      console.error("Error retrieving ETH and XMR prices:", error);
      throw new Error("Error retrieving ETH and XMR prices.");
    }
  };

  // Calculating the price in real time
  useEffect(() => {
    const fetchTotalPrice = async () => {
      if (buttonClicked) {
        try {
          const price = await calculateXMRPrice(randomNumber);
          setTotalPrice(price);
        } catch (error) {
          console.error("Error calculating total price:", error);
          setTotalPrice(null);
        }
      } else {
        setTotalPrice(null);
      }
    };

    fetchTotalPrice();
  }, [buttonClicked, randomNumber]);

  const handleTransferFunds = async () => {
    if (address) {
      const rn = generateRandomNumber(); // Generate the random number
      setRandomNumber(rn);
      setButtonClicked(true);

      try {
        // Calculate the amount to transfer using the random number
        const amountToTransfer = await calculateXMRPrice(rn);

        // Call the create AddressMapping API endpoint with ethereumAddress, randomNumber, assetAddress, assetPrice and amountToTransfer
        const response = await axios.post(`${API_URL}/address-mapping`, {
          ethereumAddress: address,
          randomNumber: rn,
          erc20Address: erc20Address,
          assetAddress: assetAddress,
          assetPrice: xmrPrice,
          amountToTransfer: amountToTransfer, // Now correctly passing the calculated amount
          ethereumUsd: ethUsd,
          moneroUsd: xmrUsd,
        });

        // Log and notify the AddressMapping
        console.log("AddressMapping created:", response.data);
        alert("AddressMapping created successfully with random number: " + rn);
      } catch (error) {
        console.error("Error creating AddressMapping:", error);
        alert("Failed to create AddressMapping.");
      }
    } else {
      alert("Please connect your Ethereum wallet first.");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen w-screen bg-gray-100">
      {/* Back Button in Top-Left */}
      <div
        className="absolute top-4 left-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-2xl text-gray-600 hover:text-gray-800" />
      </div>

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
        Private Purchase
      </h1>

      {/* Description with numbered steps */}
      <p className="text-sm md:text-lg text-gray-600 mb-6 text-center md:text-start px-4">
        1. Click the <strong>Start Buy Process</strong> button to indicate you
        are going <br />
        to do the payment (you have 30 minutes to transfer the <br />
        funds from the moment you click the button). <br />
        2. Transfer the required funds to complete the purchase.
      </p>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full md:w-[540px] space-y-4">
        {/* Transfer Funds */}
        {status === "connected" ? (
          <>
            <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
              <p className="text-sm md:text-lg font-semibold">
                Before transferring the funds, you must click the button below.
              </p>
            </div>

            <button
              onClick={handleTransferFunds}
              className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg text-sm md:text-lg text-white shadow-md"
            >
              Start Buy Process
            </button>
          </>
        ) : (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
            <p>
              Please connect your Ethereum wallet to proceed with the purchase.
            </p>
          </div>
        )}

        {/* Asset to Purchase Info */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-300 shadow-inner space-y-2">
          {/* Ethereum Address */}
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-blue-500" />
            <p className="text-sm md:text-lg font-semibold text-gray-700">
              Ethereum Address:
            </p>
          </div>
          <p className="text-gray-800 text-sm break-all">
            {address ? address : "Not Connected"}
          </p>

          {/* Asset Address */}
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-blue-500" />
            <p className="text-sm md:text-lg font-semibold text-gray-700">
              Asset Address:
            </p>
          </div>
          <p className="text-gray-800 text-sm break-all">
            {assetAddress ? assetAddress : "Not Found"}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-blue-500" />
            <p className="text-sm md:text-lg font-semibold text-gray-700">
              Price:
            </p>
          </div>
          <p className="text-gray-800 text-sm">
            {buttonClicked
              ? totalPrice !== null
                ? `${totalPrice} XMR`
                : "Calculating..."
              : "Click the button above to see the price"}{" "}
          </p>

          {/* Monero Payment Address */}
          <div className="flex items-center space-x-2">
            <FaEthereum className="text-blue-500" />
            <p className="text-sm md:text-lg font-semibold text-gray-700">
              Monero Payment Address:
            </p>
          </div>
          <p className="text-gray-800 text-sm break-all">{ovalMoneroAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

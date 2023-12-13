import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/GopalWallet.json"

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [showContractAddress, setShowContractAddress] = useState(false);

  const [buyNFT, setbuyNFT] = useState("");

  const contractAddress = "0x4716ece7Ca001447E4F69260b7BC09D6Be42F43E";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      try {
        const accounts = await ethWallet.request({ method: "eth_accounts" });
        handleAccount(accounts);
      } catch (error) {
        console.log( "error" , error)
      }
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const balance = await atm.getBalance();
      setBalance(balance.toNumber());
      } catch (error) {
        console.log( "error" , error )
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit_token(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw_token(1);
      await tx.wait();
      getBalance();
    }
  };

  const BuyNFT = async () => {
    if (atm) {
      let tx = await atm.BuyNFT(1);
      await tx.wait();
      getBalance();
    }
  };

  const toggleContractAddress = () => {
    setShowContractAddress((prevShowContractAddress) => !prevShowContractAddress);
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (atm) {
      getBalance();
    }
  }, [atm]);

  return (
    <main className="container">
      <header>
        <h1>ETH + AVAX PROOF: Intermediate EVM Course Module 2 Project</h1>
        <h2>By Gopal Kumar</h2>
      </header>
      <div className="content">
        {!account ? (
          <button onClick={connectAccount}>Click to connect your MetaMask wallet</button>
        ) : (
          <>
            <p>Your Account: {account}</p>
            <div className="button-group">
              <button onClick={toggleContractAddress}>
                {showContractAddress ? "Hide Contract Address" : "Show Contract Address"}
              </button>
              {showContractAddress && (
                <div>
                  <p>Contract Address: {contractAddress}</p>
                </div>
              )}
              <button onClick={deposit}>Deposit TestNet ETH</button>
              <button onClick={withdraw}>Withdraw TestNet ETH</button>
              <button onClick={BuyNFT}>Buy NFT</button>
            </div>
          </>
        )}
      </div>
      <style jsx>{`

              main{
                height:100vh;
                display:flex;
                align-item:center;
                flex-direction:column;
                justify-content:center;

              }          

        .container {
          text-align: center;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: rgba(0,0,0,1.05);
          color:white;
        }

        header {
          margin-bottom: 20px;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .button-group {
          margin-top: 20px;
          display: flex;
          flex-direction : column;
          align-items : center;
        }

        button {
          display: block;
          margin-bottom: 10px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: green;
          color: #fff;
          border: none;
          cursor: pointer;
          width : 20vw;
        }

        button:hover {
          background-color: red;
        }
      `}</style>
    </main>
  );
}

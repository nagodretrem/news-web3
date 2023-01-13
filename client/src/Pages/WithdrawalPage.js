import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import erc20abi from "../erc20ABI.json";
import { Button } from "react-bootstrap";

const WithdrawalPage = () => {
  if (!localStorage.getItem("userDetails")) {
    window.location.href = "/";
  }
  const contractAddress = "0xAD34cdBA61a756A68e1AbcbB0CA9CA214b5F47F2";

  const [defaultAccount, setDefaultAccount] = useState("");
  const [connButtonText, setConnButtonText] = useState("Connect Metamask");
  const [userBalance, setUserBalance] = useState(0);
  const [balance, setBalance] = useState(0);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const { _id } = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await fetch(`http://localhost:5000/user/${_id}`);
        const userData = await user.json();
        setUserBalance(userData.data.balance);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
          setConnButtonText("Connected");
        });
    } else {
      console.log("Please install Metamask");
    }
  };

  const accountChangeHandler = async (newAccount) => {
    setDefaultAccount(newAccount);
    updateEther();
  };

  const updateEther = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      erc20abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const setDbBalance = async (prop) => {
    await fetch(`http://localhost:5000/user/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        balance: prop,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
  };

  const withdrawHandler = async (e) => {
    e.preventDefault();
    if (balance > userBalance) {
      setBalance(userBalance);
    }
    let tx = await contract.mint(defaultAccount, utils.parseEther(balance));
    await tx.wait();
    let newBalance = userBalance - balance;
    console.log("Withdrawal successful");
    setDbBalance(newBalance);
  };

  return (
    <div>
      <h2>Withdrawal Page</h2>
      <h3>Balance: {userBalance}</h3>
      <h3>Address: {defaultAccount}</h3>

      <form className="m-4"></form>
      <input
        type="number"
        name="amount"
        onChange={(e) => {
          if (balance > userBalance) {
            alert("Max withdraw amount " + userBalance + " token");
            e.target.value = userBalance;
          }
          setBalance(e.target.value);
        }}
        className="input input-bordered block w-full focus:ring focus:outline-none"
        placeholder="Amount to withdraw"
      />
      <Button variant="secondary" onClick={connectWalletHandler}>
        {connButtonText}
      </Button>

      <Button
        variant="secondary"
        style={{ marginTop: "10px" }}
        onClick={withdrawHandler}
        type="submit"
      >
        Withdraw
      </Button>
    </div>
  );
};

export default WithdrawalPage;

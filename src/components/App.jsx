import React from "react";
import Web3 from "web3";
import "./App.css";
import Insurance from "../abis/Insurance.json";
import Main from "./Main";
import { useState, useEffect } from "react";
import logo from "../assets/LOGO.png";

function App() {
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountBalance, setAccountBalance] = useState(0);
  const [sellerAccount, setSellerAccount] = useState("");
  const [policeAccount, setPoliceAccount] = useState("");
  const [repairAccount, setRepairAccount] = useState("");
  const [insurance, setInsurance] = useState(null);

  useEffect(() => {
    const load = async () => {
      await loadWeb3();
      await getAllAccounts();
      await loadBlockchainData();
    };
    load();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const getAllAccounts = async () => {
    let web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    setSellerAccount("0x8491106ba7c7806577e216f8560e9f3d9ecc5ecd");
    setPoliceAccount("0x61c40bc0aa7d2aa1a89535c91ea7bc1762a76513");
    setRepairAccount("0x08e1767f49597f415dcb4faaf6af70a9f468b521");
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(window.ethereum.selectedAddress);

    let accountBalance = await web3.eth.getBalance(
      window.ethereum.selectedAddress
    );
    accountBalance = web3.utils.fromWei(accountBalance, "ether");
    setAccountBalance(accountBalance);

    const insuranceContract = new web3.eth.Contract(
      Insurance.abi,
      "0x752cA0Ef9756835f2e9d422dbB0360dEbD8D0317"
    );

    setInsurance(insuranceContract);

    if (insuranceContract.options.address) {
      console.log(
        "Connected to smart contract at",
        insuranceContract.methods.productCount().call().then(console.log)
      );
    } else {
      console.log("Failed to connect to smart contract");
    }

    const methods = insuranceContract.methods;
    const methodNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(methods)
    );
    console.log(methodNames);

    if (insuranceContract) {
      const productCount = await insuranceContract.methods
        .productCount()
        .call();
      setProductCount(productCount);

      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await insuranceContract.methods.products(i).call();
        setProducts((prevProducts) => [...prevProducts, product]);
      }
      setLoading(false);
    } else {
      window.alert("Insurance contract not deployed to detected network.");
    }
  };

  const createProduct = (name, price, insurancePrice) => {
    setLoading(true);
    insurance.methods
      .createProduct(name, price, insurancePrice)
      .send({ from: account })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const purchaseProduct = (id, price) => {
    setLoading(true);
    insurance.methods
      .purchaseProduct(id, repairAccount, policeAccount)
      .send({ from: account, value: price })
      .on("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const purchaseInsurance = (id, insurancePrice) => {
    setLoading(true);
    insurance.methods
      .purchaseInsurance(id, repairAccount, policeAccount)
      .send({ from: account, value: insurancePrice })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const policeClaim = (id) => {
    setLoading(true);
    insurance.methods
      .claimPolice(id, repairAccount, policeAccount)
      .send({ from: account })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const repairClaim = (id) => {
    setLoading(true);
    insurance.methods
      .claimRepair(id, repairAccount, policeAccount)
      .send({ from: account })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const stolen = (id) => {
    setLoading(true);
    insurance.methods
      .stolen(id, repairAccount, policeAccount)
      .send({ from: account })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const repaired = (id) => {
    setLoading(true);
    insurance.methods
      .repaired(id, repairAccount, policeAccount)
      .send({ from: account })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const reimburse = (id, productPrice) => {
    setLoading(true);
    insurance.methods
      .reimburse(id, repairAccount, policeAccount)
      .send({ from: account, value: productPrice })
      .on("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };

  const payRepairShop = (id, repairFee) => {
    setLoading(true);
    insurance.methods
      .payRepairShop(id, repairAccount, policeAccount)
      .send({ from: account, value: repairFee })
      .once("receipt", (receipt) => {
        console.log(receipt);
        setLoading(false);
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            {/* logo */}
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
            <a className="navbar-brand" href="#">ClaimChain Insurance Marketplace</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </div>
            </div>
          </div>
        </nav>
      <main role="main">
        {loading ? (
          <div id="loader" className="text-center mt-5">
            <p className="text-center">Loading....</p>
          </div>
        ) : (
          <Main
            products={products}
            account={account}
            accountBalance={accountBalance}
            createProduct={createProduct}
            purchaseProduct={purchaseProduct}
            purchaseInsurance={purchaseInsurance}
            policeClaim={policeClaim}
            repairClaim={repairClaim}
            stolen={stolen}
            repaired={repaired}
            reimburse={reimburse}
            payRepairShop={payRepairShop}
            repairAccount={repairAccount}
            policeAccount={policeAccount}
            sellerAccount={sellerAccount}
          />
        )}
      </main>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import logo from './assets/LOGO.png'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
      productCount: 0,
      products: [
        {
          id: 1,
          name: 'iPhone 11',
          price: 1000,
          insurancePrice: 100,
          owner: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
          insuranceOwner: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
          purchased: false,
          insurancePurchased: false,
          claimedPolice: true,
          claimedRepair: true,
          isStolen: false,
          isRepaired: false,
          isReimbursed: false,
          paidRepairShop: false,
          purchasedTypeError: false,
        },
      ],
      loading: true,
      accountBalance: 0,
      sellerAccount: '',
      policeAccount: '',
      repairAccount: ''
    }
  }

  // test state data
  // dummy acc 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

  // to change the account from frontend,
  // use inspect element -> application -> local storage -> change the account

  async componentWillMount() {
    this.setState({ loading: false })
  }

  async loadWeb3() {

  }

  async getAllAccounts() {

  }

  async loadBlockchainData() {

  }

  createProduct = (name, price, insurancePrice) => {

  }

  purchaseProduct = (id, price) => {

  }

  purchaseInsurance = (id, insurancePrice) => {

  }

  policeClaim = (id) => {

  }

  repairClaim = (id) => {

  }

  stolen = (id) => {

  }

  repaired = (id) => {

  }

  reimburse = (id, productPrice) => {

  }

  payRepairShop = (id, repairFee) => {

  }

  render() {
    return (
      <div>
        {/* NavBar */}
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
          {this.state.loading
            ?
            <div id="loader"
              className="text-center mt-5"><p className="text-center">Loading....</p></div>
            :
            <Main
              products={this.state.products}
              account={this.state.account}
              accountBalance={this.state.accountBalance}
              createProduct={this.createProduct}
              purchaseProduct={this.purchaseProduct}
              purchaseInsurance={this.purchaseInsurance}
              policeClaim={this.policeClaim}
              repairClaim={this.repairClaim}
              stolen={this.stolen}
              repaired={this.repaired}
              reimburse={this.reimburse}
              payRepairShop={this.payRepairShop}
              repairAccount={this.state.repairAccount}
              policeAccount={this.state.policeAccount}
              sellerAccount={this.state.sellerAccount} />
          }
        </main>
      </div>
    );
  }
}

export default App;
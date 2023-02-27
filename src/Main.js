import React, { Component } from 'react'
import Shop from './assets/Shop.png'
import Buyer from './assets/Buyer.png'
import Police from './assets/Police.png'
import Repair from './assets/Repair.png'
import './App.css'

class Main extends Component {

    formSubmit = (event) => {

    }

    productBuy = (event) => {
    }

    insuranceBuy = (event) => {
    }

    claimPolice = (event) => {
    }

    claimRepair = (event) => {
    }

    stolen = (event) => {
    }

    notStolen = (event) => {
    }

    repaired = (event) => {
    }

    reimburse = (event) => {
    }

    payRepairShop = (event) => {
    }

    render() {
        return (

            < div className='div-style' >
                {/* Account Details */}
                {
                    this.props.account == this.props.sellerAccount
                        ?
                        <div className='sub-div-style  styly-heading'>
                            <div className='float-right'>
                                <img src={Shop} width='300px'></img>
                            </div>
                            <div className='mr-5 text-justify'>
                                <h1 class="display-4"><b>Product Shop</b></h1>
                            </div>
                        </div>
                        :
                        null
                }
                {/* Displaying the account details of the user if he is a Police Officer */}
                {
                    this.props.account == this.props.policeAccount
                        ?
                        <div className='sub-div-style'>
                            <div className='float-right'>
                                <img src={Police} width='300px'></img>
                            </div>
                            <div className='mr-5 text-justify styly-heading'>
                                <h1 class="display-4">Police Department</h1>
                            </div>
                        </div>
                        :
                        null
                }
                {/* Displaying the account details of the user if he is a Repair Shop */}

                {
                    this.props.account == this.props.repairAccount
                        ?
                        <div className='sub-div-style'>
                            <div className='float-right'>
                                <img src={Repair} width='300px'></img>
                            </div>
                            <div className='mr-5 text-justify styly-heading'>
                                <h1 class="display-4">Repair Shop</h1>
                            </div>
                        </div>
                        :
                        null
                }
                {/* Displaying the account details of the user if he is a Buyer */}
                {
                    this.props.account !== this.props.sellerAccount && this.props.account !== this.props.policeAccount && this.props.account !== this.props.repairAccount
                        ?
                        <div className='sub-div-style'>
                            <div className='float-right'>
                                <img src={Buyer} width='300px'></img>
                            </div>
                            <div className='mr-5 text-justify styly-heading'>
                                <h1 class="display-4">Hello, Buyer!</h1>
                            </div>
                        </div>
                        :
                        null
                }
                {/* Displaying the account details of the user */}

                <div id="content" className="sub-div-style account-details">
                    <h4><b><i>Account Address :</i></b></h4>
                    <h5>{this.props.account}</h5>
                    <h4><b><i>Account Balance :</i></b></h4>
                    <h5>{this.props.accountBalance} ETH</h5>
                </div>
                {/* Form to add a product to the blockchain is displayed if the user is a Shop */}
                {
                    this.props.account == this.props.sellerAccount
                        ?
                        <div id="content" className="sub-div-style form-style">
                            <h4><b>Add Product :</b></h4>
                            <form onSubmit={this.formSubmit} className=''>
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="productName"
                                        type="text"
                                        ref={(input) => { this.productName = input }}
                                        className="form-control"
                                        placeholder="Product Name"
                                        required />
                                </div>
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="productPrice"
                                        type="text"
                                        ref={(input) => { this.productPrice = input }}
                                        className="form-control"
                                        placeholder="Product Price"
                                        required />
                                </div>
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="insurancePrice"
                                        type="text"
                                        ref={(input) => { this.insurancePrice = input }}
                                        className="form-control"
                                        placeholder="Insurance Price"
                                        required />
                                </div>
                                <button type="submit" className="btn btn-dark">Add Product</button>
                            </form>
                        </div>
                        :
                        null
                }
                {/* Options to buy a product and insurance is displayed if the user is a Buyer */}
                {
                    this.props.account !== this.props.policeAccount && this.props.account !== this.props.repairAccount
                        ?
                        <div id="content" className="sub-div-style">
                            <h4 className='mb-3'><b>Buy Product with Insurance :</b></h4>
                            <table className="table text-center table-dark table-borderless table-striped table-hover table-style">
                                <thead id='table-head'>
                                    <tr>
                                        <th scope="col"><i>No.</i></th>
                                        <th scope="col"><i>Name</i></th>
                                        <th scope="col"><i>Product Owner</i></th>
                                        <th scope="col"><i>Product Price</i></th>
                                        <th scope="col"><i>Buy Product</i></th>
                                        <th scope="col"><i>Insurance Price</i></th>
                                        <th scope="col"><i>Buy Insurance</i></th>
                                        <th scope="col"><i>Police</i></th>
                                        <th scope="col"><i>Repair</i></th>
                                        <th scope="col"><i>Claim update</i></th>
                                    </tr>
                                </thead>
                                <tbody id="productList">
                                    {this.props.products.map((product, key) => {
                                        console.log(this.props.account)
                                        console.log(product)
                                        return (
                                            <tr key={key}>
                                                <th scope="row">{product.id.toString()}</th>
                                                <td>{product.name}</td>
                                                <td>{product.owner}</td>
                                                <td>{product.price.toString()} Eth</td>
                                                <td>
                                                    {!product.purchased
                                                        ?
                                                        <button className='btn btn-primary btn-block' type="submit" name={product.id} value={product.price} onClick={this.productBuy}>Buy</button>
                                                        : <i>Purchased &#10004;</i>
                                                    }
                                                </td>
                                                <td> {product.insurancePrice.toString()} Eth</td>
                                                <td>
                                                    {product.purchased && !product.insurancePurchased
                                                        ?
                                                        <button className='btn btn-primary btn-block' type="submit" name={product.id} value={product.insurancePrice} onClick={this.insuranceBuy}>Buy</button>
                                                        : product.insurancePurchased ? <i>Purchased &#10004;</i> : <i>Buy Product</i>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        !product.claimedPolice && !product.claimedRepair && product.purchased && product.insurancePurchased
                                                            ?
                                                            <button className='btn btn-primary btn-block' type="submit" name={product.id} onClick={this.claimPolice}>Stolen</button>
                                                            :
                                                            product.claimedPolice
                                                                ?
                                                                <i>Informed police</i>
                                                                :
                                                                product.claimedRepair
                                                                    ?
                                                                    <i>Repair service claimed</i>
                                                                    :
                                                                    !product.purchased
                                                                        ?
                                                                        <i>Buy Product</i>
                                                                        :
                                                                        !product.insurancePurchased
                                                                            ?
                                                                            <i>Buy Insurance</i>
                                                                            :
                                                                            null
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        !product.claimedRepair && !product.claimedPolice && product.purchased && product.insurancePurchased
                                                            ?
                                                            <button className='btn btn-primary btn-block' type="submit" name={product.id} onClick={this.claimRepair}>Broken</button>
                                                            :
                                                            product.claimedRepair
                                                                ?
                                                                <i>Repair service claimed</i>
                                                                :
                                                                product.claimedPolice
                                                                    ?
                                                                    <i>--</i>
                                                                    :
                                                                    !product.purchased
                                                                        ?
                                                                        <i>Buy Product</i>
                                                                        :
                                                                        !product.insurancePurchased
                                                                            ?
                                                                            <i>Buy Insurance</i>
                                                                            :
                                                                            null
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.isRepaired && !product.paidRepairShop
                                                            ?
                                                            <div>
                                                                <i className='mr-2'><b>Repaired!</b></i>
                                                                <button className='btn btn-primary btn-block mt-2' type="submit" name={product.id} value={product.price / 2} onClick={this.payRepairShop}>Pay Repair Shop</button>
                                                            </div>
                                                            :
                                                            product.isStolen && !product.isReimbursed
                                                                ?
                                                                <div>
                                                                    <i><b>Stolen!</b></i>
                                                                    <button className='btn btn-primary btn-block mt-2' type="submit" name={product.id} value={product.price} onClick={this.reimburse}>Reimburse</button>
                                                                </div>
                                                                :
                                                                !product.purchased
                                                                    ?

                                                                    <i>Buy Product</i>
                                                                    :
                                                                    !product.insurancePurchased
                                                                        ?
                                                                        <i>Buy Insurance</i>
                                                                        :
                                                                        !product.claimedRepair && !product.claimedPolice && product.insurancePurchased
                                                                            ?
                                                                            <i>Not Claimed</i>
                                                                            :
                                                                            product.claimedPolice && !product.isReimbursed
                                                                                ?
                                                                                <i>Claimed</i>
                                                                                :
                                                                                product.claimedRepair && !product.isRepaired
                                                                                    ?
                                                                                    <i>Claimed</i>
                                                                                    :
                                                                                    product.isReimbursed && product.isStolen
                                                                                        ?
                                                                                        <i>Reimbursed</i>
                                                                                        :
                                                                                        product.claimedRepair && !product.isRepaired
                                                                                            ?
                                                                                            <i>Claimed</i>
                                                                                            :
                                                                                            product.claimedPolice && !product.isRepaired
                                                                                                ?
                                                                                                <i>Claimed</i>
                                                                                                :
                                                                                                product.paidRepairShop && product.isRepaired
                                                                                                    ?
                                                                                                    <i>Paid Repair Shop</i>
                                                                                                    :
                                                                                                    null

                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        :
                        null
                }
                {/* Show Police Account Notifications if police account is logged in */}
                {
                    this.props.account == this.props.policeAccount
                        ?
                        <div id="content" className="sub-div-style">
                            <h4><b>Notifications and Feed :</b></h4>
                            {
                                this.props.products.map((product, key) => {
                                    console.log(product)
                                    return (
                                        product.claimedPolice && !product.isStolen
                                            ?
                                            <div className='mb-3 mt-3 notification-border shadow p-3'>
                                                <h5><b>{`${product.name} owned by ${product.owner} is claimed to be stolen, please verify.`}<button className='ml-4 btn btn-dark btn-lg' name={product.id} onClick={this.stolen}>Stolen</button><button className='ml-3 btn btn-dark btn-lg'>Not Stolen</button></b></h5>
                                            </div>
                                            :
                                            product.isStolen
                                                ?
                                                <div className='mb-3 mt-3 notification-border shadow p-3'>
                                                    <h5><b>{`${product.name} owned by ${product.owner} is stolen and has been notified to the shop.`}</b></h5>
                                                </div>
                                                :
                                                null
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }
                {/* Show Repair Account Notifications if repair account is logged in */}
                {
                    this.props.account == this.props.repairAccount
                        ?
                        <div id="content" className="sub-div-style">
                            <h4><b>Repair orders :</b></h4>
                            {
                                this.props.products.map((product, key) => {
                                    console.log(product)
                                    return (
                                        product.claimedRepair && !product.isRepaired
                                            ?
                                            <div className='mb-3 mt-3 notification-border shadow p-3'>
                                                <h5><b>{`${product.name} owned by ${product.owner} is claimed to be repair.`}<button className='ml-4 btn btn-dark btn-lg' name={product.id} onClick={this.repaired}>Repaired</button><button className='ml-3 btn btn-dark btn-lg'>Cannot be repaired</button></b></h5>
                                            </div>
                                            :
                                            product.isRepaired
                                                ?
                                                <div className='mb-3 mt-3 notification-border shadow p-3'>
                                                    <h5><b>{`${product.name} owned by ${product.owner} has been repaired.`}</b></h5>
                                                </div>
                                                :
                                                null
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }

            </div >
        );
    }
}

export default Main;
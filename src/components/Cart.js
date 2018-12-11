import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table} from 'reactstrap';

class cart extends Component {
    state = { cartproduk : [] }    

    componentDidMount() {
        axios.get(`http://localhost:1997/cart`)
            .then((res) => {
                console.log(res)
                this.setState({cartproduk: res.data})
                console.log(this.state.cartproduk)

            }).catch((err) => {
                console.log(err)
            })
    }

    getcartlist = () => {
        axios.get('http://localhost:1997/cart')
            .then((res) => {
                // console.log(res)    
                this.setState({cartproduk: res.data})
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnCartRemoveClick = (id) => {
        axios.delete('http://localhost:1997/cart/' + id)
            .then((res) => {
                this.getcartlist();
            }).catch((err) => {
                console.log(err);                
            })
    }

    onBtnCheckOutClick = () => {
        axios.post('http://localhost:1997/history', {
            user : this.props.username,
            detail : this.state.cartproduk
        }).then((res) => {
            for(var i = 1; i <= this.state.cartproduk.length + 1 ; i++){
                axios.delete('http://localhost:1997/cart/' + i)
                .then((res) => {
                    this.getcartlist();
                }).catch((err) => {
                    console.log(err);                
                })
            }    
        }).catch((err) => {
            console.log(err);                
        })
    } 
    rendercartPopok = () => {
        var listcart = this.state.cartproduk.map((item) => {
            if(item.user === this.props.username) {
                return  (
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.nama}</td>
                    <td>{item.qty}</td>
                    <td>{item.harga}</td>
                    <td>{item.totalharga}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" onClick="onbBtnCartEditClik" /></td>
                    <td><input className="btn btn-danger" type="button" value="Remove" onClick="onBtnCartRemoveClick"/></td>
                  </tr>
                )
                    
            }         
        })
        return listcart;
            
    }

    render() {
        if(this.props.username !== undefined) {
            return (
                <div>
                    <div>
                        <center>
                        <h1>Cart</h1>
                        </center>
                    </div>
                    <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendercartPopok()}
                    </tbody>
                    
                    </Table>
                    <div>
                        <center>
                        <h2>Total Price:{}</h2>
                        </center>
                    </div>
                    <div className="col-3" style={{marginTop: "10px"}}>
                        <input className="btn btn-success" type="button" value="CheckOut" onClick={this.onBtnCheckOutClick}/>
                    </div>
                </div>
            )         
        } 
        // console.log(this.state.cartproduk)
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {
        produk: state.selectedProduk,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(cart);
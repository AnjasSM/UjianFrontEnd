import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { select_popok } from '../actions';

class PopokDetail extends Component {
    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var popokId = params.popokid;
        axios.get(`http://localhost:1997/popok/${popokId}`)
            .then((res) => {
                this.props.select_popok(res.data)
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

    onBtnAddToCart =()=>{
        var nama = this.refs.namaAddCart.value;
        var merk = this.refs.merkAddCart.value;
        var harga = this.refs.hargaAddCart.value;
        var img = this.refs.imgAddCart.value;
        var qty = this.refs.qtyAddCart.value;
        var description = this.refs.descAddCart.value;

        axios.post('http://localhost:1997/cart', {
                nama, merk, harga, img, qty, description
            }).then((res) => {
                this.getCartList();
            }).catch((err) => {
                console.log(err)
            })
    }

     render() {
        var { nama, harga, img, description, merk } = this.props.popok;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img ref="imgAddCart" alt={img} src={img} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row" ref="namaAddCart">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3 ref="merkAddCart">{merk}</h3>
                        </div>
                        <div className="row">
                            <h2 ref="hargaAddCart">Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p ref="descAddCart">{description}</p>
                        </div>
                        <div className="col-4">
                            <input ref="qtyAddCart" type="number" placeholder="QTY" />
                            <input type="button" className="btn btn-success" value="Add to Cart" onClick={this.onBtnAddToCart} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedPopok }
}

export default connect(mapStateToProps, { select_popok })(PopokDetail);

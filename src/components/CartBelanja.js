import React from 'react';
import { Table,Input } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Cart extends React.Component {
    state = {listCart : []}
  
    componentDidMount(){
        this.renderListCart()
    }

    renderListCart = () => {
    axios.get('http://localhost:1997/cart' , {
      params : {
        username : this.props.username
      }
    })
    .then((res) => {
      console.log(res)
      this.setState({listCart : res.data})
    })

    var listJsx = this.state.listCart.map((item) => {
        return(
          <tr>
            <td>{item.id}</td>
            <td>{item.nama}</td>
            <td>{item.img}</td>
            <td>{item.harga}</td>
            <td>{item.qty}</td>
            <td>{item.TotalHarga}</td>
            
          </tr>
      )
    })
    return listJsx;
  }

    onCheckOut = () => {
        axios.post('http://localhost:1997/history', {
            username : this.props.username,
            order : this.state.listCart
    })
    .then((res) => {
        console.log(res)
        for(let i = 0 ; i < this.state.listCart.length ; i ++){
            axios.delete('http://localhost:1997/cart/' + this.state.listCart[i].id    

        ).then((res) => {
          console.log(res)
          this.renderListCart()
        })
      }
    })
  }

    renderTotalHarga = () => {
        var a = 0
        for(let i = 0; i < this.state.listCart.length ; i++){
            a += this.state.listCart[i].total
        }
        return(
            <div className='col-2'>
                <h3>{a}</h3>
                    <Input className="btn btn-success" type='button' value='CHECKOUT' onClick ={this.onCheckOut}/>
            </div>
        )
    }

    render() {
        if(this.state.listCart.length > 0){

        return (
        <div className='container'>
            <center>
                <h1 style={{marginTop:'20px'}}>CART</h1>
            </center>
        <Table style={{marginTop:'40px'}}>
            <thead>
            <tr>
                <th>id</th>
                <th>Nama Produk</th>
                <th>Image</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Total Harga</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        {this.renderListCart()}
        </Table>
            <center>
                <h2>Total Harga : Rp.{this.renderTotalHarga()}</h2>
            </center>
      </div>

    );

    }else{

      return(
        <center>
          <div className='col-4'>
          <h1>Keranjang anda kosong</h1>
          <Link to='/produk'><Input type="button" className='btn btn-default' value="Lanjutkan Belanja"/></Link>
          </div>
        </center>

      )
    }
  }
}

const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}

export default connect(mapStateToProps)(Cart);
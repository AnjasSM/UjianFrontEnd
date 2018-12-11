import React, { Component } from 'react';

class HistoryBelanja extends Component {

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
    }
    
    render() {
        return (
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
        )
    }
}

export default HistoryBelanja;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeBertasbih extends Component {
    state = { listPopok: [] }

    componentWillMount() {
        axios.get('http://localhost:1997/popok')
            .then((res) => {
                this.setState({ listPopok: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderListPopok = () => {
        var listJSXPopok = this.state.listPopok.map((item) => {
            return (
                <div>
                    <h3>{item.nama}</h3>
                    <img src={item.img} />
                    <p>{item.description}</p>
                </div>
            )
        })
        return listJSXPopok;
    }

    render() {
        console.log(this.state.listPopok)
        return(
            <div>
                <center><h1>Enjoy Your IceTime</h1></center>
                {this.renderListPopok()}
                {/* <h2>{this.props.pikachu}</h2> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { pikachu: state.pikachu };
}

export default connect(mapStateToProps)(HomeBertasbih);

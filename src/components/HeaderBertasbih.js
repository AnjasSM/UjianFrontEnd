import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { onUserLogout, keepLogin } from '../actions';

const cookies = new Cookies();

class HeaderBertasbih extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogOutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('Ferguso');
    }

    getApiCart = () => {
        axios.get('http://localhost:2000/cart', {
          params : {
            username : this.props.username
          }
        }).then((res) => {
          console.log(res.data.length) 
          this.setState({jumlah : res.data.length})
        })
      }

    render() {
        if(this.props.username === "") {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/popoklist"><NavLink>Browse Popok</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/register"><NavLink>Register</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/login"><NavLink>Login</NavLink></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }
        
        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/popoklist">Browse Ice Cream</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, {this.props.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/managepopok">Manage Ice Cream</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/cart">Cart</Link>
                                </DropdownItem><DropdownItem>
                                    <Link to="/history">History</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onLogOutSelect}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps, { onUserLogout, keepLogin })(HeaderBertasbih);

// var objKucing = { kurcaci: 'Hello', bertasbih: { nyingnyong: 'Teletubies'} }

// console.log(objKucing.bertasbih.nyingnyong)

// var { nyingnyong } = objKucing.bertasbih;

// console.log(nyingnyong);
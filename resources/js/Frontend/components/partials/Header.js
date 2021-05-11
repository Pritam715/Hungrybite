import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import Home from '../HomePage';
import Cart from '../cart/Cart';

export default function Header() {
    return (

        <div>

            <header className="top-navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">
                            <img src="Frontend/images/logo.png" alt="" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbars-rs-food">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"><Link className="nav-link" to="/home">Home</Link></li>
                                <li className="nav-item"><a className="nav-link" href="menu.html">Menu</a></li>
                                <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown-a">
                                        <a className="dropdown-item" href="reservation.html">Reservation</a>
                                        <a className="dropdown-item" href="stuff.html">Stuff</a>
                                        <a className="dropdown-item" href="gallery.html">Gallery</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Blog</a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown-a">
                                        <a className="dropdown-item" href="blog.html">blog</a>
                                        <a className="dropdown-item" href="blog-details.html">blog Single</a>
                                    </div>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>


            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/cart" component={Cart} />
            </Switch>

        </div>
    );
}


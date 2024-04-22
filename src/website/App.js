// import "./theme/vendor/bootstrap/css/bootstrap.css"
import "./theme/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./theme/fonts/iconic/css/material-design-iconic-font.min.css"
import "./theme/fonts/linearicons-v1.0.0/icon-font.min.css"
import "./theme/vendor/animate/animate.css"
import "./theme/vendor/hamburgers/hamburgers.css"
// import "./theme/vendor/animsition/css/animsition.css"
import "./theme/vendor/slick/slick.css"

import "./theme/vendor/MagnificPopup/magnific-popup.css"
import "./theme/vendor/PerfectScrollbar/perfect-scrollbar.css"
import "./theme/css/util.css"
import "./theme/css/main.css"
// import animsition from "animsition"

import React, { Component } from 'react';

import Preloader from "../jewell/components/layouts/Preloader";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

// Component
import Home from './pages/Home';
import Shop from "./pages/Shop";
import About from "./pages/About";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";

import Login from "./pages/visitors/login/Login"
import Register from "./pages/visitors/login/Register"
import ForgetPassword from "./pages/visitors/login/ForgetPassword"
import ResetPassword from "./pages/visitors/login/ResetPassword"

import Header from './components/layouts/Header';
import Cart from './components/layouts/Cart';
import Footer from './components/layouts/Footer';
import Admingate from "./Admingate"


import { connect } from 'react-redux';
import { getAdmin } from "./features/auth/adminAuctions"

import Authenticate from "./Authenticate"
import Profile from "./pages/Profile"
import CustomerForm from "./pages/customer"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showPreload: true };
    }

    preloading() {
        this.setState(state => ({
            showPreload: false
        }));
    }

    componentDidMount() {
        setInterval(() => this.preloading(), 600);
        this.props.getAdmin({ site_url: this.props.site_url })
        // document.body.dataset.pageVersion = 'dashboard';
    }

    render() {
        return (
            <div>
                {/* <Header /> */}
                {this.state.showPreload ? <Preloader /> : null}
                {!this.state.showPreload ? <Mainwrapper /> : null}
            </div >
        );
    }
}

const Mainwrapper = () => {
    return (

        <>
            <div className="animsition" >
                {/* <animsition> */}

                <Header />

                {/* <Cart /> */}

                <Routes>
                    <Route element={<Admingate />}>

                        <Route path=":site_url" element={<Home />} />
                        <Route path=":site_url/home" element={<Home />} />
                        <Route path=":site_url/shop" element={<Shop />} />
                        <Route path=":site_url/about" element={<About />} />
                        <Route path=":site_url/category" element={<Category />} />
                        <Route path=":site_url/contact" element={<Contact />} />
                        <Route path=":site_url/product/:encrypt_id" element={<Product action="form" />} />
                        <Route path=":site_url/shop/:code" element={<Shop />} />
                        <Route path=":site_url/shop/search/:word" element={<Shop />} />

                        {/* Visitor */}
                        <Route element={<Authenticate />}>
                            <Route path=":site_url/login" element={<Login />} />
                            <Route path=":site_url/profile" element={<Profile />} />
                            <Route path=":site_url/enquiry" element={<Enquiry />} />
                            <Route path=":site_url/profile/edit/:encrypt_id" element={<CustomerForm action="form" />} />
                        </Route>
                        <Route path=":site_url/register" element={<Register />} />
                        <Route path=":site_url/forget/password" element={<ForgetPassword />} />
                        <Route path=":site_url/reset/password/:token" element={<ResetPassword />} />
                    </Route>
                </Routes>

                <Footer />
                {/* </animsition> */}
            </div >

        </>
    )
}

const mapDispatchToProps = dispatch => ({
    getAdmin: (payload) => dispatch(getAdmin(payload)),
});

export default connect(null, mapDispatchToProps)(App);
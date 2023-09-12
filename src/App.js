import 'bootstrap/dist/css/bootstrap.css';
import "./jewell/theme/css/style.css"
import React, { Component } from 'react';
import './App.css';

// Component
import Header from './jewell/components/layouts/Header';
import CustomerForm from './jewell/pages/customer/Index';
import SampleForm from './jewell/pages/sample/Index';
import Preloader from './jewell/components/layouts/Preloader';
import StatusBar from './jewell/components/layouts/StatusBar';
import { Routes, Route } from "react-router-dom";

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
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.showPreload ? <Preloader /> : null}
        {!this.state.showPreload ? <Mainwrapper /> : null}
      </div >
    );
  }
}

const Mainwrapper = () => {
  return (
    <>
      <Routes>
        {/* <StatusBar /> */}
        <Route path="customer/add" element={<CustomerForm action="form" />} />
        <Route path="customer/list" element={<CustomerForm action="list" />} />
        <Route path="sample/add" element={<SampleForm action="form" />} />
        <Route path="sample/list" element={<SampleForm action="list" />} />
      </Routes>
    </>
  )
}


export default App;

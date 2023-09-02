import 'bootstrap/dist/css/bootstrap.css';
import "./jewell/theme/css/style.css"
import React, { Component } from 'react';
import './App.css';

// Component
import Header from './jewell/components/layouts/Header';
import CustomerForm from './jewell/pages/customer/Index';
import Preloader from './jewell/components/layouts/Preloader';
import StatusBar from './jewell/components/layouts/StatusBar';

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
      {/* <StatusBar /> */}
      <CustomerForm />
    </>
  )
}


export default App;

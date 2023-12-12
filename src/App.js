import 'bootstrap/dist/css/bootstrap.css';
import "./jewell/theme/css/style.css"
import React, { Component } from 'react';
import './App.css';

// Component
import Header from './jewell/components/layouts/Header';

import CustomerForm from './jewell/pages/customer/Index';
import WorkerForm from './jewell/pages/worker/Index';
import CategoryForm from './jewell/pages/category/Index';
import ItemForm from './jewell/pages/product/Index';
import TaskForm from './jewell/pages/task/Index';

import LoginIndex from './jewell/pages/login/LoginIndex';
import ResetPassword from './jewell/pages/login/ResetPassword';
import Register from './jewell/pages/login/Register';
import ForgetPassword from './jewell/pages/login/ForgetPassword';

import CustomerList from './jewell/pages/customer/List';
import CategoryList from './jewell/pages/category/List';
import WorkerList from './jewell/pages/worker/List';
import ItemList from './jewell/pages/product/List';
import TaskList from './jewell/pages/task/List';

import SampleForm from './jewell/pages/sample/Index';
import Preloader from './jewell/components/layouts/Preloader';
import StatusBar from './jewell/components/layouts/StatusBar';
import { Routes, Route, Router } from "react-router-dom";
import Profile from './jewell/pages/Profile';
import Authenticate from './Authenticate';
import Unauthenticate from './Unauthenticate';

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
    document.body.dataset.pageVersion = 'dashboard';

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

    // <Router>
    <>
      {/* <Header /> */}
      <Routes>
        {/* <React.Fragment> */}

        {/* <StatusBar /> */}
        <Route element={<Unauthenticate />}>
          <Route path="login" element={<LoginIndex />} />
          <Route path="/" element={<LoginIndex />} />
          <Route path="/register" element={<LoginIndex />} />
          <Route path="/reset/password" element={<LoginIndex />} />
          <Route path="/forget/password" element={<LoginIndex />} />
        </Route>

        <Route element={<Authenticate />}>
          <Route path="profile" element={<Profile />} />
          <Route path="customer/add" element={<CustomerForm action="form" />} />
          <Route path="customer/edit/:encrypt_id" element={<CustomerForm action="form" />} />
          <Route path="customer/list" element={<CustomerList action="list" />} />

          <Route path="worker/add" element={<WorkerForm action="form" />} />
          <Route path="worker/edit/:encrypt_id" element={<WorkerForm action="form" />} />
          <Route path="worker/list" element={<WorkerList action="list" />} />


          <Route path="category/add" element={<CategoryForm action="form" />} />
          <Route path="category/edit/:encrypt_id" element={<CategoryForm action="form" />} />
          <Route path="category/list" element={<CategoryList action="list" />} />

          <Route path="product/add" element={<ItemForm action="form" />} />
          <Route path="product/edit/:encrypt_id" element={<ItemForm action="form" />} />
          <Route path="product/list" element={<ItemList action="list" />} />

          <Route path="task/add" element={<TaskForm action="form" />} />
          <Route path="task/edit/:encrypt_id" element={<TaskForm action="form" />} />
          <Route path="task/list" element={<TaskList action="list" />} />

          <Route path="sample/add" element={<SampleForm action="form" />} />
          <Route path="sample/list" element={<SampleForm action="list" />} />
        </Route>
        {/* </React.Fragment> */}
      </Routes>

    </>
  )
}


export default App;

import 'bootstrap/dist/css/bootstrap.css';
import "./theme/css/style.css"
import React, { Component } from 'react';

// Component
import AdminForm from './pages/admin/Index';
import CustomerForm from './pages/customer/Index';
import WorkerForm from './pages/worker/Index';
import CategoryForm from './pages/category/Index';
import ItemForm from './pages/product/Index';
import TaskForm from './pages/task/TaskForm';
import ProfileForm from './pages/profile/Index';

import Website from './pages/website/Index';
import Dashboard from './pages/dashboard';

import Login from './pages/login/Login';
import ResetPassword from './pages/login/ResetPassword';
import Register from './pages/login/Register';
import ForgetPassword from './pages/login/ForgetPassword';

import AdminList from './pages/admin/List';
import CustomerList from './pages/customer/List';
import CategoryList from './pages/category/List';
import WorkerList from './pages/worker/List';
import ItemList from './pages/product/List';
import TaskList from './pages/task/TaskList';

import SampleForm from './pages/sample/Index';
import Preloader from './components/layouts/Preloader';
import StatusBar from './components/layouts/StatusBar';
import { Routes, Route, Router } from "react-router-dom";
import Profile from './pages/Profile';
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
  }

  render() {
    return (
      <>
        {/* <Header /> */}
        {this.state.showPreload ? <Preloader /> : null}
        {!this.state.showPreload ? <Mainwrapper /> : null}
      </>
    );
  }
}

const Mainwrapper = () => {
  return (

    // <Router>
    <>
      {/* <Header /> */}
      <Routes basename="/admin">
        {/* <React.Fragment> */}

        {/* <StatusBar /> */}
        <Route element={<Unauthenticate />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget/password" element={<ForgetPassword />} />
          <Route path="reset/password/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<Authenticate />}>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit/:encrypt_id" element={<ProfileForm action="form" />} />

          <Route path="website" element={<Website action="form" />} />
          <Route path="dashboard" element={<Dashboard action="form" />} />
          
          <Route path="admin/add" element={<AdminForm action="form" />} />
          <Route path="admin/edit/:encrypt_id" element={<AdminForm action="form" />} />
          <Route path="admin/list" element={<AdminList action="list" />} />

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

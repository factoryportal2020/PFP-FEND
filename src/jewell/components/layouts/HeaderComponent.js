import React from 'react';
import profileLogo from "../../theme/images/profile/6.jpg";
import { useGetUserDetailsQuery } from '../../app/services/auth/authService';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from '../forms/validate';
import { workerTaskWorkerId, categoryTaskCategoryId, categoryItemCategoryId } from '../../features/auth/viewSlice';

//disptach
import { logout, changeNavMenu } from '../../features/auth/authSlice';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavCollapsed: true, isProfileDropdown: false, userInfo: props.userInfo,
      navMenu: { ...props.auth.navMenu },
      permissions: [...props.auth.permissions]
    };
    this.handleIsNavCollapsed = this.handleIsNavCollapsed.bind(this);
    this.handleIsProfileDropdown = this.handleIsProfileDropdown.bind(this);
    this.clickLink = this.clickLink.bind(this);


    // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    //   // perform a refetch every 15mins
    //   pollingInterval: 900000,
    // })

    // console.log(data) // user object

    //Auth

  }

  componentDidMount() {
    let urlMenuName = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : "Dashboard";
    urlMenuName = validator.toCapitalize(urlMenuName);
    console.log(this.state.permissions);
    this.setState({ navMenu: urlMenuName })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ navMenu: nextProps.auth.navMenu, permissions: nextProps.auth.permissions });
  }

  handleIsNavCollapsed() {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  handleIsProfileDropdown(value) {
    this.setState({ isProfileDropdown: value });
  }

  clickLink(e) {
    let menuName = e.target.id;
    console.log(menuName)
    this.setState({ navMenu: menuName })
    this.props.changeNavMenu(menuName)
    this.props.workerTaskWorkerId("")
    this.props.categoryTaskCategoryId("")
    this.props.categoryItemCategoryId("")
  }

  render() {
    const navMenu = this.state.navMenu;
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <div className="corner-background"> */}
          <Link className="navbar-brand brown fw-normal" to="/">Jewell<br />Pocket Factory<br />Poche</Link>
          {/* </div> */}
          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.handleIsNavCollapsed}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${this.state.isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
            <ul className="navbar-nav me-auto mb-auto">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#/">Action</a></li>
                  <li><a className="dropdown-item" href="#/">Another action</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#/">Something else here</a></li>
                </ul>
              </li> */}
              {/* <li className="nav-item mx-3">
                <a className='menu-link menu-link-active bg-color1' href="#/">
                  <span className='menu-icon'>
                    <i className="fa-solid fa-bell fs-3" />
                  </span><br />
                  <span className='menu-text'>Customer</span>
                </a>
                <a className='menu-link bg-color2' href="#/">
                  <span className='menu-icon'>
                    <i className="fa-solid fa-bell fs-3" />
                  </span><br />
                  <span className='menu-text'>Category</span></a>
                <a className='menu-link bg-color3' href="#/">
                  <span className='menu-icon'>
                    <i className="fa-solid fa-bell fs-3" />
                  </span><br />
                  <span className='menu-text'>Workers</span></a>
                <a className='menu-link bg-color4' href="#/">
                  <span className='menu-icon'>
                    <i className="fa-solid fa-bell fs-3" />
                  </span><br />
                  <span className='menu-text'>Orders</span></a>
                <a className='menu-link bg-color5' href="#/">
                  <span className='menu-icon'>
                    <i className="fa-solid fa-bell fs-3" />
                  </span><br />
                  <span className='menu-text'>Assigns</span></a>
                <a className='menu-link bg-color6' href="#/">
                  <span className='menu-icon'>
                    <i className="fa-solid fa-bell fs-3" />
                  </span><br />
                  <span className='menu-text'>Items</span></a>
              </li> */}

              {/* <li className="nav-item mx-3 mt-3">
                <Link role="button" onClick={this.clickLink("Dashboard")} to="/dashboard"
                  className={"navMenu " + (navMenu == "Dashboard" ? "navMenu-active" : "")}>
                  Dashboard
                </Link>
                <Link role="button" onClick={this.clickLink("Customer")} to="/customer/list"
                  className={"navMenu " + (navMenu == "Customer" ? "navMenu-active" : "")}>
                  Customer
                </Link>
                <Link role="button" onClick={this.clickLink("Worker")} to="/worker/list"
                  className={"navMenu " + (navMenu == "Worker" ? "navMenu-active" : "")}>Workers</Link>
                <Link role="button" onClick={this.clickLink("Category")} to="/category/list"
                  className={"navMenu " + (navMenu == "Category" ? "navMenu-active" : "")}>Category</Link>
                <Link role="button" onClick={this.clickLink("Product")} to="/product/list"
                  className={"navMenu " + (navMenu == "Product" ? "navMenu-active" : "")}>Products</Link>
                <Link role="button" onClick={this.clickLink("Task")} to="/task/list"
                  className={"navMenu " + (navMenu == "Task" ? "navMenu-active" : "")}>Tasks</Link>
                <Link role="button" onClick={this.clickLink("Customer")} to="#/"
                  className={"navMenu " + (navMenu == "Order" ? "navMenu-active" : "")}>Orders</Link>
              </li> */}

              <li className="nav-item mx-3 mt-3">
                {(this.state.permissions.includes('dashboard')) ? <Link role="button" id="Dashboard" onClick={(e) => this.clickLink(e)} to="/dashboard"
                  className={"navMenu " + (navMenu == "Dashboard" ? "navMenu-active" : "")}>
                  Dashboard
                </Link> : ""}
                {(this.state.permissions.includes('website')) ? <Link role="button" id="Website" onClick={(e) => this.clickLink(e)} to="/website"
                  className={"navMenu " + (navMenu == "Website" ? "navMenu-active" : "")}>
                  Website
                </Link> : ""}
                {(this.state.permissions.includes('customer')) ? <Link role="button" id="Customer" onClick={(e) => this.clickLink(e)} to="/customer/list"
                  className={"navMenu " + (navMenu == "Customer" ? "navMenu-active" : "")}>
                  Customer
                </Link> : ""}
                {(this.state.permissions.includes('worker')) ? <Link role="button" id="Worker" onClick={(e) => this.clickLink(e)} to="/worker/list"
                  className={"navMenu " + (navMenu == "Worker" ? "navMenu-active" : "")}>
                  Workers</Link> : ""}
                {(this.state.permissions.includes('category')) ? <Link role="button" id="Category" onClick={(e) => this.clickLink(e)} to="/category/list"
                  className={"navMenu " + (navMenu == "Category" ? "navMenu-active" : "")}>
                  Category</Link> : ""}
                {(this.state.permissions.includes('product')) ? <Link role="button" id="Product" onClick={(e) => this.clickLink(e)} to="/product/list"
                  className={"navMenu " + (navMenu == "Product" ? "navMenu-active" : "")}>
                  Products</Link> : ""}
                {(this.state.permissions.includes('task')) ? <Link role="button" id="Task" onClick={(e) => this.clickLink(e)} to="/task/list"
                  className={"navMenu " + (navMenu == "Task" ? "navMenu-active" : "")}>
                  Tasks</Link> : ""}
                {(this.state.permissions.includes('order')) ? <Link role="button" id="Order" onClick={(e) => this.clickLink(e)} to="#/"
                  className={"navMenu " + (navMenu == "Order" ? "navMenu-active" : "")}>
                  Orders</Link> : ""}
                {(this.state.permissions.includes('admin')) ? <Link role="button" id="Admin" onClick={(e) => this.clickLink(e)} to="/admin/list"
                  className={"navMenu " + (navMenu == "Admin" ? "navMenu-active" : "")}>
                  Admin</Link> : ""}
              </li>
            </ul>

            {/* <div className='mb-auto me-1 mt-1'>
            </div> */}

            <div className='logo-div'>

              {/* <div className="dropdown"
              // onBlur={() => { this.handleIsProfileDropdown(!this.state.isProfileDropdown) }}
              > */}
              {/* Bell notification */}
              <a href="#/"><i className="fa-solid fa-bell pt-2 fs-3 jewell-color"></i></a>

              {/* Logo  */}
              {/* <a className="profile-div" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                  onBlur={(e) => {
                    if (e.target.className === "profile-div") {
                      //console.log('unfocused self');
                      this.handleIsProfileDropdown(!this.state.isProfileDropdown)
                    }
                  }}
                > */}




              <Link role="button" id="profile" onClick={(e) => this.clickLink(e)} to="/profile"
                className='profile-div text-decoration-none text-center'>
                {/* <a href="#/"><i className="fa-solid fa-power-off ps-2 pe-2 fs-3 grey"></i></a> */}
                <img className="profile-logo" alt={profileLogo} src={profileLogo}
                // onClick={() => { this.handleIsProfileDropdown(!this.state.isProfileDropdown) }}
                ></img><br></br>
                <div className='brown fw-normal fs-6 text-center'>Hi, {this.state.userInfo.username}</div>

              </Link>


              <a href="" className='float-end'
                onClick={() => { this.props.logout() }}>
                <i className="fa-solid fa-power-off grey pt-2 fs-5"></i>
              </a>




              {/* Dropdown */}
              {/* <ul className={`${this.state.isProfileDropdown ? 'show' : ''} dropdown-menu mt-5 float-end py-0 px-0 border-0 min-vw-0 w-auto`}>
                  <li className='ps-40'>
                    <Link className="dropdown-item btn jewell-bg-color brown float-start my-1 w-auto" to="/profile"
                      onClick={() => { this.handleIsProfileDropdown(false) }}>
                      <i className="fa-solid me-1 fa-user grey"></i>
                      Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider"></hr></li>
                  {(this.state.userInfo) ?
                    <li className='ps-40'>
                      <a className="dropdown-item btn jewell-bg-color brown float-start mb-1 w-auto" href="#/"
                        onClick={() => { this.props.logout() }}>
                        <i className="fa-solid me-1 fa-power-off grey"></i>
                        Log out
                      </a>
                    </li> : ""}
                </ul> */}
            </div>
          </div>

        </div>
        {/* </div> */}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  logout: (payload) => dispatch(logout(payload)),
  changeNavMenu: (payload) => dispatch(changeNavMenu(payload)),
  workerTaskWorkerId: (payload) => dispatch(workerTaskWorkerId(payload)),
  categoryTaskCategoryId: (payload) => dispatch(categoryTaskCategoryId(payload)),
  categoryItemCategoryId: (payload) => dispatch(categoryItemCategoryId(payload))

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
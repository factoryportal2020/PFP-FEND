import React from 'react';
import profileLogo from "../../theme/images/profile/6.jpg";
import { useGetUserDetailsQuery } from '../../app/services/auth/authService';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeNavMenu } from '../../features/auth/authSlice';

//disptach
import { logout } from '../../features/auth/authSlice';


class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props) // user object

    this.state = { isNavCollapsed: true, isProfileDropdown: false, userInfo: props.userInfo, navMenu: "Dashboard" };
    this.handleIsNavCollapsed = this.handleIsNavCollapsed.bind(this);
    this.handleIsProfileDropdown = this.handleIsProfileDropdown.bind(this);


    // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    //   // perform a refetch every 15mins
    //   pollingInterval: 900000,
    // })

    // console.log(data) // user object


  }

  componentDidMount() {

  }


  handleIsNavCollapsed() {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  handleIsProfileDropdown(value) {
    console.log("value");
    console.log(value);
    this.setState({ isProfileDropdown: value });
  }


  // componentWillUnmount(){
  //   this.setState({ isProfileDropdown: false });
  // }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <div className="corner-background"> */}
          <a className="navbar-brand brown fw-normal" href="#/">Jewell<br />Pocket Factory<br />Poche</a>
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

              <li className="nav-item mx-3 mt-3">
                <Link role="button" to="/dashboard" className="navMenu">
                  Dashboard
                </Link>
                <Link role="button" to="/customer/list" className="navMenu">
                  Customer
                </Link>
                <Link role="button" to="/worker/list" className="navMenu">Workers</Link>
                <Link role="button" to="/category/list" className="navMenu">Category</Link>
                <Link role="button" to="/product/list" className="navMenu">Products</Link>
                <Link role="button" to="/task/list" className="navMenu">Tasks</Link>
                <Link role="button" to="#/" className="navMenu">Orders</Link>
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
                    console.log(e.target.className);
                    console.log(e.target.className);
                    if (e.target.className === "profile-div") {
                      //console.log('unfocused self');
                      this.handleIsProfileDropdown(!this.state.isProfileDropdown)
                    }
                  }}
                > */}




              <Link to="/profile" className='profile-div text-decoration-none'>
                {/* <a href="#/"><i className="fa-solid fa-power-off ps-2 pe-2 fs-3 grey"></i></a> */}
                <img className="profile-logo" alt={profileLogo} src={profileLogo}
                  onClick={() => { this.handleIsProfileDropdown(!this.state.isProfileDropdown) }}
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


const mapDispatchToProps = dispatch => ({
  logout: (payload) => dispatch(logout(payload))
});

export default connect("", mapDispatchToProps)(Header);
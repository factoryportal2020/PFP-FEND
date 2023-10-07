import React from 'react';
import profileLogo from "../../theme/images/profile/6.jpg";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isNavCollapsed: true, isProfileDropdown: false };
    this.handleIsNavCollapsed = this.handleIsNavCollapsed.bind(this);
    this.handleIsProfileDropdown = this.handleIsProfileDropdown.bind(this);
  }

  handleIsNavCollapsed() {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  handleIsProfileDropdown(value) {
    console.log(value);
    this.setState({ isProfileDropdown: value });
  }


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

              <li className="nav-item mx-3">
                <a role="button" href="#/" className="btn btn-light jewell-bg-color bg-color1 border-radius-25 mx-1">Customer</a>
                <a role="button" href="#/" className="btn btn-light jewell-bg-color brown border-radius-25 mx-1">Category</a>
                <a role="button" href="#/" className="btn btn-light jewell-bg-color brown border-radius-25 mx-1">Workers</a>
                <a role="button" href="#/" className="btn btn-light jewell-bg-color brown border-radius-25 mx-1">Orders</a>
                <a role="button" href="#/" className="btn btn-light jewell-bg-color brown border-radius-25 mx-1">Assigns</a>
                <a role="button" href="#/" className="btn btn-light jewell-bg-color brown border-radius-25 mx-1">Items</a>
              </li>
            </ul>

            {/* <div className='mb-auto me-1 mt-1'>
            </div> */}

            <div className='px-1 float-end'>

              <div className="dropdown">
                <a href="#/"><i className="fa-solid fa-bell pt-2 fs-3 jewell-color"></i></a>
                <a className="profile-div" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                  onBlur={() => { this.handleIsProfileDropdown(this.state.isProfileDropdown) }}>
                  {/* <a href="#/"><i className="fa-solid fa-power-off ps-2 pe-2 fs-3 grey"></i></a> */}
                  <img className="profile-logo float-end" alt={profileLogo} src={profileLogo}
                    onClick={() => { this.handleIsProfileDropdown(!this.state.isProfileDropdown) }}
                    onFocus={() => { this.handleIsProfileDropdown(!this.state.isProfileDropdown) }}
                  ></img>
                  <br></br>
                </a>
                <ul className={`${this.state.isProfileDropdown ? 'show' : ''} dropdown-menu mt-5 float-end py-0 px-0 border-0 min-vw-0`}>
                  <li className='ps-40'>
                    <a className="dropdown-item btn bg-color1 brown float-end my-1" href="#/">
                      <i className="fa-solid me-1 fa-user grey"></i>
                      Profile
                    </a>
                  </li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li className='ps-40'>
                    <a className="dropdown-item btn jewell-bg-color brown float-end mb-1" href="#/">
                      <i className="fa-solid me-1 fa-power-off grey"></i>
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
              <div className='brown fw-normal fs-6 float-end'>Hi, Johnny Depth</div>
            </div>

          </div>
        </div>
      </nav>
    )
  }
}


export default Header;
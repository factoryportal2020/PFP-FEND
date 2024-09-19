import React from 'react';
import profileLogo from "../../theme/images/profile/6.jpg";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from '../forms/validate';
import { workerTaskWorkerId, categoryTaskCategoryId, categoryItemCategoryId } from '../../features/auth/viewSlice';
import dashboardService from '../../services/dashboard.service';
import pocketMob from "../../theme/images/jewell/pocket-mob.png";

//disptach
import { logout, changeNavMenu } from '../../features/auth/authSlice';


class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.userInfo);
    let userProfileImg = (props.userInfo?.profile_image.length) ? props.userInfo.profile_image[0].url : profileLogo;
    let userProfileName = (props.userInfo?.profile_image.length) ? props.userInfo.profile_image[0].name : "profileImg";
    this.state = {
      isNavCollapsed: true, isProfileDropdown: false,
      userInfo: props.userInfo,
      userProfileImg: userProfileImg,
      userProfileName: userProfileName,
      navMenu: { ...props.auth.navMenu },
      permissions: [...props.auth.permissions],
      dropMenuOpen: false,
      notificationOpen: false,
      notificationCount: 0,
      notifications: [
        {
          encrypt_id: "",
          link: "",
          message: "",
          created_at: ""
        },
      ],
    };
    this.handleIsNavCollapsed = this.handleIsNavCollapsed.bind(this);
    this.handleIsProfileDropdown = this.handleIsProfileDropdown.bind(this);
    this.clickLink = this.clickLink.bind(this);
    this.clickProfileLink = this.clickProfileLink.bind(this);
  }

  componentDidMount() {
    let urlMenuName = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : "Dashboard";
    urlMenuName = validator.toCapitalize(urlMenuName);
    console.log(this.state.permissions);
    this.setState({ navMenu: urlMenuName })
    this.getNotification();
    setInterval(() => { console.log('get notification'); this.getNotification(); }, 180000);

  }


  getNotification() {
    dashboardService.getNotification({ limit: 5 })
      .then(async (response) => {
        let responseData = response.data;
        console.log(responseData);
        if (responseData.status) {
          let notificationData = responseData.data;

          if (notificationData.notifications.length > 0) {
            let stateObj = { ...this.state };
            stateObj.notifications = [...notificationData.notifications];
            stateObj.notificationCount = notificationData.notifications_count;
            this.setState({ ...stateObj }, () => { console.log(stateObj) });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
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
    this.handleIsNavCollapsed();
  }

  clickProfileLink(e) {
    let menuName = e.target.id;
    console.log(menuName)
    this.setState({ navMenu: menuName })
    this.props.changeNavMenu(menuName)
    this.props.workerTaskWorkerId("")
    this.props.categoryTaskCategoryId("")
    this.props.categoryItemCategoryId("")
  }

  clickDropDown(trigger) {
    this.setState({ dropMenuOpen: trigger })
  }

  clickNotification(trigger) {
    this.setState({ notificationOpen: trigger })
  }

  render() {
    const navMenu = this.state.navMenu;
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className='small-corner-logo'>
            <Link className="" to="/"> <img src={pocketMob} /></Link>
          </div>



          <div className='logo-div ms-auto me-auto logo-div-web' onMouseLeave={(e) => this.clickNotification(false)}>
            <Link role="button" id="profile" onClick={(e) => this.clickProfileLink(e)} to="/profile"
              className='profile-div text-decoration-none text-center'>
              <img className="profile-logo" alt={this.state.userProfileName} src={this.state.userProfileImg}
              ></img><br></br>
              <div className='theme-yellow fw-normal fs-6 text-center' alt={this.state.userInfo.username}>Hi, {this.state.userInfo.username.substring(0, 10)}</div>
            </Link>
          </div>


          <div className='bell-div logo-div-web'>
            <ul>
              <li>
                <Link to={"/login"} className=''
                  onClick={() => { this.props.logout() }}>
                  <i className="fa-solid fa-power-off grey pt-2 fs-5"></i>
                </Link>
              </li>
              <li>
                <div className='pointer d-inline-block'
                  onClick={(e) => this.clickNotification(!this.state.notificationOpen)}
                  onMouseLeave={(e) => this.clickNotification(false)}
                >
                  <i className="fa-solid fa-bell pt-2 fs-3 theme-yellow badge-wrapper">
                    <span class='badge badge-secondary theme-red'>{this.state.notificationCount}</span>
                  </i>
                </div>
                <ul
                  onBlur={(e) => this.clickNotification(false)}
                  className={`dropdown-menu me-auto mb-auto bell-dropdown mt-2 ${(this.state.notificationOpen) ? "show" : "hide"}`}>
                  {
                    (this.state.notificationCount == 0) ?
                      <li className='fs-14 text-center pt-3 theme-red'>No Records Found</li> :
                      this.state.notifications.map((element, i) => {
                        return (
                          (element.message) ?
                            <li className=' theme-red'><Link to={element.link} onClick={(e) => this.clickNotification(false)}>{element.message}</Link></li> : ""
                        )
                      })
                  }
                  <li className='fs-14 text-center pt-3 black'><Link to="/notification/list">See More</Link></li>
                </ul>
              </li>
            </ul>
          </div>

          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.handleIsNavCollapsed}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${this.state.isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
            onMouseLeave={(e) => this.clickNotification(false)}
            onBlur={(e) => this.handleIsNavCollapsed}>

            <ul className="navbar-nav menu-navbar-nav me-auto mb-auto animated fadeInRight">
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

              <li className="nav-item ms-3 mt-3">
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
                {/* {(this.state.permissions.includes('enquiry')) ? <Link role="button" id="Enquiry" onClick={(e) => this.clickLink(e)} to="/enquiry/list"
                  className={"navMenu " + (navMenu == "Enquiry" ? "navMenu-active" : "")}>
                  Enquiries</Link> : ""} */}
                {(this.state.permissions.includes('admin')) ?
                  <Link role="button" id="Admin" onClick={(e) => this.clickLink(e)} to="/admin/list"
                    className={"navMenu " + (navMenu == "Admin" ? "navMenu-active" : "")}>
                    Admin</Link> : ""}



              </li>
              {(this.state.permissions.includes('enquiry')) ?
                <li className=" nav-item dropdown mt-3" onMouseLeave={(e) => this.clickDropDown(false)} >
                  <a
                    className={"navMenu dropdown-toggle notextDecor brown " + ((navMenu == "Enquiry" ||
                      navMenu == "Favourite" || navMenu == "Subscribe" || navMenu == "Message") ? "navMenu-active" : "")}
                    onClick={(e) => this.clickDropDown(!this.state.dropMenuOpen)} role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Enquiries
                  </a>
                  <ul className={`dropdown-menu mt-2 ${(this.state.dropMenuOpen) ? "show" : "hide"}`}>
                    {(this.state.permissions.includes('enquiry')) ?
                      <li><Link id="Enquiry"
                        className={"navMenu-dropdown dropdown-item " + (navMenu == "Enquiry" ? "navMenu-dropdown-active" : "")}
                        to="/enquiry/list" onClick={(e) => { this.clickLink(e); this.clickDropDown(!this.state.dropMenuOpen); }}>Enquiry</Link></li> : ""}
                    {(this.state.permissions.includes('enquiry')) ?
                      <li><Link id="Favourite"
                        className={"navMenu-dropdown dropdown-item " + (navMenu == "Favourite" ? "navMenu-dropdown-active" : "")}
                        to="/favourite/list" onClick={(e) => { this.clickLink(e); this.clickDropDown(!this.state.dropMenuOpen); }}>Favourite</Link></li> : ""}
                    {(this.state.permissions.includes('subscribe')) ? <li><Link id="Subscribe"
                      className={"navMenu-dropdown dropdown-item " + (navMenu == "Subscribe" ? "navMenu-dropdown-active" : "")}
                      to="/subscribe/list" onClick={(e) => { this.clickLink(e); this.clickDropDown(!this.state.dropMenuOpen); }}>Subscribe</Link></li> : ""}
                    {(this.state.permissions.includes('message')) ? <li><Link id="Message"
                      className={"navMenu-dropdown dropdown-item " + (navMenu == "Message" ? "navMenu-dropdown-active" : "")}
                      to="/message/list" onClick={(e) => { this.clickLink(e); this.clickDropDown(!this.state.dropMenuOpen); }}>Message</Link></li> : ""}
                  </ul>
                </li> : ""}
            </ul>

            <div className='bell-div mb-auto text-end logo-div-mob'
            >
              <div className='pointer d-inline-block' onClick={(e) => this.clickNotification(!this.state.notificationOpen)}>
                <i className="fa-solid fa-bell pt-2 fs-3 theme-yellow badge-wrapper">
                  <span class='badge badge-secondary theme-red'>{this.state.notificationCount}</span>
                </i>
              </div>
              <ul
                className={`dropdown-menu me-auto mb-auto bell-dropdown mt-2 ${(this.state.notificationOpen) ? "show" : "hide"}`}>
                {
                  (this.state.notificationCount == 0) ?

                    <li className='fs-14 text-center pt-3 black'>No Records Found</li> :

                    this.state.notifications.map((element, i) => {
                      return (
                        (element.message) ?
                          <li><Link to={element.link} onClick={(e) => this.clickNotification(false)}>{element.message}</Link></li> : ""
                      )
                    })
                }

                <li className='fs-14 text-center pt-3 black'><Link to="/notification/list">See More</Link></li>
              </ul>
            </div>

            <div className='logo-div logo-div-mob' onMouseLeave={(e) => this.clickNotification(false)}>

              {/* <div className="dropdown"
              // onBlur={() => { this.handleIsProfileDropdown(!this.state.isProfileDropdown) }}
              > */}
              {/* Bell notification */}


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
                <div className='theme-yellow fw-normal fs-6 text-center'>Hi, {this.state.userInfo.username}</div>

              </Link>


              <Link to={"/login"} className='float-end'
                onClick={() => { this.props.logout() }}>
                <i className="fa-solid fa-power-off grey pt-2 fs-5"></i>
              </Link>




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
      </nav >
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
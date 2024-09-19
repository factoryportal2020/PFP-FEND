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


class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    let userProfileImg = (props.userInfo?.profile_image?.length) ? props.userInfo.profile_image[0].url : profileLogo;
    let userProfileName = (props.userInfo?.profile_image?.length) ? props.userInfo.profile_image[0].name : "profileImg";
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
    this.clickProfileLink = this.clickProfileLink.bind(this);
  }

  componentDidMount() {
    let urlMenuName = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : "Dashboard";
    urlMenuName = validator.toCapitalize(urlMenuName);
    this.setState({ navMenu: urlMenuName })
    this.getNotification();
    setInterval(() => { console.log('get notification'); this.getNotification(); }, 180000);
  }

  formProfileImage(userInfo) {
    let userProfileImg = (userInfo?.profile_image?.length) ? userInfo.profile_image[0].url : profileLogo;
    let userProfileName = (userInfo?.profile_image?.length) ? userInfo.profile_image[0].name : "profileImg";
    this.setState({ userProfileImg: userProfileImg, userProfileName: userProfileName })
  }

  getNotification() {
    dashboardService.getNotification({ limit: 5 })
      .then(async (response) => {
        let responseData = response.data;
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
    this.setState({
      navMenu: nextProps.auth.navMenu, permissions: nextProps.auth.permissions,
    });
    if (nextProps.auth.userInfo != this.state.userInfo) {
      this.formProfileImage(nextProps.auth.userInfo)
    }
  }

  handleIsNavCollapsed() {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  handleIsProfileDropdown(value) {
    this.setState({ isProfileDropdown: value });
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
      <div className='footer'>
        <nav className="footer-navbar navbar-expand-lg bg-body-tertiary logo-div-web">
          <div className='bell-div'>
            <div className='pointer d-inline-block'
              onClick={(e) => this.clickNotification(!this.state.notificationOpen)}
              onMouseLeave={(e) => this.clickNotification(false)}
            >
              <i className="fa-solid fa-bell fs-3 theme-brown badge-wrapper">
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
          </div>

         

          <div className='logout-part'>
            <Link to={"/login"} className='float-end'
              onClick={() => { this.props.logout() }}>
              <i className="fa-solid fa-power-off grey fs-5"></i>
            </Link>
          </div>
        </nav >
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent);
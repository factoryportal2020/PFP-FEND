// import { useDispatch, useSelector } from 'react-redux'
// import { useGetUserDetailsQuery } from '../../app/services/auth/authService.js';
// import HeaderComponent from './HeaderComponent.js';
// import { setCredentials } from '../../features/auth/authSlice';
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../app/services/auth/authService";
import { setCredentials } from "../../features/auth/websiteSlice";

import cusDefaultLogo from "../../../jewell/theme/images/profile/6.jpg";
import SearchModal from "./modals/SearchModal";
import CartModal from "./modals/CartModal";

import { logout } from "../../features/auth/websiteSlice";
import { changeNavMenu } from "../../features/auth/websiteSlice";
import SlideToggle from "react-slide-toggle";


import apiDataService from "../../services/api.service";
import validator from "../../../jewell/components/forms/validate";

const Header = () => {
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const { navMenu } = useSelector((state) => state.websiteAuth)
    const [curNavMenu, setCurNavMenu] = useState(navMenu)

    const [width, height] = useWindowSize();

    const [btnShowMenuMobile, setBtnShowMenuMobile] = useState("");
    const [menuMobileToggleEvent, setMenuMobileToggleEvent] = useState(0);
    const [menuMobileBlock, setMenuMobileBlock] = useState('dis-none');
    const [clickSearchKey, setClickSearchKey] = useState('');


    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    if (width >= 992) {
        if (menuMobileToggleEvent != 0) {
            setMenuMobileToggleEvent(0)
            setMenuMobileBlock("dis-none")
            if (btnShowMenuMobile == "") {
                setBtnShowMenuMobile("is-active")
            }
            else {
                setBtnShowMenuMobile("")
            }
        }
    }

    function clickBtnShowMenuMobile() {
        if (btnShowMenuMobile == "") {
            setBtnShowMenuMobile("is-active")
        }
        else {
            setBtnShowMenuMobile("")
            // setMenuMobileToggleEvent(0)
            // setMenuMobileBlock("dis-none")
        }
        setMenuMobileBlock("dis-block")
    }

    function onToggle() {
        setMenuMobileToggleEvent(Date.now())
    };


    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.websiteAuth)
    const [curUserInfo, setCurUserInfo] = useState(userInfo)

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000,
    })


    useEffect(() => {
        let urlMenuName = (window.location.pathname.split('/')[2]) ? window.location.pathname.split('/')[2] : "Home";
        urlMenuName = validator.toCapitalize(urlMenuName);
        console.log(urlMenuName);
        setCurNavMenu(urlMenuName);
    }, [])

    function clickLink(e) {
        let menuName = e.target.id;
        console.log(menuName)
        setCurNavMenu(menuName)
        changeNavMenu(menuName)
    }

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo);
            setCurUserInfo(userInfo)
        }
    }, [userInfo])


    useEffect(() => {
        if (data) {
            console.log(data.data);
            dispatch(setCredentials(data.data))
        }
    }, [data, dispatch])


    const [cusLogoImage, setCusLogoImage] = useState("");
    const [website, setWebsite] = useState("");

    function logOut() {
        dispatch(logout())
    }

    useEffect(() => {
        getLogo();
        // setCurAdminInfo(adminInfo);
        // setCurUserInfo(userInfo);
        // setCurUsertoken(userToken);
        // }, [adminInfo, userToken, userInfo]);
    }, []);

    function getLogo() {
        apiDataService.getLogo()
            .then(async (response) => {
                console.log(response);
                let responseData = response.data.data;
                let website = responseData.website
                let ResponseLogo = responseData.logo_image.logo_image
                console.log(website);
                setWebsite(website);
                if (ResponseLogo.length > 0 && ResponseLogo[0]) {
                    console.log(ResponseLogo);
                    setCusLogoImage(ResponseLogo[0].url);
                } else {
                    setCusLogoImage(cusDefaultLogo);
                }
            })
            .catch(e => {
                setCusLogoImage(cusDefaultLogo);
                console.log(e);
            });
    }

    const [searchModalTrigger, setSearchModalTrigger] = useState(false);
    const [cartModalTrigger, setCartModalTrigger] = useState(false);

    const [fixMenuDesktop, setFixMenuDesktop] = useState("");
    const [wrapMenuCSS, setWrapMenuCSS] = useState(0);
    const [wrapMenuColorCSS, setWrapMenuColorCSS] = useState('transparent');


    useEffect(() => {
        if (adminInfo) {
            let posWrapHeader = 0;

            if (document.querySelectorAll('.top-bar').length > 0) {
                console.log(document.getElementsByClassName('top-bar')[0].offsetHeight);
                posWrapHeader = document.getElementsByClassName('top-bar')[0].offsetHeight;
            }
            // console.log("posWrapHeader: " + posWrapHeader)

            const onScroll = () => settingMenuDesktop(posWrapHeader);

            // clean up code
            window.removeEventListener('scroll', onScroll);
            window.addEventListener('scroll', onScroll, { passive: true });
            // return () => window.removeEventListener('scroll', onScroll);
            if (window.scrollY > posWrapHeader) {
                setFixMenuDesktop('fix-menu-desktop');
                setWrapMenuCSS(0)
                setWrapMenuColorCSS('#fff')
            }
            else {
                // console.log(posWrapHeader);
                // console.log(window.scrollY);
                // console.log(posWrapHeader - window.scrollY);
                setFixMenuDesktop('');
                setWrapMenuCSS(parseInt(posWrapHeader) - parseInt(window.scrollY))
                setWrapMenuColorCSS('transparent')
            }
        }
    }, [adminInfo]);

    // console.log(offset);
    function settingMenuDesktop(posWrapHeader) {
        // const wrapMenuCSS = { top: 0 };
        // console.log(window.scrollY);
        if (window.scrollY > posWrapHeader) {
            setFixMenuDesktop('fix-menu-desktop');
            setWrapMenuCSS(0)
            setWrapMenuColorCSS('#fff')
        }
        else {
            setFixMenuDesktop('');
            setWrapMenuCSS(posWrapHeader - window.scrollY)
            setWrapMenuColorCSS('transparent')
        }
    }

    const navigate = useNavigate();


    function sendSearchKey(search_word) {
        setSearchModalTrigger(false)
        navigate(`/${adminInfo.site_url}/shop/search/${search_word}`);
    }

    return (
        // (userInfo) ? <HeaderComponent userInfo={userInfo} /> : ""

        <>
            {(adminInfo && adminToken) ?
                <>
                    <header class="">
                        <div className={`container-menu-desktop ${fixMenuDesktop}`}>
                            <div className="top-bar">
                                <div className="content-topbar flex-sb-m h-full container">
                                    <div className="left-top-bar">
                                        {/* Free shipping for standard order over $100 */}
                                    </div>

                                    <div className="right-top-bar flex-w h-full">
                                        {(adminInfo) ?

                                            (!userInfo) ?

                                                <>
                                                    <Link onClick={(e) => clickLink(e)} id="Login" to={`/${adminInfo.site_url}/login`} className="flex-c-m trans-04 p-lr-25">
                                                        Login
                                                    </Link>

                                                    <Link onClick={(e) => clickLink(e)} id="Register" to={`/${adminInfo.site_url}/register`} className="flex-c-m trans-04 p-lr-25">
                                                        Sign Up
                                                    </Link>
                                                </> :
                                                <>
                                                    <Link onClick={(e) => clickLink(e)} id="Profile" to={`/${adminInfo.site_url}/profile`} className="flex-c-m trans-04 p-lr-25">
                                                        My Account
                                                    </Link>
                                                    {(userInfo.username) ?
                                                        <>
                                                            <span className="flex-c-m trans-04 p-lr-25">Hi,&nbsp;<span className="fs-6">{userInfo.username}</span></span>

                                                            <Link className='float-end'
                                                                onClick={logOut}>
                                                                <i className="fa-solid fa-power-off grey pt-2 fs-6"></i>
                                                            </Link>
                                                        </>

                                                        : ""}
                                                </>
                                            : ""}

                                        {/* <a href="/" className="flex-c-m trans-04 p-lr-25">
                                    EN
                                </a>

                                <a href="/" className="flex-c-m trans-04 p-lr-25">
                                    USD
                                </a> */}
                                    </div>
                                </div>
                            </div>

                            <div className={`wrap-menu-desktop`} style={{ top: wrapMenuCSS, backgroundColor: wrapMenuColorCSS }}>
                                <nav className="limiter-menu-desktop container">
                                    <Link to={`${adminInfo.site_url}/home`} className="logo">
                                        <img src={cusLogoImage} alt="IMG-LOGO" />
                                        {(website) ? <span className="company_name">{website.company_name}</span> : ""}
                                    </Link>

                                    <div className="menu-desktop">
                                        <ul className="main-menu">
                                            <li className={(curNavMenu == "Home" ? "active-menu" : "")}>
                                                <Link role="button" onClick={(e) => clickLink(e)} id="Home" to={`${adminInfo.site_url}/home`}>Home</Link>
                                            </li>

                                            <li className={(curNavMenu == "About" ? "active-menu" : "")}>
                                                <Link role="button" onClick={(e) => clickLink(e)} id="About" to={`${adminInfo.site_url}/about`}>About</Link>
                                            </li>

                                            <li className={(curNavMenu == "Category" ? "active-menu" : "")}>
                                                <Link role="button" onClick={(e) => clickLink(e)} id="Category" to={`${adminInfo.site_url}/category`}>Category</Link>
                                            </li>

                                            <li className={(curNavMenu == "Shop" ? "active-menu" : "")}>
                                                <Link role="button" onClick={(e) => clickLink(e)} id="Shop" to={`${adminInfo.site_url}/shop`}>Shop</Link>
                                            </li>

                                            <li className={(curNavMenu == "Contact" ? "active-menu" : "")}>
                                                <Link role="button" onClick={(e) => clickLink(e)} id="Contact" to={`${adminInfo.site_url}/contact`}>Contact</Link>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="wrap-icon-header flex-w flex-r-m">
                                        <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search"
                                            onClick={() => setSearchModalTrigger(true)}>
                                            <i className="zmdi zmdi-search"></i>
                                        </div>

                                        <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart " data-notify={curUserInfo?.enquiry_count}
                                            onClick={() => setCartModalTrigger(true)}
                                        >
                                            <i className="zmdi zmdi-shopping-cart tooltip100" data-tooltip="Enquiries"></i>
                                        </div>

                                        <Link to={`${adminInfo.site_url}/favourite`} 
                                        className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" 
                                        data-notify={curUserInfo?.favourite_count}
                                        >
                                            <i className="zmdi zmdi-favorite-outline tooltip100" data-tooltip="Favourites"></i>
                                        </Link>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <div className="wrap-header-mobile">
                            <div className="logo-mobile">
                                <Link to={`${adminInfo.site_url}/home`} className="logo">
                                    <img src={cusLogoImage} alt="IMG-LOGO" />
                                    {(website) ? <span className="company_name m-l-25 m-t-10">{website.company_name}</span> : ""}
                                </Link>
                            </div>

                            <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                                <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search"
                                    onClick={() => setSearchModalTrigger(true)}>
                                    <i className="zmdi zmdi-search"></i>
                                </div>

                                <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify={curUserInfo?.enquiry_count}
                                    onClick={() => setCartModalTrigger(true)}
                                >
                                    <i className="zmdi zmdi-shopping-cart tooltip100" data-tooltip="Enquiries"></i>
                                </div>

                                <Link to={`${adminInfo.site_url}/favourite`}
                                    className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
                                    data-notify={curUserInfo?.favourite_count}
                                >
                                    <i className="zmdi zmdi-favorite-outline tooltip100" data-tooltip="Favourites"></i>
                                </Link>
                            </div>

                            <div className={`btn-show-menu-mobile hamburger hamburger--squeeze ${btnShowMenuMobile}`} onClick={() => { clickBtnShowMenuMobile(); onToggle(); }}>
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </div>
                        </div>

                        <SlideToggle toggleEvent={menuMobileToggleEvent} noDisplayStyle collapsed>
                            {({ setCollapsibleElement }) => (
                                <div className={`menu-mobile ${menuMobileBlock}`} ref={setCollapsibleElement}>
                                    {/* <div className={`menu-mobile`} ref={setCollapsibleElement}> */}
                                    <ul className="topbar-mobile p-l-0">
                                        {/* <li>
                                            <div className="left-top-bar">
                                                Free shipping for standard order over $100
                                            </div>
                                        </li> */}

                                        <li>
                                            <div className="right-top-bar flex-w h-full justify-content-end">
                                                {(adminInfo) ?

                                                    (!userInfo) ?

                                                        <>
                                                            <Link onClick={(e) => clickLink(e)} id="Login" to={`/${adminInfo.site_url}/login`} className="flex-c-m trans-04 p-lr-25">
                                                                Login
                                                            </Link>

                                                            <Link onClick={(e) => clickLink(e)} id="Register" to={`/${adminInfo.site_url}/register`} className="flex-c-m trans-04 p-lr-25">
                                                                Sign Up
                                                            </Link>
                                                        </> :
                                                        <>
                                                            <Link onClick={(e) => clickLink(e)} id="Profile" to={`/${adminInfo.site_url}/profile`} className="flex-c-m trans-04 p-lr-25">
                                                                My Account
                                                            </Link>
                                                            {(userInfo.username) ?
                                                                <>
                                                                    <span className="flex-c-m trans-04 p-lr-25">Hi,&nbsp;<span className="fs-6">{userInfo.username}</span></span>

                                                                    <Link className='float-end'
                                                                        onClick={logOut}>
                                                                        <i className="fa-solid fa-power-off grey pt-3 fs-6"></i>
                                                                    </Link>
                                                                </>

                                                                : ""}
                                                        </>
                                                    : ""}
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="main-menu-m">
                                        <li className={(curNavMenu == "Home" ? "active-menu" : "")}>
                                            <Link role="button" onClick={(e) => clickLink(e)} id="Home" to={`${adminInfo.site_url}/home`}>Home</Link>
                                        </li>

                                        <li className={(curNavMenu == "About" ? "active-menu" : "")}>
                                            <Link role="button" onClick={(e) => clickLink(e)} id="About" to={`${adminInfo.site_url}/about`}>About</Link>
                                        </li>

                                        <li className={(curNavMenu == "Category" ? "active-menu" : "")}>
                                            <Link role="button" onClick={(e) => clickLink(e)} id="Category" to={`${adminInfo.site_url}/category`}>Category</Link>
                                        </li>

                                        <li className={(curNavMenu == "Shop" ? "active-menu" : "")}>
                                            <Link role="button" onClick={(e) => clickLink(e)} id="Shop" to={`${adminInfo.site_url}/shop`}>Shop</Link>
                                        </li>

                                        <li className={(curNavMenu == "Contact" ? "active-menu" : "")}>
                                            <Link role="button" onClick={(e) => clickLink(e)} id="Contact" to={`${adminInfo.site_url}/contact`}>Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </SlideToggle>


                        <SearchModal showModalTrigger={searchModalTrigger}
                            clickShowModalClose={() => setSearchModalTrigger(false)}
                            clickSearchKey={(search_word) => sendSearchKey(search_word)}
                        />

                    </header >
                </>
                : ""}

            <CartModal showModalTrigger={cartModalTrigger} pagination={true}
                clickShowModalClose={() => setCartModalTrigger(false)} />
        </>
    )
}
export default Header

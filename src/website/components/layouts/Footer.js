import React, { useRef } from 'react';

import categoryImage from "../../theme/images/jewell/no-image.jpg"
import { Link } from "react-router-dom";
import banner1 from "../../theme/images/jewell/banner1.png"


import { useEffect, useState } from "react";
import apiDataService from "../../services/api.service";
import { useSelector, useDispatch } from 'react-redux'
import FormImage from "../../../jewell/components/forms/FormImage";
import Preloader from './Preloader';
import StatusBar from './StatusBar';

const Footer = () => {
    const ref = useRef(null);

    const [categories, setCategories] = useState([]);
    const [contact, setContact] = useState([]);
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)

    const [preLoading, setPreLoading] = useState(false);

    const [states, setStates] = useState({
        title: "",
        submitted: false,
        submitDisabled: "",
        status: { show: false, type: 'success', msg: '' },
        clickedTabId: 0,
        errorsModalTrigger: "fade",
        errors: [],
        tabs: [{ id: "details", tab: "Details" }],
        params: {
            email: "",
        },
        validations: {
            hasEmailRequired: true,
            hasEmailEmail: true,
        },
        validate: false
    })


    const [status, setStatus] = useState({ show: false, type: 'success', msg: '' })

    function onStatusClose() {
        setStatus({ show: false, type: 'success', msg: '' });
    }

    const [entities, setEntities] = useState([
        {
            name: "email", type: "email",
            colClass: 'wrap-input1 w-full p-b-4', className: "input1 bg-none plh1 stext-107 cl7",
            htmlFor: "Email", value: "", label: "", placeholder: "example@gmail.com",
            validate: true,
            noFormcontrolCls: true,
            tab: "details",
            maxLength: 40,
            validateOptions: [
                {
                    rule: "required",
                    msg: "Email is Required"
                },
                {
                    rule: "email",
                    msg: "Email format is wrong",
                }]
        },]);

    useEffect(() => {
        getCategory();
        getContact();
    }, []);

    function getCategory() {
        let selectCondition = { itemPerPage: 4, limit: 4 }
        apiDataService.getCategoryList(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data.data;
                if (categoryData.length > 0) {
                    let arr = categoryData;
                    console.log(arr);
                    setCategories(arr);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getContact() {
        apiDataService.getContact()
            .then(async (response) => {
                let responseData = response.data;
                let contactData = responseData.data.contact;
                console.log(contactData);
                if (contactData) {
                    let arr = contactData;
                    console.log(arr);
                    setContact(arr);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }


    function saveDataApiCall(params) {
        setPreLoading(true);

        let callApi = apiDataService.saveSubscribe(params)
        let states1 = { ...states }
        callApi.then(response => {
            let data = response.data;
            console.log(response.data);
            if (!data.status) { // errors
                (async () => {
                    setStatus({ show: true, type: 'success', msg: 'Something went wrong' });
                    setPreLoading(false);
                    setStates(states1)

                })();
            } else { // success
                // this.setState({ successMsg: data.message })
                let msg = states1.params.email + " - " + data.message;
                setStatus({ show: true, type: 'success', msg: msg });
                setPreLoading(false);
                let sub = response.data.data.subscribed;
                // if (!sub) {
                states1.params.email = ""
                setStates(states1)
                // }
            }
        }).catch(e => {
            console.log(e);
            setStatus({ show: true, type: 'success', msg: 'Something went wrong' });
            setPreLoading(false);
            // setStates(states1)
        });
    }

    const [about, setAbout] = useState([]);
    const [banner, setBanner] = useState([{ url: banner1 }]);

    useEffect(() => {
        getAbout();
    }, []);

    function getAbout() {
        apiDataService.getAbout()
            .then(async (response) => {
                console.log(response);
                let responseData = response.data.data;
                let ResponseAbout = responseData.about
                let aboutData = [];
                if (ResponseAbout) {
                    if (ResponseAbout.about_image.length > 0) {
                        aboutData = ResponseAbout.about_image;
                    }
                    console.log(aboutData);
                    setAbout(aboutData);
                } else {
                    setAbout([]);
                }

                let ResponseBanners = responseData.banners
                let bannerData = [];
                if (ResponseBanners) {
                    if (ResponseBanners.banner_image1.length > 0) {
                        bannerData = ResponseBanners.banner_image1[0];
                    }
                    console.log(bannerData);
                    setBanner(bannerData);
                } else {
                    setBanner([{ url: banner1 }]);
                }
            })
            .catch(e => {
                setAbout([{ url: banner1 }]);
                console.log(e);
            });
    }

    return (
        <>
            {(adminInfo && adminToken) ?
                <>
                    <footer className="bg3 p-t-30 p-b-32">
                        <div className="container">
                            {preLoading ? <Preloader /> : ""}
                            <StatusBar className="m-t-3" status={status} onStatusClose={() => onStatusClose()} />

                            <div className="row">
                                <div className="col-sm-6 col-lg-3 p-b-20">
                                    <h4 className="stext-301 cl0" to={`${adminInfo.site_url}/about`}>About</h4>
                                    <ul>
                                        < li className="p-t-5">
                                            {(about.length > 0 && about[0].url && about[0].url != "" && about[0].url != null && about[0].detail) ?
                                                <div className="tiny-p stext-107 cl7 hov-cl1 trans-04" dangerouslySetInnerHTML={{ __html: about[0].detail.replace(/\n/g, '<br />').substring(0, 500) + "...." }} ></div>
                                                : ""}
                                        </li>
                                        <li className="p-b-5">
                                            <Link to={`${adminInfo.site_url}/about`}
                                                className="submit__btn">
                                                Load Our Story
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-sm-6 col-lg-3 p-b-20">
                                    <h4 className="stext-301 cl0 p-b-5">
                                        Help
                                    </h4>

                                    <ul>
                                        <li className="p-b-10">
                                            <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                                Track Your Enquiries
                                            </a>
                                        </li>

                                        <li className="p-b-10">
                                            <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                                Returns
                                            </a>
                                        </li>

                                        <li className="p-b-10">
                                            <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                                Shipping
                                            </a>
                                        </li>

                                        <li className="p-b-10">
                                            <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                                                FAQs
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-sm-6 col-lg-3 p-b-20">
                                    <h4 className="stext-301 cl0 p-b-5">
                                        GET IN TOUCH
                                    </h4>

                                    <p className="stext-107 cl7 size-201">
                                        Any questions? Let us know in store at {contact.address} or call us on {contact.phone_no}
                                    </p>

                                    <div className="p-t-5">
                                        {
                                            (contact.facebook_link) ?
                                                <a href={contact.facebook_link} className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                                    <i className="fa fa-facebook"></i>
                                                </a> : ""
                                        }

                                        {
                                            (contact.instagram_link) ?
                                                <a href={contact.instagram_link} className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                                    <i className="fa fa-instagram"></i>
                                                </a> : ""
                                        }

                                        {
                                            (contact.twitter_link) ?
                                                <a href={contact.twitter_link} className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                                    <i className="fa fa-twitter"></i>
                                                </a> : ""
                                        }
                                        <a href={contact.facebook_link} className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                        <a href={contact.instagram_link} className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                        <a href={contact.twitter_link} className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3 p-b-20">
                                    <h4 className="stext-301 cl0 p-b-5">
                                        Newsletter
                                    </h4>

                                    {/* <form>
                                        <div className="wrap-input1 w-full p-b-4">
                                            <input className="input1 bg-none plh1 stext-107 cl7"
                                                type="text" name="email" placeholder="email@example.com" />
                                            <div className="focus-input1 trans-04"></div>
                                        </div>

                                        <div className="p-t-18">
                                            <button 
                                            className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn2 p-lr-15 trans-04">
                                                Subscribe
                                            </button>
                                        </div>
                                    </form> */}

                                    < FormImage
                                        entities={entities}
                                        states={states}
                                        action="form"
                                        viewEncryptId=""
                                        saveDataApiCall={(params) => saveDataApiCall(params)}
                                        ref={ref}
                                        preLoading={preLoading}
                                        forSubscribe={true}
                                    />

                                </div>
                            </div>

                            <div className="p-t-10">
                                {/* <div className="flex-c-m flex-w p-b-18">
                            <a href="/" className="m-all-1">
                                <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
                            </a>

                            <a href="/" className="m-all-1">
                                <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
                            </a>

                            <a href="/" className="m-all-1">
                                <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
                            </a>

                            <a href="/" className="m-all-1">
                                <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
                            </a>

                            <a href="/" className="m-all-1">
                                <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
                            </a>
                        </div> */}

                                <p className="stext-107 cl1 txt-center">
                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="" className="cor-link" >Pocket E-com</a> &amp; distributed by <a href="" className="cor-link">Pocket E-com Admin</a>
                                </p>
                            </div>
                        </div>
                    </footer >


                    <div className="btn-back-to-top" id="myBtn">
                        <span className="symbol-btn-back-to-top">
                            <i className="zmdi zmdi-chevron-up"></i>
                        </span>
                    </div>

                    <div className="wrap-modal1 js-modal1 p-t-60 p-b-20">
                        <div className="overlay-modal1 js-hide-modal1"></div>

                        <div className="container">
                            <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                                <button className="how-pos3 hov3 trans-04 js-hide-modal1">
                                    <img src="images/icons/icon-close.png" alt="CLOSE" />
                                </button>

                                <div className="row">
                                    <div className="col-md-6 col-lg-7 p-b-30">
                                        <div className="p-l-25 p-r-30 p-lr-0-lg">
                                            <div className="wrap-slick3 flex-sb flex-w">
                                                <div className="wrap-slick3-dots"></div>
                                                <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                                                <div className="slick3 gallery-lb">
                                                    <div className="item-slick3" data-thumb="images/product-detail-01.jpg">
                                                        <div className="wrap-pic-w pos-relative">
                                                            <img src="images/product-detail-01.jpg" alt="IMG-PRODUCT" />

                                                            <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/product-detail-01.jpg">
                                                                <i className="fa fa-expand"></i>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="item-slick3" data-thumb="images/product-detail-02.jpg">
                                                        <div className="wrap-pic-w pos-relative">
                                                            <img src="images/product-detail-02.jpg" alt="IMG-PRODUCT" />

                                                            <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/product-detail-02.jpg">
                                                                <i className="fa fa-expand"></i>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="item-slick3" data-thumb="images/product-detail-03.jpg">
                                                        <div className="wrap-pic-w pos-relative">
                                                            <img src="images/product-detail-03.jpg" alt="IMG-PRODUCT" />

                                                            <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/product-detail-03.jpg">
                                                                <i className="fa fa-expand"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-5 p-b-30">
                                        <div className="p-r-50 p-t-5 p-lr-0-lg">
                                            <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                                Lightweight Jacket
                                            </h4>

                                            <span className="mtext-106 cl2">
                                                $58.79
                                            </span>

                                            <p className="stext-102 cl3 p-t-23">
                                                Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                                            </p>

                                            <div className="p-t-33">
                                                <div className="flex-w flex-r-m p-b-10">
                                                    <div className="size-203 flex-c-m respon6">
                                                        Size
                                                    </div>

                                                    <div className="size-204 respon6-next">
                                                        <div className="rs1-select2 bor8 bg0">
                                                            <select className="js-select2" name="time">
                                                                <option>Choose an option</option>
                                                                <option>Size S</option>
                                                                <option>Size M</option>
                                                                <option>Size L</option>
                                                                <option>Size XL</option>
                                                            </select>
                                                            <div className="dropDownSelect2"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-w flex-r-m p-b-10">
                                                    <div className="size-203 flex-c-m respon6">
                                                        Color
                                                    </div>

                                                    <div className="size-204 respon6-next">
                                                        <div className="rs1-select2 bor8 bg0">
                                                            <select className="js-select2" name="time">
                                                                <option>Choose an option</option>
                                                                <option>Red</option>
                                                                <option>Blue</option>
                                                                <option>White</option>
                                                                <option>Grey</option>
                                                            </select>
                                                            <div className="dropDownSelect2"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-w flex-r-m p-b-10">
                                                    <div className="size-204 flex-w flex-m respon6-next">
                                                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                            <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                                <i className="fs-16 zmdi zmdi-minus"></i>
                                                            </div>

                                                            <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1" />

                                                            <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                                <i className="fs-16 zmdi zmdi-plus"></i>
                                                            </div>
                                                        </div>

                                                        <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                                <div className="flex-m bor9 p-r-10 m-r-11">
                                                    <a href="/" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                                                        <i className="zmdi zmdi-favorite"></i>
                                                    </a>
                                                </div>

                                                <a href="/" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                                                    <i className="fa fa-facebook"></i>
                                                </a>

                                                <a href="/" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                                                    <i className="fa fa-twitter"></i>
                                                </a>

                                                <a href="/" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                                                    <i className="fa fa-google-plus"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                : ""}
        </>
    )
}
export default Footer
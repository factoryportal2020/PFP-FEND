// const Slide = () => {
//     return (
//         <>
//         </>
//     )
// }
// export default Slide

// images
import banner1 from "../../theme/images/jewell/banner1.png"
import banner2 from "../../theme/images/jewell/banner2.png"
import banner3 from "../../theme/images/jewell/banner3.jpg"

// Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState } from 'react';
import { useEffect } from "react";

import apiDataService from "../../services/api.service";
import { Link } from "react-router-dom";


function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className="arrow-slick1 next-slick1"
            // style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        ><i className="zmdi zmdi-caret-right"></i></button>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className="arrow-slick1 prev-slick1"
            style={{ display: "block" }}
            onClick={onClick}
        ><i className="zmdi zmdi-caret-left"></i></button>
    );
}






const Slide = () => {

    // let animates = { fadeInDown: "fadeInDown", fadeInUp: "fadeInUp" }

    const [visibleTrue, setVisibleTrue] = useState("visible-true");

    // const [categories, setCategories] = useState([]);
    const [banners, setBanners] = useState([banner1, banner2, banner3]);

    useEffect(() => {
        getBanner();
    }, []);

    const [animates, setAnimates] = useState([
        { fadeInDown: "fadeInDown", fadeInUp: "fadeInUp", zoomIn: "zoomIn" },
        { rollIn: "", lightSpeedIn: "", slideInUp: "" },
        { rotateInDownLeft: "", rotateInUpRight: "", rotateIn: "" }
    ]);

    var slideSettings = {
        pauseOnFocus: false,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 1000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        // dots: showDot,
        dotsClass: 'slick1-dots',

        beforeChange: function (index) {
            let curArray = { ...animates[index] };
            curArray.fadeInDown = "";
            curArray.fadeInUp = "";
            curArray.zoomIn = "";
            curArray.rollIn = "";
            curArray.lightSpeedIn = "";
            curArray.slideInUp = "";
            curArray.rotateInDownLeft = "";
            curArray.rotateInUpRight = "";
            curArray.rotateIn = "";
            animates[index] = curArray
            setVisibleTrue("visible-false")
            setAnimates(() => [...animates]);
        },
        afterChange: function (index) {
            let curArray = { ...animates[index] };
            if (index == 0) {
                curArray.fadeInDown = "fadeInDown";
                curArray.fadeInUp = "fadeInUp";
                curArray.zoomIn = "zoomIn";
            } else if (index == 1) {
                curArray.rollIn = "rollIn";
                curArray.lightSpeedIn = "lightSpeedIn";
                curArray.slideInUp = "slideInUp";
            } else if (index == 2) {
                curArray.rotateInDownLeft = "rotateInDownLeft";
                curArray.rotateInUpRight = "rotateInUpRight";
                curArray.rotateIn = "rotateIn";
            }
            animates[index] = curArray
            setVisibleTrue("visible-true")
            setAnimates(() => [...animates]);
        }

    };

    function getBanner() {
        apiDataService.getBanner()
            .then(async (response) => {
                console.log(response);
                let responseData = response.data.data;
                let ResponseBanners = responseData.banners
                let bannerData = [];
                if (ResponseBanners) {
                    if (ResponseBanners.banner_image1.length > 0) {
                        bannerData.push(ResponseBanners.banner_image1);
                    }
                    if (ResponseBanners.banner_image2.length > 0) {
                        bannerData.push(ResponseBanners.banner_image2);
                    }
                    if (ResponseBanners.banner_image3.length > 0) {
                        bannerData.push(ResponseBanners.banner_image3);
                    }
                    console.log(bannerData);
                    setBanners(bannerData);
                    console.log(banners);
                } else {
                    setBanners([banner1, banner2, banner3]);
                }
            })
            .catch(e => {
                setBanners([banner1, banner2, banner3]);
                console.log(e);
            });
    }
    // function getCategory(selectCondition) {
    //     apiDataService.getCategory(selectCondition)
    //         .then(async (response) => {
    //             let responseData = response.data;
    //             let categoryData = responseData.data;
    //             if (categoryData.length > 0) {
    //                 let selectArr = [{ id: '*', code: '*', name: 'All Products' }];
    //                 let arr = selectArr.concat(categoryData);
    //                 console.log(arr);
    //                 setCategories(arr);
    //             }
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    return (
        <>
            <section className="section-slide">
                <Slider {...slideSettings}>
                    {
                        (banners.length > 0) ?
                            banners.map((b, i) => {
                                let bImage = b[0].url;
                                let bTitle = b[0].title;
                                let bCaption = b[0].caption;
                                let aImage = 'fadeInDown';
                                let aTitle = 'fadeInUp';
                                let aCaption = 'zoomIn';
                                if (i == 1) {
                                    aImage = 'rollIn';
                                    aTitle = 'lightSpeedIn';
                                    aCaption = 'slideInUp';
                                } else if (i == 2) {
                                    aImage = 'rotateInDownLeft';
                                    aTitle = 'rotateInUpRight';
                                    aCaption = 'rotateIn';
                                }

                                return (
                                    <div className="wrap-slick1">
                                        <div className="slick1">
                                            <div className="item-slick1" style={{ backgroundImage: `url(${bImage})` }}>
                                                <div className="container h-full">
                                                    <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                                                        <div className={`layer-slick1 animated ${animates[i][aImage]} ${visibleTrue}`} data-appear={aImage} data-delay="0">
                                                            <span className="ltext-101 cl2 respon2">
                                                                {bTitle}
                                                            </span>
                                                        </div>

                                                        <div className={`layer-slick1 animated ${animates[i][aTitle]} ${visibleTrue}`} data-appear={aTitle} data-delay="800">
                                                            <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                                                                {bCaption}
                                                            </h2>
                                                        </div>

                                                        <div className={`layer-slick1 animated ${animates[i][aCaption]} ${visibleTrue}`} data-appear={aCaption} data-delay="1600">
                                                            <Link to="/shop" className="flex-c-m stext-101 cl5 size-101 bg2 bor1 hov-btn1 p-lr-15 trans-04 textdoc-none">
                                                                Shop Now
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            })
                            : ""
                    }

                    {/* <div className="wrap-slick1">


                        <div className="item-slick1" style={{ backgroundImage: `url(${slide02})` }}>
                            <div className="container h-full">
                                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                                    <div className={`layer-slick1 animated ${animates[1]['rollIn']} ${visibleTrue}`} data-appear="rollIn" data-delay="0">
                                        <span className="ltext-101 cl2 respon2">
                                            Men New-Season
                                        </span>
                                    </div>

                                    <div className={`layer-slick1 animated ${animates[1]['lightSpeedIn']} ${visibleTrue}`} data-appear="lightSpeedIn" data-delay="800">
                                        <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                                            Jackets & Coats
                                        </h2>
                                    </div>

                                    <div className={`layer-slick1 animated ${animates[1]['slideInUp']} ${visibleTrue}`} data-appear="slideInUp" data-delay="1600">
                                        <a href="product.html" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                                            Shop Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap-slick1">


                        <div className="item-slick1" style={{ backgroundImage: `url(${slide03})` }}>
                            <div className="container h-full">
                                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                                    <div className={`layer-slick1 animated ${animates[2]['rotateInDownLeft']} ${visibleTrue}`} data-appear="rotateInDownLeft" data-delay="0">
                                        <span className="ltext-101 cl2 respon2">
                                            Men Collection 2018
                                        </span>
                                    </div>

                                    <div className={`layer-slick1 animated ${animates[2]['rotateInUpRight']} ${visibleTrue}`} data-appear="rotateInUpRight" data-delay="800">
                                        <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                                            New arrivals
                                        </h2>
                                    </div>

                                    <div className={`layer-slick1 animated ${animates[2]['rotateIn']} ${visibleTrue}`} data-appear="rotateIn" data-delay="1600">
                                        <a href="product.html" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                                            Shop Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </Slider>
            </section >
        </>
    )
}
export default Slide
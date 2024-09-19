import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Preloader from "../../../website/components/layouts/Preloader";
import StatusBar from "../../../website/components/layouts/StatusBar";
import apiDataService from "../../services/api.service";
import Slider from "react-slick";
import noImage from "../../theme/images/jewell/no-image.jpg";
import { Link } from "react-router-dom";

import iconheart01 from "../../theme/images/icons/icon-heart-01.png";
import iconheart02 from "../../theme/images/icons/icon-heart-02.png";

import { setCredentials } from "../../features/auth/websiteSlice";

// import { MagnificPopup } from 'react-magnific-popup'
// import { LightBoxGallery, GalleryItem } from '@types/react-magnific-popup';
// import { LightBoxGallery, GalleryItem } from "@sekmet/react-magnific-popup";
// import { LightBoxGallery } from "react-magnific-popup/lib/LightBoxGallery";
// import { GalleryItem } from "react-magnific-popup";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import EnquiryModal from "./modals/EnquiryModal";
import LoginModal from "./modals/LoginModal";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className="arrow-slick3 next-slick3 slick-arrow"
            // style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        ><i className="fa fa-angle-right"></i></button>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className="arrow-slick3 prev-slick3 slick-arrow"
            // style={{ display: "block" }}
            onClick={onClick}
        ><i className="fa fa-angle-left"></i></button>
    );
}

function NextArrowRelated(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className="arrow-slick2 next-slick2"
            // style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        ><i className="fa fa-angle-right"></i></button>
    );
}

function PrevArrowRelated(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className="arrow-slick2 prev-slick2"
            // style={{ display: "block" }}
            onClick={onClick}
        ><i className="fa fa-angle-left"></i></button>
    );
}

const ProductDetail = (props) => {

    const [product, setProduct] = useState({})

    const [favourite, setFavourite] = useState(false)

    const [currentEncryptID, setCurrentEncryptID] = useState("")

    const [relatedProduct, setRelatedProduct] = useState([])

    const [tabID, setTabID] = useState("description")

    const [slidedots, setSlidedots] = useState("");

    const [productImages, setProductImages] = useState([]);

    const [photoIndex, setPhotoIndex] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const [enquiryModalTrigger, setEnquiryModalTrigger] = useState("fade");

    const [loginModalTrigger, setLoginModalTrigger] = useState("fade");

    const { userInfo } = useSelector((state) => state.websiteAuth)

    const [curUserInfo, setCurUserInfo] = useState(userInfo)

    const dispatch = useDispatch()

    let sliderRef = useRef(null);
    let sliderRef1 = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };


    // const [tabShow, setTabShow] = useState("")
    var slideSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,

        // arrows: true,
        // appendArrows: '.container .wrap-slick3-arrows',
        // prevArrow: '<button className="arrow-slick3 prev-slick3"><i className="fa fa-angle-left" aria-hidden="true"></i></button>',
        // nextArrow: '<button className="arrow-slick3 next-slick3"><i className="fa fa-angle-right" aria-hidden="true"></i></button>',
        arrows: false,
        // prevArrow: <PrevArrow />,
        // nextArrow: <NextArrow />,
        dots: false,
        // appendDots: document.querySelector('.wrap-slick3-dots'),
        // appendDots: dots => (
        //     console.log(dots)
        //     // setSlidedots(dots)
        // ),

        // dotsClass: 'slick3-dots',
        // customPaging: function (slick, index) {
        //     var portrait = (product.item_image && product.item_image.item_image.length > 0) ? product.item_image.item_image[0].url : "";
        //     return (
        //         <>
        //             <img src={portrait} />
        //             < div className="slick3-dot-overlay" ></div >
        //         </>);
        // },

    };

    const [preLoading, setPreLoading] = useState(false);

    // console.log(document.querySelector('.wrap-slick3 .wrap-slick3-arrows'));

    useEffect(() => {
        let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        console.log(encrypt_id)
        console.log(props.action)
        setCurrentEncryptID(encrypt_id)
        if ((encrypt_id != null && props.action == "form")) {
            getProduct(encrypt_id);
        }
        setCurUserInfo(userInfo);
        if (userInfo) {
            setLoginModalTrigger("fade");
        }
    }, [userInfo]);

    const [status, setStatus] = useState({ show: false, type: 'success', msg: '' })

    function onStatusClose() {
        setStatus({ show: false, type: 'success', msg: '' });
    }

    function getProduct(encrypt_id) {
        setPreLoading(true);
        let params = {}
        params.encrypt_id = encrypt_id

        params.userEncryptID = curUserInfo?.user_encrypt_id
        apiDataService.getProduct(params)
            .then(async (response) => {
                let responseData = response.data;
                let productData = responseData.data;
                console.log(productData);
                if (productData) {
                    console.log(productData);
                    setProduct(productData);
                    setFavourite(productData.favourite);
                    let item_images = [];
                    let other_images = [];
                    if (productData.item_image && productData.item_image.item_image.length > 0) {
                        item_images = productData.item_image.item_image
                    }
                    if (productData.other_image && productData.other_image.other_image.length > 0) {
                        other_images = productData.other_image.other_image
                    }
                    setProductImages(item_images.concat(other_images));
                    if (productData.related_items.length > 0) {
                        setRelatedProduct(productData.related_items);
                    }
                    setPreLoading(false);
                } else {
                    setProduct({});
                    setPreLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setProduct({});
                setPreLoading(false);
                setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
            });
    }

    function clickTabActive(e) {
        let id = e.target.id;
        setTabID(id);
    }

    function clickDot(e) {
        let id = e.target.id;
        console.log(id);
        sliderRef.slickGoTo(parseInt(id))
    }

    function clickEncryptID(e) {
        let encrypt_id = e.target.id;
        setCurrentEncryptID(encrypt_id);
        getProduct(encrypt_id);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }


    function clickLightBox(e) {
        let ind = e.currentTarget.id;
        console.log(ind)
        console.log(productImages);
        console.log(productImages[ind]);
        setPhotoIndex(ind)
        setIsOpen(true)
    }


    function saveFavourite() {
        let params = {};
        params.currentEncryptID = currentEncryptID
        params.userEncryptID = curUserInfo?.user_encrypt_id

        let callApi = apiDataService.saveFavourite(params)
        callApi.then(response => {
            let data = response.data;
            console.log(response.data);
            if (!data.status) { // errors
                (async () => {
                    setFavourite(false);
                    setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
                })();
            } else { // success
                let fav = response.data.data.favourite;
                let msg = (fav) ? "Added in Favourite list" : "Removed from Favourite list";
                setStatus({ show: true, type: 'success', msg: msg });
                setFavourite(fav);
                let userData = { ...curUserInfo };
                userData.favourite_count = (fav) ? userData.favourite_count + 1 : userData.favourite_count - 1;
                dispatch(setCredentials(userData))
            }
        }).catch(e => {
            setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
        });
    }

    var slideSettings1 = {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        appendArrows: sliderRef1,
        prevArrow: <PrevArrowRelated />,
        nextArrow: <NextArrowRelated />,
        // centerMode: true,
        // variableWidth: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };




    return (

        <>

            {/* breadcrumb */}
            <div className="container mob-p-t-80">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <a href="product.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Men
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <span className="stext-109 cl4">
                        Lightweight Jacket
                    </span>
                </div>
            </div>

            {/* Product Detail */}
            {(product.item) ?
                <section className="sec-product-detail bg0 p-t-30 p-b-30">
                    {preLoading ? <Preloader /> : ""}

                    <div className="container">
                        <StatusBar className="m-t-3" status={status} onStatusClose={() => onStatusClose()} />

                        <div className="row">
                            <div className="col-md-6 col-lg-7 p-b-30">
                                <div className="p-l-25 p-r-30 p-lr-0-lg">
                                    <div className="wrap-slick3 flex-sb flex-w">

                                        <div className="wrap-slick3-arrows flex-sb-m flex-w">
                                            <PrevArrow onClick={previous} />
                                            <NextArrow onClick={next} />
                                        </div>

                                        <Slider ref={slider => {
                                            sliderRef = slider;
                                        }}
                                            {...slideSettings} className="slick3 gallery-lb">

                                            {(productImages.length > 0) ?
                                                productImages.map((itm_img, i) => {
                                                    return (
                                                        <div className="item-slick3" key={itm_img.url + i}>
                                                            <div className="wrap-pic-w pos-relative">
                                                                <img src={itm_img.url} alt="IMG-PRODUCT" />

                                                                <a className="flex-c-m size-108 how-pos1 bor0 theme-color fs-16 cl10 textdoc-none hov-btn3 trans-04 pointer"
                                                                    id={i}
                                                                    onClick={(e) => clickLightBox(e)}>
                                                                    <i className="fa fa-expand"
                                                                    >

                                                                    </i>
                                                                </a>
                                                            </div>
                                                        </div>)
                                                }) : ""}

                                        </Slider>

                                        {isOpen && (productImages.length > 0) && (
                                            <Lightbox
                                                mainSrc={productImages[photoIndex].url}
                                                nextSrc={productImages[(photoIndex + 1) % productImages.length].url}
                                                prevSrc={productImages[(photoIndex + productImages.length - 1) % productImages.length].url}
                                                onCloseRequest={() => setIsOpen(false)}
                                                onMovePrevRequest={() =>
                                                    setPhotoIndex((photoIndex + productImages.length - 1) % productImages.length)
                                                }
                                                onMoveNextRequest={() =>
                                                    setPhotoIndex((photoIndex + 1) % productImages.length)
                                                }
                                            />
                                        )}



                                    </div>

                                    <div className="wrap-slick3-dots">
                                        <ul className="slick3-dots">

                                            {
                                                (productImages.length > 0) ?
                                                    productImages.map((itm_img1, i) => {
                                                        return (

                                                            <li onClick={(e) => clickDot(e)} role={`presentation${i}`} key={`dot12${i}`}>
                                                                <img className="dot-size" src={itm_img1.url} alt="IMG-PRODUCT" />
                                                                <div className="slick3-dot-overlay dot-size" id={i}></div>
                                                            </li>)
                                                    })
                                                    : ""}


                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-5 p-b-30">
                                <div className="p-r-50 p-t-5 p-lr-0-lg">
                                    <h4 className="mtext-105 cl5 js-name-detail p-b-0 m-b-1">
                                        {product.item.name}
                                    </h4>
                                    {(product.item) ? <p className=" fs-14 cl3 grey p-b-0 m-b-2">{product.item.category_name} / SKU : <span className=" fs-16 cl3 p-b-0">{product.item.code}</span></p> : ""}

                                    {(product.item.note) ? <p className=" fs-16 p-t-0 p-b-6">{product.item.note}</p> : ""}

                                    <span className="mtext-106 cl5">
                                        ₹ {product.item.price}
                                    </span>

                                    <p className="stext-102 cl3 p-t-23">
                                        {product.item.specification}
                                    </p>

                                    <h5>Specification</h5>

                                    <div className="p-t-2">
                                        {/* <div className="tab-pane" id="information" role="tabpanel"> */}
                                        <div className="row">
                                            <div className="col-sm">
                                                <ul className="ps-0">
                                                    {(product.other_specifications.length > 0) ?
                                                        product.other_specifications.map((spec) => {
                                                            return (
                                                                <li className="flex-w flex-t p-b-6">
                                                                    <span className="stext-102 cl3 w-50">
                                                                        {spec.label_name}
                                                                    </span>

                                                                    <span className="stext-102 cl6 w-50">
                                                                        {spec.value}
                                                                    </span>
                                                                </li>)
                                                        }) : ""}


                                                </ul>
                                            </div>
                                            {/* </div> */}
                                        </div>

                                        <div className="d-flex justify-content-between p-b-2 p-t-15">
                                            <div className="size-219 flex-w flex-m respon6-next">
                                                {/* <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                    <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i className="fs-16 zmdi zmdi-minus"></i>
                                                    </div>

                                                    <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1" />

                                                    <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i className="fs-16 zmdi zmdi-plus"></i>
                                                    </div>
                                                </div> */}
                                                {(!curUserInfo) ?
                                                    <button
                                                        onClick={() => setLoginModalTrigger("d-block")}
                                                        className="flex-end stext-101 cl5 size-101 bor1 hov-btn1 p-lr-15 trans-04">
                                                        Login and Enquiry
                                                    </button> :
                                                    <button
                                                        onClick={() => setEnquiryModalTrigger("d-block")}
                                                        // className="flex-end stext-101 cl5 size-101 bor1 hov-btn1 p-lr-15 trans-04"
                                                        className="submit__btn">
                                                        Enquiry
                                                    </button>}
                                            </div>

                                            <div className="flex-w flex-m p-l-0">
                                                <div className="flex-m bor9 p-r-10 m-r-11">
                                                    <a href="#"
                                                        className="fs-18 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                                                        onClick={() => saveFavourite()}
                                                        data-tooltip={`${(favourite) ? "Added in Favourite List" : "Add to Favourite List"}`} >
                                                        <i className={`zmdi zmdi-favorite ${(favourite) ? "cl2" : ""}`}></i>
                                                    </a>
                                                </div>

                                                <a href="#" className="fs-16 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                                                    <i className="fa fa-facebook"></i>
                                                </a>

                                                <a href="#" className="fs-16 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                                                    <i className="fa fa-twitter"></i>
                                                </a>

                                                <a href="#" className="fs-16 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                                                    <i className="fa fa-google-plus"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="bor10 m-t-0 p-t-20 p-b-20">
                            {/* {let tabActive = (tabID == "description") ? "active" : ""} */}

                            <div className="tab01">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item p-b-10">
                                        <a className={`nav-link ${tabID == "description" ? "active" : ""}`} data-toggle="tab" id="description"
                                            onClick={(e) => clickTabActive(e)} role="tab">Description</a>
                                    </li>

                                    <li className="nav-item p-b-10">
                                        <a className={`nav-link ${tabID == "information" ? "active" : ""}`} data-toggle="tab" id="information"
                                            onClick={(e) => clickTabActive(e)} role="tab">Additional information</a>
                                    </li>

                                    {(product.price_breakdowns.length > 0) ?
                                        <li className="nav-item p-b-10">
                                            <a className={`nav-link ${tabID == "price_breakdown" ? "active" : ""}`} data-toggle="tab" id="price_breakdown"
                                                onClick={(e) => clickTabActive(e)} role="tab">Price Breakdown </a>
                                        </li> : ""}

                                    {/* <li className="nav-item p-b-10">
                                        <a className={`nav-link ${tabID == "reviews" ? "active" : ""}`} data-toggle="tab" id="reviews"
                                            onClick={(e) => clickTabActive(e)} role="tab">Reviews (1)</a>
                                    </li> */}


                                </ul>

                                <div className="tab-content p-t-15">
                                    <div className={`tab-pane fade ${tabID == "description" ? " show active" : ""}`} role="tabpanel">
                                        <div className="how-pos2 p-lr-10-md">
                                            <p className="stext-102 cl6">
                                                {product.item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`tab-pane fade ${tabID == "information" ? " show active" : ""}`} role="tabpanel">
                                        <div className="row">
                                            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                <ul className="p-lr-28 p-lr-15-sm">
                                                    {(product.other_specifications.length > 0) ?
                                                        product.other_specifications.map((spec) => {
                                                            return (
                                                                <li className="flex-w flex-t p-b-7">
                                                                    <span className="stext-102 cl3 size-205">
                                                                        {spec.label_name}
                                                                    </span>

                                                                    <span className="stext-102 cl6 size-206">
                                                                        {spec.value}
                                                                    </span>
                                                                </li>)
                                                        }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {(product.price_breakdowns.length > 0) ?
                                        <div className={`tab-pane fade ${tabID == "price_breakdown" ? " show active" : ""}`} role="tabpanel">
                                            <div className="row">
                                                <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                    <ul className="p-lr-28 p-lr-15-sm">
                                                        {(product.price_breakdowns.length > 0) ?
                                                            product.price_breakdowns.map((spec) => {
                                                                return (
                                                                    <li className="flex-w flex-t p-b-7">
                                                                        <span className="stext-102 cl3 size-205">
                                                                            {spec.label_name}
                                                                        </span>

                                                                        <span className="stext-102 cl6 size-206">
                                                                            {spec.value}
                                                                        </span>
                                                                    </li>)
                                                            }) : ""}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> : ""}

                                    <div className={`tab-pane fade ${tabID == "reviews" ? " show active" : ""}`} role="tabpanel">
                                        <div className="row">
                                            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                <div className="p-b-30 m-lr-15-sm">
                                                    <div className="flex-w flex-t p-b-68">
                                                        <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                                            <img src="images/avatar-01.jpg" alt="AVATAR" />
                                                        </div>

                                                        <div className="size-207">
                                                            <div className="flex-w flex-sb-m p-b-17">
                                                                <span className="mtext-107 cl2 p-r-20">
                                                                    Ariana Grande
                                                                </span>

                                                                <span className="fs-18 cl11">
                                                                    <i className="zmdi zmdi-star"></i>
                                                                    <i className="zmdi zmdi-star"></i>
                                                                    <i className="zmdi zmdi-star"></i>
                                                                    <i className="zmdi zmdi-star"></i>
                                                                    <i className="zmdi zmdi-star-half"></i>
                                                                </span>
                                                            </div>

                                                            <p className="stext-102 cl6">
                                                                Quod autem in homine praestantissimum atque optimum est, id deseruit. Apud ceteros autem philosophos
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <form className="w-full">
                                                        <h5 className="mtext-108 cl2 p-b-7">
                                                            Add a review
                                                        </h5>

                                                        <p className="stext-102 cl6">
                                                            Your email address will not be published. Required fields are marked *
                                                        </p>

                                                        <div className="flex-w flex-m p-t-50 p-b-23">
                                                            <span className="stext-102 cl3 m-r-16">
                                                                Your Rating
                                                            </span>

                                                            <span className="wrap-rating fs-18 cl11 pointer">
                                                                <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                                <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                                <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                                <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                                <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                                                                <input className="dis-none" type="number" name="rating" />
                                                            </span>
                                                        </div>

                                                        <div className="row p-b-25">
                                                            <div className="col-12 p-b-5">
                                                                <label className="stext-102 cl3" for="review">Your review</label>
                                                                <textarea className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10" id="review" name="review"></textarea>
                                                            </div>

                                                            <div className="col-sm-6 p-b-5">
                                                                <label className="stext-102 cl3" for="name">Name</label>
                                                                <input className="size-111 bor8 stext-102 cl2 p-lr-20" id="name" type="text" name="name" />
                                                            </div>

                                                            <div className="col-sm-6 p-b-5">
                                                                <label className="stext-102 cl3" for="email">Email</label>
                                                                <input className="size-111 bor8 stext-102 cl2 p-lr-20" id="email" type="text" name="email" />
                                                            </div>
                                                        </div>

                                                        <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                                                            Submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg6 flex-c-m flex-w size-302 m-t-5">
                        <span className="stext-108 cl6 p-lr-25">
                            SKU: {product.item.code}
                        </span>

                        <span className="stext-108 cl6 p-lr-25">
                            Category: {product.item.category_name}
                        </span>
                    </div>
                </section > : ""
            }


            {/* <section className="sec-relate-product bg0 p-t-45 p-b-105"> */}
            <section className="sec-relate-product bg0 p-b-105">
                <div className="container">
                    <div className="p-b-45">
                        <h3 className="ltext-106 cl5 txt-center">
                            Related Products
                        </h3>
                    </div>

                    {(relatedProduct.length == 0) ?
                        <div className='fs-20 text-center mt-0 mb-5'>No Records found</div> :
                        <div className="wrap-slick2">
                            <Slider ref={slider => {
                                sliderRef1 = slider;
                            }}
                                {...slideSettings1}>
                                <PrevArrowRelated />
                                {
                                    relatedProduct.map((p, i) => {
                                        let pImage = (p.item_image && p.item_image.url) ? p.item_image.url : noImage;
                                        // let category_code = 
                                        return (
                                            <>

                                                <div className="slick2">
                                                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                                                        <div className="block2">
                                                            <div className="block2-pic hov-img0">
                                                                <img className="product-size" src={pImage} alt="IMG-PRODUCT" />

                                                                <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                                                    Quick View
                                                                </a>
                                                            </div>

                                                            <div className="block2-txt flex-w flex-t p-t-14">
                                                                <div className="block2-txt-child1 flex-col-l ">
                                                                    <Link to={`/product/${p.encrypt_id}`} onClick={(e) => clickEncryptID(e)} id={p.encrypt_id}
                                                                        className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                                        {p.name}
                                                                    </Link>

                                                                    <span className="stext-105 cl3">
                                                                        ${p.price}
                                                                    </span>
                                                                </div>

                                                                <div className="block2-txt-child2 flex-r p-t-3">
                                                                    <a href="/" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                                                        <img className="icon-heart1 dis-block trans-04" src={iconheart01} alt="ICON" />
                                                                        <img className="icon-heart2 dis-block trans-04 ab-t-l" src={iconheart02} alt="ICON" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )


                                    })}
                                <NextArrowRelated />
                            </Slider>

                        </div >

                    }
                </div>
                <EnquiryModal showModalTrigger={enquiryModalTrigger}
                    clickShowModalClose={() => setEnquiryModalTrigger("fade")}
                    productName={product?.item?.name}
                    userInfo={curUserInfo}
                    currentEncryptID={currentEncryptID}
                // clickSearchKey={(search_word) => sendSearchKey(search_word)} 
                />
                <LoginModal showModalTrigger={loginModalTrigger}
                    clickShowModalClose={() => setLoginModalTrigger("fade")}
                    productName={product?.item?.name}
                    userInfo={curUserInfo}
                    currentEncryptID={currentEncryptID}
                // clickSearchKey={(search_word) => sendSearchKey(search_word)} 
                />
            </section>
        </>
    )
}
export default ProductDetail
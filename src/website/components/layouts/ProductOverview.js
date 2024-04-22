import noImage from "../../theme/images/jewell/no-image.jpg";

import iconheart01 from "../../theme/images/icons/icon-heart-01.png";
import iconheart02 from "../../theme/images/icons/icon-heart-02.png";


import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import Isotope from "isotope-layout";
import SlideToggle from "react-slide-toggle";
import apiDataService from "../../services/api.service";
import Filter from "../../../jewell/components/forms/Filter";
import Preloader from "../../../website/components/layouts/Preloader";
import StatusBar from "../../../website/components/layouts/StatusBar";
import { Link } from "react-router-dom";

const ProductOverview = (props) => {

    const [howActive, setHowActive] = useState("*")
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const [curAdminInfo, setCurAdminInfo] = useState(adminInfo);

    const [filterKey, setFilterKey] = useState('*');

    const [showSearch, setShowSearch] = useState(false);

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [preLoading, setPreLoading] = useState(false);

    const [totalCount, setTotalcount] = useState(0);

    const [productParams, setProductParams] = useState({
        search_word: "",
        city: "",
        itemPerPage: 20,
        currentPage: 1
    });

    useEffect(() => {
        let search_word = (window.location.pathname.split('/')[4]) ? window.location.pathname.split('/')[4] : null;
        productParams.search_word = search_word
        setProductParams(productParams);
        getProduct(filterKey);
        setHowActive(filterKey);
        setFilterKey(filterKey);
    }, [productParams]);

    let perPageSelectEntity = {
        name: "perpage", type: "select", colClass: '',
        className: "fs-12 p-0 h-0", htmlFor: "", value: productParams.itemPerPage, label: "", placeholder: "10",
        validate: false,
        options: [
            { value: "20", label: "20" },
            { value: "40", label: "40" },
            { value: "60", label: "60" },
            { value: "80", label: "80" }
        ]
    }

    const [status, setStatus] = useState({ show: false, type: 'success', msg: '' })
    function onStatusClose() {
        setStatus({ show: false, type: 'success', msg: '' });
    }

    function getCategory(selectCondition) {
        apiDataService.getCategoryList(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data.data;
                if (categoryData.length > 0) {
                    let selectArr = [{ id: '*', code: '*', name: 'All Categories' }];
                    let arr = selectArr.concat(categoryData);
                    console.log(arr);
                    setCategories(arr);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getProduct(category_code) {
        setPreLoading(true);
        let data = { ...productParams }
        data.offset = (data.currentPage - 1) * data.itemPerPage;
        if (category_code != "*") { data.category_code = category_code; }
        apiDataService.getProductList(data)
            .then(async (response) => {
                let responseData = response.data;
                let productData = responseData.data.data;
                if (productData.length > 0) {
                    console.log(productData);
                    setProducts(productData);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                } else {
                    setProducts([]);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setProducts([]);
                setPreLoading(false);
                setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
            });
    }


    useEffect(() => {
        getCategory();
        let cat_code = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        if ((cat_code != null) && (cat_code != "search")) {
            getProduct(cat_code);
            setHowActive(cat_code);
            setFilterKey(cat_code);
        } else {
            getProduct(filterKey);
        }
        setCurAdminInfo(adminInfo);

    }, [adminInfo]);

    function onPgClick() {
        setProductParams(productParams);
        getCategory();
        getProduct(filterKey);
    }

    function clickHowActive(e) {
        let code = e.target.id;
        productParams.currentPage = 1;
        productParams.search_word = "";
        setProductParams(productParams);
        getProduct(code);
        setHowActive(code);
        setFilterKey(code);
    }

    function handlesearch_word(e) {
        productParams.search_word = e.target.value;
        setProductParams(productParams);
        getProduct(filterKey);
        setHowActive(filterKey);
        setFilterKey(filterKey);
    }

    return (
        <>
            <div className="bg0">
                {preLoading ? <Preloader /> : ""}
                <div className="container">
                    <StatusBar status={status} onStatusClose={() => onStatusClose()} />

                    {(!props.pagination) ?
                        <div className="p-b-10">
                            <h3 className="ltext-103 cl5">
                                Product Overview
                            </h3>
                        </div> : ""}

                    <div className="flex-w flex-sb-m p-b-52">
                        <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                            {/* <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">
                                All Products
                            </button> */}
                            {categories.map((v, i) => {
                                let code = v.code
                                let id = code + v.id
                                // console.log(id);
                                // console.log(howActive);
                                let howActiveClass = (howActive == code) ? "how-active1" : "";
                                return (

                                    <button className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${howActiveClass}`}
                                        data-filter={`${code}`}
                                        key={code}
                                        id={code}
                                        onClick={(e) => clickHowActive(e)}
                                    >
                                        {v.name}
                                    </button>
                                )
                            })}

                        </div>

                        <SlideToggle duration={150}>
                            {({ toggle, setCollapsibleElement }) => (
                                <>
                                    <div className="flex-w flex-c-m m-tb-10">
                                        <div className={`flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search ${(showSearch) ? "show-search" : ""}`}
                                            onClick={() => { toggle(); setShowSearch(!showSearch); }}>
                                            <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                                            <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                            Search
                                        </div>
                                    </div>

                                    <div className={`dis-none panel-search w-full p-t-10 p-b-15 ${(showSearch) ? "d-block" : ""}`} ref={setCollapsibleElement}>
                                        <div className="bor8 dis-flex p-l-15">
                                            <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                                                <i className="zmdi zmdi-search"></i>
                                            </button>

                                            <input className="mtext-107 cl2 size-114 plh2 p-r-15"
                                                type="text"
                                                name="search_word"
                                                value={productParams.search_word}
                                                onChange={(newValue) => { handlesearch_word(newValue); }}
                                                placeholder="Search" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </SlideToggle>
                    </div>

                    <div className="row isotope-grid pb-5">
                        {
                            (products.length == 0) ?
                                <div className='fs-20 text-center mt-0 mb-5'>No Records found</div> :
                                products.map((p, i) => {
                                    let pImage = (p.item_image && p.item_image.url) ? p.item_image.url : noImage;
                                    // let category_code = 
                                    return (

                                        <div key={p.code} className={`col-sm-6 col-md-4 col-lg-3 p-b-35 animated zoomIn isotope-item ${p.category_code}`}>
                                            <div className="block2">
                                                <div className="block2-pic hov-img0">
                                                    <img className="product-size" src={pImage} alt="IMG-PRODUCT" />

                                                    <Link to={`/${adminInfo.site_url}/product/${p.encrypt_id}`} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                                        Quick View
                                                    </Link>
                                                </div>

                                                <div className="block2-txt flex-w flex-t p-t-14">
                                                    <div className="block2-txt-child1 flex-col-l ">
                                                        <Link to={`/${adminInfo.site_url}/product/${p.encrypt_id}`} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
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
                                    )
                                })
                        }
                    </div>

                    {(!props.pagination && curAdminInfo) ?

                        <div className="flex-c-m flex-w w-full p-t-20">
                            <Link to={`/${curAdminInfo.site_url}/shop`} className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                                Load More
                            </Link>
                        </div> : ""}

                    {(props.pagination) ?

                        <Filter filterEntities={[]}
                            perPageSelectEntity={perPageSelectEntity}
                            states={{ params: productParams }}
                            totalCount={totalCount}
                            onChangeSearch={() => onPgClick()}
                            startPreload={(loading) => setPreLoading(loading)}
                        /> : ""}

                </div>
            </div>

        </>
    )
}
export default ProductOverview


// const [isotope, setIsotope] = useState(null);

// useEffect(() => {
//     // setIsotope(
//     //     new Isotope('.isotope-grid', {
//     //         itemSelector: '.isotope-item',
//     //         layoutMode: 'fitRows',
//     //         percentPosition: true,
//     //         animationEngine: 'best-available',
//     //         masonry: {
//     //             columnWidth: '.isotope-item'
//     //         }
//     //     })
//     // );
// }, []);

// useEffect(() => {
//     if (isotope) {
//         filterKey === '*'
//             ? isotope.arrange({ filter: `*` })
//             : isotope.arrange({ filter: `.${filterKey}` });
//     }
// }, [isotope, filterKey]);
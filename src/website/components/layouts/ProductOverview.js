import noImage from "../../theme/images/jewell/no-image.jpg";

import iconheart01 from "../../theme/images/icons/icon-heart-01.png";
import iconheart02 from "../../theme/images/icons/icon-heart-02.png";


import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux'

import Isotope from "isotope-layout";
import SlideToggle from "react-slide-toggle";
import apiDataService from "../../services/api.service";
import Filter from "../../../jewell/components/forms/Filter";
import Preloader from "../../../website/components/layouts/Preloader";
import StatusBar from "../../../website/components/layouts/StatusBar";
import { Link } from "react-router-dom";

import ViewModal from "../../../jewell/modals/ViewModal";
import CategoryModal from "./modals/CategoryModal";

const ProductOverview = (props) => {

    const [howActive, setHowActive] = useState("*")
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const [curAdminInfo, setCurAdminInfo] = useState(adminInfo);

    // const catArrayRef = useRef(null);
    const [catArray, setCatArray] = useState([]);


    const [filterKey, setFilterKey] = useState('*');

    const [showSearch, setShowSearch] = useState(false);

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [preLoading, setPreLoading] = useState(false);

    const [pagination, setPagination] = useState(props.pagination);

    const [productFilterClass, setProductFilterClass] = useState("position-relative");


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
                    // console.log(arr);
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
        data.categoriesFilter = catArray;
        apiDataService.getProductList(data)
            .then(async (response) => {
                let responseData = response.data;
                let productData = responseData.data.data;
                if (productData.length > 0) {
                    // if (!props.pagination) { productData = productData.slice(0, 4); }
                    // console.log(productData);
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
            setCatArray([cat_code]); //Filter
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

    useEffect(() => {
        let posWrapProduct = 0;
        if (document.querySelectorAll('.header_head').length > 0
            && document.querySelectorAll('.top-slide').length > 0
            && document.querySelectorAll('.prod-search-head').length > 0
            && document.querySelectorAll('.sec-banner').length > 0) {
            console.log(parseInt(document.getElementsByClassName('header_head')[0].offsetHeight));
            console.log(parseInt(document.getElementsByClassName('top-slide')[0].offsetHeight));
            console.log(parseInt(document.getElementsByClassName('prod-search-head')[0].offsetHeight));
            console.log(parseInt(document.getElementsByClassName('sec-banner')[0].offsetHeight));
            posWrapProduct = parseInt(document.getElementsByClassName('header_head')[0].offsetHeight) +
                parseInt(document.getElementsByClassName('top-slide')[0].offsetHeight) +
                parseInt(document.getElementsByClassName('prod-search-head')[0].offsetHeight) +
                parseInt(document.getElementsByClassName('sec-banner')[0].offsetHeight);
        }

        // console.log(posWrapProduct);

        const onScrollProduct = () => settingProductDesktop(posWrapProduct);
        window.removeEventListener('scroll', onScrollProduct);
        window.addEventListener('scroll', onScrollProduct, { passive: true });
    }, []);

    function settingProductDesktop(posWrapProduct) {
        // console.log("posWrapProduct");
        // console.log(posWrapProduct);
        // console.log(window.scrollY);
        if (window.scrollY > posWrapProduct) {
            setPagination(true)
            setProductFilterClass('prod-filter-head-sticky');
        }
        else {
            setPagination(false)
            setProductFilterClass('position-relative');
        }
    }

    function setFilterCat(arr) {
        // console.log(arr);
        setCatArray(arr);
    }

    return (
        <>
            <div className="bg0">
                {preLoading ? <Preloader /> : ""}
                <StatusBar status={status} onStatusClose={() => onStatusClose()} />

                <div className={`prod-filter-head ${productFilterClass}`} id="prod-filter-head">

                    <div className="p-b-10">
                        <h3 className="fs-16 fw-bold">
                            Products For You
                        </h3>
                    </div>

                    <div className="">
                        <CategoryModal catArray={catArray} setFilterCat={(arr) => setFilterCat(arr)} setCloseModal={() => getProduct(null)} />
                    </div>

                </div>

                {/* <div className="flex-w flex-sb-m p-b-20"> */}
                {/* <div className="flex-w flex-l-m filter-tope-group m-tb-10"> */}
                {/* <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">
                                All Products
                            </button> */}
                {/* {categories.map((v, i) => {
                                let code = v.code
                                let id = code + v.id
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
                            })} */}

                {/* </div> */}

                {/* <SlideToggle duration={150}>
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
                        </SlideToggle> */}
                {/* </div> */}
                <div className="container">

                    <div className="row isotope-grid">
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

                                                <div className="block2-txt flex-w flex-t p-t-8">
                                                    <div className="block2-txt-child1 flex-col-l ">
                                                        <Link to={`/${adminInfo.site_url}/product/${p.encrypt_id}`} className="prod_name">
                                                            {p.name}
                                                        </Link>

                                                        <span className="prod_cat p-t-1">
                                                            {p.category_name}
                                                        </span>

                                                        {(p.price) ?
                                                            <span className="prod_price p-t-1">
                                                                &#8377;{p.price}
                                                            </span> : ""}
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

                    {(!pagination && curAdminInfo) ?
                        <div className="flex-c-m flex-w w-full">
                            <Link to={`/${curAdminInfo.site_url}/shop`}
                                className="submit__btn">
                                Load More
                            </Link>
                        </div> : ""}

                    {(pagination) ?
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
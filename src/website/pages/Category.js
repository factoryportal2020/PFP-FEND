import categoryImage from "../theme/images/jewell/no-image.jpg"
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import apiDataService from "../services/api.service";
import SlideToggle from "react-slide-toggle";
import Filter from "../../jewell/components/forms/Filter";
import StatusBar from "../components/layouts/StatusBar";
import Preloader from "../components/layouts/Preloader";

const Category = () => {

    const [categories, setCategories] = useState([]);
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)

    const [showSearch, setShowSearch] = useState(false);

    // const [filterKey, setFilterKey] = useState('*');

    const [totalCount, setTotalcount] = useState(0);

    const [preLoading, setPreLoading] = useState(false);



    const [categoryParams, setCategoryParams] = useState({
        search_word: "",
        city: "",
        itemPerPage: 20,
        currentPage: 1
    });


    function onPgClick() {
        setCategoryParams(categoryParams);
        getCategory();
    }

    let perPageSelectEntity = {
        name: "perpage", type: "select", colClass: '',
        className: "fs-12 p-0 h-0", htmlFor: "", value: categoryParams.itemPerPage, label: "", placeholder: "10",
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

    useEffect(() => {
        getCategory();
    }, []);

    function getCategory() {
        setPreLoading(true);
        let data = { ...categoryParams }
        data.offset = (data.currentPage - 1) * data.itemPerPage;
        apiDataService.getCategoryList(data)
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data.data;
                if (categoryData.length > 0) {
                    let arr = categoryData;
                    console.log(arr);
                    setCategories(arr);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                } else {
                    setCategories([]);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setCategories([]);
                setPreLoading(false);
                setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
            });
    }

    function handlesearch_word(e) {
        categoryParams.search_word = e.target.value;
        setCategoryParams(categoryParams);
        getCategory();
        // setHowActive(filterKey);
        // setFilterKey(filterKey);
    }

    function resetShowSearch(showSearch) {
        console.log(showSearch);
        if (showSearch) {
            categoryParams.search_word = "";
            setCategoryParams(categoryParams);
            getCategory();
        }
    }

    return (
        <>
            <div className="sec-banner bg0 mob-p-t-100 p-b-20">
                {preLoading ? <Preloader /> : ""}
                <div className="container">
                    <StatusBar status={status} onStatusClose={() => onStatusClose()} />

                    <div className="flex-w flex-sb-m p-b-15">
                        <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                            <div className="p-b-10">
                                <h3 className="ltext-103 cl5">
                                    Categories
                                </h3>
                            </div>
                        </div>

                        <SlideToggle duration={150}>
                            {({ toggle, setCollapsibleElement }) => (
                                <>
                                    <div className="flex-w flex-c-m m-tb-10">
                                        <div className={`flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search ${(showSearch) ? "show-search" : ""}`}
                                            onClick={() => { toggle(); setShowSearch(!showSearch); resetShowSearch(showSearch); }}>
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
                                                value={categoryParams.search_word}
                                                onChange={(newValue) => { handlesearch_word(newValue); }}
                                                placeholder="Search" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </SlideToggle>
                    </div>
                    <div className="row">

                        {categories.map((v, i) => {
                            let code = v.code
                            let category_image = (v.category_image) ? (v.category_image.url && v.category_image.url != "") ? v.category_image.url : categoryImage : categoryImage;
                            return (

                                <div key={code} className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
                                    <div className="block1 wrap-pic-w">
                                        <img className="category-size" src={category_image} alt="IMG-BANNER" />

                                        <Link to={`/${adminInfo.site_url}/shop/${v.code}`} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                                            <div className="block1-txt-child1 flex-col-l">
                                                <span className="block1-name ltext-102 trans-04 p-b-8">
                                                    {v.name}
                                                </span>

                                                <span className="block1-info stext-102 trans-04">
                                                    {v.name}
                                                </span>
                                            </div>

                                            <div className="block1-txt-child2 p-b-4 trans-05">
                                                <div className="block1-link stext-101 cl0 trans-09">
                                                    Shop Now
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <Filter filterEntities={[]}
                        perPageSelectEntity={perPageSelectEntity}
                        states={{ params: categoryParams }}
                        totalCount={totalCount}
                        onChangeSearch={() => onPgClick()}
                        startPreload={(loading) => setPreLoading(loading)}
                    />
                </div>
            </div>
        </>
    )
}
export default Category
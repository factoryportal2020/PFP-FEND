import React, { forwardRef } from 'react';

import categoryImage from "../../theme/images/jewell/no-image.jpg"
import allCategoryImage from "../../theme/images/jewell/all-cat.png"
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import apiDataService from "../../services/api.service";

import { Tooltip as ReactTooltip } from "react-tooltip";


const Category = forwardRef((props, ref) => {

    const [categories, setCategories] = useState([]);
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const [curAdminInfo, setCurAdminInfo] = useState(adminInfo);


    const [selectedCat, setSelectedCat] = useState((ref && ref.current != null) ? ref.current : []);

    const chooseCat = (id) => {
        var catId = id
        var curSelectedCat = selectedCat
        if (curSelectedCat.includes(catId)) {
            curSelectedCat.splice(curSelectedCat.indexOf(catId), 1)
        } else {
            curSelectedCat.push(catId);
        }

        if (catId == "*") {
            curSelectedCat = [];
        }

        setSelectedCat(curSelectedCat);
        console.log(ref);
        // nameCatgeory(curSelectedCat);
        ref.current = [...curSelectedCat]
    }

    function nameCatgeory(curSelectedCat) {
        console.log(categories);
    }

    // useEffect(() => {
    //     if (ref && ref.current) {
    //         setSelectedCat((ref && ref.current != null) ? ref.current : []);
    //     }
    // }, []);

    useEffect(() => {
        setCurAdminInfo(adminInfo);
        getCategory();
    }, [adminInfo]);

    function getCategory() {
        let selectCondition = {}
        apiDataService.getCategoryList(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data.data;
                if (categoryData.length > 0) {
                    let arr = categoryData;
                    if (categoryData.length > 3) {
                        let selectArr = [{ id: '*', code: '*', name: 'Categories' }];
                        arr = selectArr.concat(categoryData);
                    }
                    var screen_width = window.screen.width;
                    console.log(screen_width);
                    var arrayOfArrays = [];
                    var size = (props.for == "filter") ? 4 :  10;
                    // var size = (props.for == "filter") ? 4 : (parseInt(screen_width) < 400) ? 4 : 10;
                    for (var i = 0; i < arr.length; i += size) {
                        arrayOfArrays.push(arr.slice(i, i + size));
                    }
                    setCategories(arrayOfArrays);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            {(props.for == "filter") ?
                <div className="sec-banner cat-section mob-m-t-0 p-t-20 p-b-20">
                    <div className="container">
                        {categories.map((cat, catind) => {
                            return (
                                <div className="cat-head-filter">
                                    {categories[catind].map((v, i) => {

                                        let code = v.code
                                        let category_image = (v.category_image) ? (v.category_image.url && v.category_image.url != "") ? v.category_image.url : categoryImage : categoryImage;
                                        let cat_name = v.name;

                                        // all categories
                                        category_image = (catind == 0 && i == 0) ? allCategoryImage : category_image;
                                        cat_name = (catind == 0 && i == 0) ? "All Category" : cat_name;

                                        var checkClass = (selectedCat.includes(v.id)) ? "check" : "";
                                        checkClass = ((catind == 0 && i == 0) && selectedCat.length == 0) ? "check" : checkClass;

                                        return (
                                            <>
                                                <Link className="" id={v.id} onClick={(e) => chooseCat(v.id)} data-tooltip-id={code} >
                                                    <div key={code} className="cat-div-filter">
                                                        <img className={`cat-img ${checkClass}`} src={category_image} alt="Img" />
                                                        <span className="cat-content">
                                                            {cat_name}
                                                        </span>
                                                    </div>
                                                </Link>
                                                <ReactTooltip
                                                    id={code}
                                                    place="bottom"
                                                    content={v.name}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        {/* <div className="flex-c-m flex-w w-full p-t-20">
                        {(curAdminInfo) ?
                            <Link to={`/${curAdminInfo.site_url}/category`} className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                                Load Categories
                            </Link> : ""}
                    </div> */}
                    </div>
                </div> :
                <div className="sec-banner cat-section mob-m-t-0 p-t-20 p-b-20">
                    <div className="container">
                        {categories.map((cat, catind) => {
                            return (
                                <div className="cat-head">
                                    {categories[catind].map((v, i) => {

                                        let code = v.code
                                        let category_image = (v.category_image) ? (v.category_image.url && v.category_image.url != "") ? v.category_image.url : categoryImage : categoryImage;
                                        let cat_name = (v.name != null && v.name.length > 8) ? v.name.substring(0, 8) + "..." : v.name;

                                        // all categories
                                        category_image = (catind == 0 && i == 0) ? allCategoryImage : category_image;
                                        cat_name = (catind == 0 && i == 0) ? "Categories" : cat_name;

                                        return (
                                            <>
                                                <Link to={`/${adminInfo.site_url}/shop/${v.code}`} className="">
                                                    <div key={code} className="cat-div" data-tooltip-id={code}>
                                                        <img className="cat-img" src={category_image} alt="Img" />
                                                        <span className="cat-content">
                                                            {cat_name}
                                                        </span>
                                                    </div>
                                                    <ReactTooltip
                                                        id={code}
                                                        place="bottom"
                                                        content={v.name}
                                                    />
                                                </Link>

                                            </>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
});
// export default React.forwardRef((props, ref) => <Category
//     {...props} ref={ref}
// />);

export default Category;
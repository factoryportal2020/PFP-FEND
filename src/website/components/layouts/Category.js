import categoryImage from "../../theme/images/jewell/no-image.jpg"
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import apiDataService from "../../services/api.service";


const Category = () => {

    const [categories, setCategories] = useState([]);
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const [curAdminInfo, setCurAdminInfo] = useState(adminInfo);


    useEffect(() => {
        setCurAdminInfo(adminInfo);
        getCategory();
    }, [adminInfo]);

    function getCategory() {
        let selectCondition = { itemPerPage: 3 }
        apiDataService.getCategoryList(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data.data;
                if (categoryData.length > 0) {
                    let arr = categoryData;
                    if (categoryData.length < 3) {
                        let selectArr = [{ id: '*', code: '*', name: 'All Categories' }];
                        arr = selectArr.concat(categoryData);
                    }
                    console.log(arr);
                    setCategories(arr);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            <div className="sec-banner bg0 mob-m-t-20 p-b-20">
                <div className="container">
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

                    <div className="flex-c-m flex-w w-full p-t-20">
                        {(curAdminInfo) ?
                            <Link to={`/${curAdminInfo.site_url}/category`} className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                                Load Categories
                            </Link> : ""}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Category
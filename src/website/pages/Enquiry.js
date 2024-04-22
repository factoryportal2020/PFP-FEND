import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Preloader from "../components/layouts/Preloader";
import StatusBar from "../components/layouts/StatusBar";
import Filter from "../../jewell/components/forms/Filter";
import apiDataService from "../services/api.service";
import noImage from "../theme/images/jewell/no-image.jpg";
import { Link } from "react-router-dom";


const Enquiry = (props) => {

    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const [curAdminInfo, setCurAdminInfo] = useState(adminInfo);

    const [enquiries, setEnquiries] = useState([]);

    const [preLoading, setPreLoading] = useState(false);
    // console.log(props);
    const [pagination, setPagination] = useState((props.pagination) ? true : false);

    const [totalCount, setTotalcount] = useState(0);


    const [productParams, setProductParams] = useState({
        search_word: "",
        city: "",
        itemPerPage: 20,
        currentPage: 1
    });

    useEffect(() => {
        getEnquiry();
    }, []);


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

    function onPgClick() {
        setProductParams(productParams);
        getEnquiry();
    }

    function getEnquiry() {
        setPreLoading(true);
        let data = { ...productParams }
        apiDataService.getEnquiryList(data)
            .then(async (response) => {
                console.log(response);
                let responseData = response.data;
                let enquiryData = responseData.data.data;
                if (enquiryData.length > 0) {
                    console.log(enquiryData);
                    setEnquiries(enquiryData);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                } else {
                    setEnquiries([]);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setEnquiries([]);
                setPreLoading(false);
                setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
            });
    }

    return (

        <>
            {(!pagination) ?
                <div className={"content-div mt-100"}>
                    <StatusBar status={status} onStatusClose={() => onStatusClose()} />
                    {preLoading ? <Preloader /> : ""}


                    <div className="p-b-30">
                        <h3 className="ltext-103 cl4 fs-20">
                            Enquiries
                        </h3>
                    </div>
                    <div className={'row mb-5'}>
                        {
                            (totalCount == 0) ?

                                <div className='fs-20 text-center mt-5'>No Records found</div> :
                                // (pagination) ? <ul class="header-cart-wrapitem w-full"> :""
                                enquiries.map((element, i) => {
                                    let pImage = (element.item_image && element.item_image.url) ? element.item_image.url : noImage;
                                    var count = 80;
                                    var comment = element.comment;
                                    comment = (element.comment) ? comment.slice(0, count) + (comment.length > count ? "..." : "") : "";
                                    return (
                                        <div className='col-xl-4 mb-4'>
                                            <div className="card w-auto">
                                                <div className="card-body">
                                                    <div className="card-content">
                                                        <div className="d-flex">
                                                            <div className="w-50">
                                                                <div className="card-image">
                                                                    <div className="col-sm mb-2 img-container">
                                                                        <img className="border-radius-50 card-profile-image" src={pImage} alt="Card image cap" />
                                                                        <a href={pImage} target='_blank'>
                                                                            <i className="preview-btn fa-solid fa-eye" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <Link className="textdoc-none" to={`/${curAdminInfo?.site_url}/product/${element.product_encrypt_id}`}>
                                                                    <h5 className="card-title fs-16 textdoc-none">{element.product_name}</h5>
                                                                </Link>
                                                                <h6 className="fs-12">Code: {element.product_code}</h6>

                                                            </div>
                                                            <div className='ms-2 me-2 mt-2 mb-2'>
                                                                <h5 className="fs-16">Enquiry Id:&nbsp;{element.code}</h5>
                                                                <h5 className="fs-14">Email:&nbsp;{element.email}</h5>
                                                                <h5 className="fs-14">Count:&nbsp;{element.count}</h5>
                                                                <h6 className="fs-14 pb-1">{comment}</h6>

                                                                <div className="maxw-100">
                                                                    <div className='fs-10 pb-1'>Enquiried At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                                                                    <div className='fs-10'>Updated At: <span className="created_at" title="Created Date">{element.updated_at}</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div >
                                        </div>
                                    )
                                })
                        }
                    </div>

                    {(!pagination) ?
                        <Filter filterEntities={[]}
                            perPageSelectEntity={perPageSelectEntity}
                            states={{ params: productParams }}
                            totalCount={totalCount}
                            onChangeSearch={() => onPgClick()}
                            startPreload={(loading) => setPreLoading(loading)}
                        /> : ""}
                </div> :

                <>
                    <ul class="header-cart-wrapitem w-full">
                        {
                            (totalCount == 0) ? <div className='fs-20 text-center mt-5'>No Records found</div> :
                                enquiries.slice(0, 2).map((element, i) => {
                                    
                                    let pImage = (element.item_image && element.item_image.url) ? element.item_image.url : noImage;
                                    var count = 80;
                                    var comment = element.comment;
                                    comment = (element.comment) ? comment.slice(0, count) + (comment.length > count ? "..." : "") : "";
                                    return (
                                        <li class="header-cart-item flex-w flex-t m-b-12">
                                            <div class="header-cart-item-img">
                                                <img className="border-radius-50 card-profile-image" src={pImage} alt="Card image cap" />

                                                <h6 className="fs-8">{element.product_code}</h6>
                                            </div>

                                            <div class="header-cart-item-txt p-t-8">
                                                <Link className="header-cart-item-name m-b-18 hov-cl1 trans-04" to={`/${curAdminInfo?.site_url}/product/${element.product_encrypt_id}`}>
                                                    {element.product_name}
                                                </Link>

                                                <span class="header-cart-item-info">
                                                    <h5 className="fs-10">Enquiry Id:&nbsp;{element.code}</h5>
                                                    <h5 className="fs-10">Email:&nbsp;{element.email}</h5>
                                                    <h5 className="fs-10">Count:&nbsp;{element.count}</h5>
                                                    <h6 className="fs-10 pb-1">{comment}</h6>
                                                    <div className='fs-8 pb-1'>Enquiried At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                                                    <div className='fs-8'>Updated At: <span className="created_at" title="Created Date">{element.updated_at}</span></div>
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </>

            }
        </>
    )
}
export default Enquiry
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Preloader from "../../components/layouts/Preloader";
import StatusBar from "../../components/layouts/StatusBar";
import Filter from "../../components/forms/Filter";
import enquiryDataService from "../../services/enquiry.service";
import { Link } from "react-router-dom";
import noImage from "../../theme/images/no-image.jpg";


const Enquiry = (props) => {

    const [enquiries, setEnquiries] = useState([]);

    const [preLoading, setPreLoading] = useState(false);

    const [pagination, setPagination] = useState((props.pagination) ? true : false);

    const [totalCount, setTotalcount] = useState(0);

    const [productParams, setProductParams] = useState({
        search_word: "",
        city: "",
        itemPerPage: 20,
        currentPage: 1,
    });

    const [states, setStates] = useState({
        title: "Enquiry",
        // addLink: "enquiry",
        status: { show: false, type: 'success', msg: '' },
        datas: {
        }
    })

    const [filterEntities, setFilterEntities] = useState([
        {
            name: "search_word", type: "text", colClass: 'col-sm', className: "fs-12", htmlFor: "", value: "",
            label: "", placeholder: "Search",
            validate: false,
        },
        // {
        //     name: "category_id", type: "select", colClass: 'col-sm',
        //     className: "fs-12", htmlFor: "", value: "", label: "Category", placeholder: "All",
        //     validate: false,
        //     options: [
        //         { value: '', label: 'All' },
        //     ]
        // },
    ])

    useEffect(() => {
        getEnquiry();
    }, []);

    // useEffect(() => {
    //     if (pagination) {
    //         // console.log("test")
    //         getEnquiry();
    //     }
    // }, [pagination]);


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
        enquiryDataService.list(data)
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

            <div className={"content-div"}>
                <StatusBar status={status} onStatusClose={() => onStatusClose()} />
                {preLoading ? <Preloader /> : ""}
                <Filter filterEntities={[]}
                    perPageSelectEntity={perPageSelectEntity}
                    states={{ params: productParams, ...states }}
                    totalCount={totalCount}
                    onChangeSearch={() => onPgClick()}
                    startPreload={(loading) => setPreLoading(loading)}
                />
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
                                                            {/* <Link className="textdoc-none" to={`/product/edit/${element.product_encrypt_id}`} params={{ viewEncryptId: element.product_encrypt_id, action: "view" }}> */}
                                                                <h5 className="card-title fs-16 textdoc-none">{element.product_name}</h5>
                                                            {/* </Link> */}
                                                            <h6 className="fs-12">Code: {element.product_code}</h6>

                                                        </div>
                                                        <div className='ms-2 me-2 mt-2 mb-2'>
                                                            <h5 className="fs-16 blue">Enquiry Id:&nbsp;{element.code}</h5>
                                                            <h5 className="fs-14">Email:&nbsp;{element.email}</h5>
                                                            <h5 className="fs-14">Count:&nbsp;{element.count}</h5>
                                                            <h6 className="fs-12 pb-1">Comment:&nbsp;<span className="green">{comment}</span></h6>

                                                            <div className="maxw-100">
                                                                <div className='fs-10 pb-1'>Enquiried At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                                                                {/* <div className='fs-10'>Updated At: <span className="created_at" title="Created Date">{element.updated_at}</span></div> */}
                                                                {(element.username != null && element.username != "") ?
                                                                    <>
                                                                        <div className='fs-10 mt-2 '>Logged Customer</div>
                                                                        <div className='fs-12 fw-normal'>
                                                                            Username:&nbsp;
                                                                            <span className="created_at green" title="Created Date">{element.username}</span>
                                                                        </div>
                                                                        {(element.loggedname != null && element.loggedname != "" && element.loggedname != " ") ?
                                                                            <div className='fs-12 fw-normal'>
                                                                                Name:&nbsp;
                                                                                <span className="created_at green" title="Created Date">{element.loggedname}</span>
                                                                            </div>
                                                                            : ""}
                                                                    </>
                                                                    : ""}

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



            </div>
        </>
    )
}
export default Enquiry
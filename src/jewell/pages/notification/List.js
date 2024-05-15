import { useEffect, useState } from "react";
import Preloader from "../../components/layouts/Preloader";
import StatusBar from "../../components/layouts/StatusBar";
import Filter from "../../components/forms/Filter";
import dashboardService from "../../services/dashboard.service";
import { Link } from "react-router-dom";
import noImage from "../../theme/images/no-image.jpg";


const Notification = (props) => {

    const [notifications, setNotifications] = useState([]);

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
        title: "Notification",
        // addLink: "notification",
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
        getNotification();
    }, []);

    // useEffect(() => {
    //     if (pagination) {
    //         // console.log("test")
    //         getNotification();
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
        getNotification();
    }

    function getNotification() {
        setPreLoading(true);
        let data = { ...productParams }
        dashboardService.getNotification(data)
            .then(async (response) => {
                console.log(response);
                let responseData = response.data;
                let notificationData = responseData.data;
                if (notificationData.notifications.length > 0) {
                    console.log(notificationData);
                    setNotifications(notificationData.notifications);
                    setTotalcount(notificationData.totalCount);
                    setPreLoading(false);
                } else {
                    setNotifications([]);
                    setTotalcount(0);
                    setPreLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setNotifications([]);
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
                            notifications.map((element, i) => {
                                var count = 80;
                                var message = element.message;
                                message = (element.message) ? message.slice(0, count) + (message.length > count ? "..." : "") : "";
                                return (
                                    (message)?
                                    <div className='col-xl-12 mb-4'>
                                        <div className="card w-auto">
                                            <div className="card-body">
                                                <div className="card-content">
                                                    <div className="d-flex">
                                                        <div className="w-50">
                                                            <h6 className="fs-16 pb-1"><span className="green">{message}</span></h6>
                                                        </div>
                                                        <div className='ms-2 me-2 mt-2 mb-2'>

                                                            <div className="maxw-100">
                                                                <div className='fs-10 pt-2 pe-2 pb-0'>Recieved At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    </div>:""
                                )
                            })
                    }
                </div>



            </div>
        </>
    )
}
export default Notification
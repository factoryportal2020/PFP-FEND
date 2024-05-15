import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Preloader from "../../components/layouts/Preloader";
import StatusBar from "../../components/layouts/StatusBar";
import Filter from "../../components/forms/Filter";
import messageDataService from "../../services/message.service";
import { Link } from "react-router-dom";
import noImage from "../../theme/images/no-image.jpg";


const Message = (props) => {

    const [messages, setMessages] = useState([]);

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
        title: "Message",
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
        getMessage();
    }, []);

    // useEffect(() => {
    //     if (pagination) {
    //         // console.log("test")
    //         getMessage();
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
        getMessage();
    }

    function getMessage() {
        setPreLoading(true);
        let data = { ...productParams }
        messageDataService.list(data)
            .then(async (response) => {
                console.log(response);
                let responseData = response.data;
                let messageData = responseData.data.data;
                if (messageData.length > 0) {
                    console.log(messageData);
                    setMessages(messageData);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                } else {
                    setMessages([]);
                    setTotalcount(responseData.data.totalCount);
                    setPreLoading(false);
                }
            })
            .catch(e => {
                console.log(e);
                setMessages([]);
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
                            messages.map((element, i) => {
                                var count = 80;
                                var message = element.message;
                                message = (element.message) ? message.slice(0, count) + (message.length > count ? "..." : "") : "";
                                return (
                                    <div className='col-xl-4 mb-4'>
                                        <div className="card w-auto">
                                            <div className="card-body">
                                                <div className="card-content">
                                                    <div className="d-flex">
                                                        <div className='ms-2 me-2 mt-2 mb-2'>
                                                            <h5 className="fs-14 blue">Message Id:&nbsp;{element.code}</h5>
                                                            <h5 className="fs-16 mt-1">Email:&nbsp;{element.email}</h5>
                                                            <h6 className="fs-12 pb-1 pt-2">Message:&nbsp;<span className="green">{message}</span></h6>
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
export default Message
import React, { Component, useEffect, useState } from 'react';

import '../../theme/css/dashboard_new.css';
import dashboardService from '../../services/dashboard.service';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';
import Filter from '../../components/forms/Filter';
import { InputElement } from '../../components/forms/InputElement';
import CountUp from 'react-countup';

const Dashboard = () => {

    const [dashboard, setDashboard] = useState([]);

    const [status, setStatus] = useState({ show: false, type: 'success', msg: '' })

    const [preLoading, setPreLoading] = useState(false);

    const [timeEvent, setTimeEvent] = useState('today');

    const [states, setStates] = useState({
        params: {
            start_date: new Date(),
            end_date: new Date(),
        },
    });

    const [filterEntities, setFilterEntities] = useState([
        {
            name: "start_date", type: "date", colClass: 'col-md-4', className: "", htmlFor: "start_date", value: "",
            label: "Start Date", placeholder: "",
            validate: false,
        },
        {
            name: "end_date", type: "date", colClass: 'col-md-4 ml-2', className: "", htmlFor: "end_date", value: "",
            label: "End Date", placeholder: "",
            validate: false,
        }
    ])

    function onStatusClose() {
        setStatus({ show: false, type: 'success', msg: '' });
    }

    useEffect(() => {
        getDashboard(timeEvent);
    }, []);


    function onChangeSearch(newValue, f, d) {

    }

    function clickTimeEvent(event) {
        setTimeEvent(event);
        getDashboard(event)
    }



    function getDashboard(event) {
        setPreLoading(true);
        let data = {};
        data.timeEvent = event;
        dashboardService.get(data)
            .then(async (response) => {
                console.log(response);
                let responseData = response.data;
                let dashboardData = responseData.data;
                console.log(dashboardData);
                // if (dashboardData.length > 0) {
                console.log(dashboardData);
                setDashboard(dashboardData);
                setPreLoading(false);
            })
            .catch(e => {
                console.log(e);
                setDashboard([]);
                setPreLoading(false);
                setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
            });
    }


    return (
        <>
            <div className="content-div">
                <StatusBar status={status} onStatusClose={() => onStatusClose()} />
                {preLoading ? <Preloader /> : ""}

                <div className='pt-0 pb-3'>
                    <div className="row g-3 brown">
                        <div className="col-sm">
                            <div className='d-flex justify-content-between brown fw-normal'>
                                <div>
                                    <h2 className="text-black font-w600 mb-0">Dashboard</h2>
                                    <p className="mb-0">Welcome to Pocket Admin!</p>
                                </div>

                                <div className="dropdown custom-dropdown d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {(dashboard?.userInfo?.role == "admin") ?
                    <>
                        <div className="row">
                            <div className="col-xl-8 col-xxl-8 col-lg-8 col-md-8 col-sm-8">
                                <div className="row">

                                    <div className="col-xl-3 col-xxl-3 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget-stat card-new card-new-shadow-yellow">
                                            <div className="card-new-body p-4">
                                                <div className="media ai-icon">
                                                    <Link to={"/customer/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary ">
                                                        <i className="fa-solid fa-users center_img"></i>
                                                    </Link>
                                                    <div className="media-body">
                                                        <h3 className="mb-0 text-black">
                                                            <span className="counter ml-0"><CountUp end={dashboard?.customers?.count} /></span>
                                                        </h3>
                                                        <p className="mb-0">Total Customers</p>
                                                        {/* <small>4% (30 days)</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-xxl-3 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget-stat  card-new card-new-shadow-yellow">
                                            <div className="card-new-body p-4">
                                                <div className="media ai-icon">
                                                    <Link to={"/worker/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                        <i className="fa-solid fa-users-cog center_img"></i>
                                                    </Link>
                                                    <div className="media-body">
                                                        <h3 className="mb-0 text-black">
                                                            <span className="counter ml-0"><CountUp end={dashboard?.workers?.count} /></span>
                                                        </h3>
                                                        <p className="mb-0">Total Workers</p>
                                                        {/* <small>4% (30 days)</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-xxl-3 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget-stat  card-new card-new-shadow-yellow">
                                            <div className="card-new-body p-4">
                                                <div className="media ai-icon">
                                                    <Link to={"/category/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                        <i className="fa-solid fa-table-cells center_img"></i>
                                                    </Link>
                                                    <div className="media-body">
                                                        <h3 className="mb-0 text-black">
                                                            <span className="counter ml-0"><CountUp end={dashboard?.categories?.count} /></span>
                                                        </h3>
                                                        <p className="mb-0">Total Categories</p>
                                                        {/* <small>4% (30 days)</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-xxl-3 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget-stat  card-new card-new-shadow-yellow">
                                            <div className="card-new-body p-4">
                                                <div className="media ai-icon">
                                                    <Link to={"/product/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                        <i className="fa-solid fa-image center_img"></i>
                                                    </Link>
                                                    <div className="media-body">
                                                        <h3 className="mb-0 text-black">
                                                            <span className="counter ml-0"><CountUp end={dashboard?.products?.count} /></span>
                                                        </h3>
                                                        <p className="mb-0">Total Products</p>
                                                        {/* <small>4% (30 days)</small> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-4">

                                <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12">
                                    {
                                        (dashboard?.website?.website) ?


                                            <div className="card-new noboxShadow bg-secondary jewell-bg-color"
                                                style={{ backgroundImage: `url(${dashboard?.website?.bannerImages.url})` }}
                                            >
                                                <div className="card-new-body p-5 green">
                                                    <h4 className="text-white mb-3">Active <br />Website <Link target="_blank" to={`/${dashboard?.website?.website?.site_url}/home`} >{dashboard?.website?.website?.site_url}</Link></h4>
                                                    <Link to={"/website"}
                                                        className="d-flex text-light align-items-center justify-content-between">
                                                        <small>Edit Your Webiste and <b>Re-Launch It</b></small>
                                                        <i className="ti-arrow-right"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            :
                                            <div className="card-new noboxShadow bg-secondary" >
                                                <div className="card-new-body p-5">
                                                    <h4 className="text-white mb-3">Website</h4>
                                                    <Link to={"/website"}
                                                        className="d-flex text-light align-items-center justify-content-between">
                                                        <small>Create Your Webiste and <b>Launch It</b></small>
                                                        <i className="ti-arrow-right"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </>
                    : ""}


                {/* Second Row                 */}
                <div className='row'>
                    {(dashboard?.userInfo?.role == "admin" || dashboard?.userInfo?.role == "worker") ?
                        <>
                            <div className="col-xl-8 col-xxl-8 col-lg-8 col-md-8">
                                <div className='card-new'>
                                    <div className="card-new-header border-0 pb-0 d-sm-flex d-block">
                                        <div>
                                            <h4 className="card-new-title m-b-1">Task Summary</h4>
                                            <small className="mb-0">All Assigned and not started tasks</small>
                                        </div>
                                        <div className="card-new-action card-new-tabs mt-3 mt-sm-0">
                                            <ul className="nav nav-tabs nav-news-tabs" role="tablist">
                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'today' ? "active" : ""}`} onClick={(e) => clickTimeEvent("today")} data-toggle="tab" href="#session-duration" role="tab">
                                                        Today
                                                    </a>
                                                </li>

                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'yesterday' ? "active" : ""}`} onClick={(e) => clickTimeEvent("yesterday")} data-toggle="tab" href="#session-duration" role="tab">
                                                        Yesterday
                                                    </a>
                                                </li>

                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'week' ? "active" : ""}`} onClick={(e) => clickTimeEvent("week")} data-toggle="tab" href="#bounce" role="tab">
                                                        Weekly
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'lastweek' ? "active" : ""}`} onClick={(e) => clickTimeEvent("lastweek")} data-toggle="tab" href="#bounce" role="tab">
                                                        Last Week
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'month' ? "active" : ""}`} onClick={(e) => clickTimeEvent("month")} data-toggle="tab" href="#user" role="tab">
                                                        Monthly
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'lastmonth' ? "active" : ""}`} onClick={(e) => clickTimeEvent("lastmonth")} data-toggle="tab" href="#user" role="tab">
                                                        Last Month
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={`nav-link ${timeEvent == 'year' ? "active" : ""}`} onClick={(e) => clickTimeEvent("year")} data-toggle="tab" href="#user" role="tab">
                                                        Yearly
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-new-body orders-summary">
                                        <div className="task_panel order-manage p-3 align-items-center m-b-4">
                                            {/* <h4 className="mb-0">New Tasks <i className="fa fa-circle text-success m-l-1 fs-15"></i></h4> */}
                                            <h4 className="mb-0">Total Tasks </h4>
                                            <a href="javascript:void(0);" className="btn fs-22 py-1 btn-primary px-4 m-l-6 m-r-6 mob-m-b-20"><CountUp end={dashboard?.tasks?.total_tasks} /></a>

                                            <h4 className="m-b-0 m-l-4">New Assigned Tasks </h4>
                                            <a href="javascript:void(0);" className="btn fs-22 py-1 btn-success px-4 m-l-6 m-r-6 mob-m-b-20"><CountUp end={dashboard?.tasks?.Assigned} /></a>

                                            <h4 className="m-b-0 m-l-4">Overdue Tasks </h4>
                                            <a href="javascript:void(0);" className="btn fs-22 py-1 btn-danger px-4 m-l-6 mob-m-b-20"><CountUp end={dashboard?.tasks?.overdue_tasks} /></a>

                                            <div className='m-l-auto'>
                                            <Link to={"/task/list"} className=" text-primary font-w500">Manage Tasks <i className="ti-angle-right m-l-1"></i></Link>
                                            </div>
                                        </div>

                                        <div className="row m-t-20">
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Unassigned} /></h2>
                                                    <p className="fs-12 mb-0">Unassigned</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Inprogress} /></h2>
                                                    <p className="fs-12 mb-0">Inprogress</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Holding} /></h2>
                                                    <p className="fs-12 mb-0">Holding</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Restarted} /></h2>
                                                    <p className="fs-12 mb-0">Restarted</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Cancelled} /></h2>
                                                    <p className="fs-12 mb-0">Cancelled</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Pending} /></h2>
                                                    <p className="fs-12 mb-0">Pending</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Completed} /></h2>
                                                    <p className="fs-12 mb-0">Completed</p>
                                                </div>
                                            </div>
                                            <div className="col-sm m-b-1 mob-m-b-10">
                                                <div className="border px-2 py-1 rounded-xl">
                                                    <h2 className="fs-26 font-w600 counter"><CountUp end={dashboard?.tasks?.Delivered} /></h2>
                                                    <p className="fs-12 mb-0">Delivered</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div></> : ""}
                    {(dashboard?.userInfo?.role == "admin" || dashboard?.userInfo?.role == "customer") ?
                        <>
                            <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-4">
                                {(dashboard?.userInfo?.role == "admin") ?
                                    <>
                                        <div className='row'>
                                            <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-6">
                                                <div className="widget-stat card-new">
                                                    <div className="card-new-body p-4">
                                                        <div className="media ai-icon">
                                                            <Link to={"/message/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                                <i className="fa-solid fa-envelope center_img"></i>
                                                            </Link>
                                                            <div className="media-body">
                                                                <h3 className="mb-0 text-black"><span className="counter ml-0"><CountUp end={dashboard?.messages?.count} /></span></h3>
                                                                <p className="mb-0">Messages</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-6">
                                                <div className="widget-stat card-new">
                                                    <div className="card-new-body p-4">
                                                        <div className="media ai-icon">
                                                            <Link to={"/subscribe/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                                <i className="fa-solid fa-bell center_img"></i>
                                                            </Link>
                                                            <div className="media-body">
                                                                <h3 className="mb-0 text-black"><span className="counter ml-0"><CountUp end={dashboard?.subscribes?.count} /></span></h3>
                                                                <p className="mb-0">Subscribes</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </>
                                    : ""}

                                <div className='row'>
                                    <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-6">
                                        <div className="widget-stat card-new">
                                            <div className="card-new-body p-4">
                                                <div className="media ai-icon">
                                                    <Link to={"/favourite/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                        <i className="fa-solid fa-heart center_img"></i>
                                                    </Link>
                                                    <div className="media-body">
                                                        <h3 className="mb-0 text-black"><span className="counter ml-0"><CountUp end={dashboard?.favourites?.count} /></span></h3>
                                                        <p className="mb-0">Favourite</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-6">
                                        <div className="widget-stat card-new">
                                            <div className="card-new-body p-4">
                                                <div className="media ai-icon">
                                                    <Link to={"/enquiry/list"} className="spanLink notextDecor m-r-6 bgl-primary text-primary">
                                                        <i className="fa-solid fa-sticky-note center_img"></i>
                                                    </Link>
                                                    <div className="media-body">
                                                        <h3 className="mb-0 text-black"><span className="counter ml-0"><CountUp end={dashboard?.enquiries?.count} /></span></h3>
                                                        <p className="mb-0">Enquiries</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </> : ""}

                </div>

                {/* End Second Row                 */}

            </div >
            {/* </div> */}

        </>
    )
}

export default Dashboard;

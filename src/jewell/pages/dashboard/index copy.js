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
        getDashboard();
    }, []);


    function onChangeSearch(newValue, f, d) {

    }



    function getDashboard() {
        setPreLoading(true);
        let data = [];
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
                // } else {
                //     setDashboard([]);
                //     setPreLoading(false);
                // }
            })
            .catch(e => {
                console.log(e);
                setDashboard([]);
                setPreLoading(false);
                setStatus({ show: true, type: 'error', msg: 'Something went wrong' });
            });
    }


    return (
        // console.log(dashboard)
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
                                    {/* <div className="btn btn-sm btn-primary light d-flex align-items-center svg-btn" data-toggle="dropdown">
                                        <div className="text-left ml-3">
                                            <span className="d-block fs-16">Filter Periode</span>
                                            <small className="d-block fs-13">4 June 2020 - 4 July 2020</small>
                                        </div>
                                        <i className="fa fa-angle-down scale5 ml-3"></i>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#">4 June 2020 - 4 July 2020</a>
                                        <a className="dropdown-item" href="#">5 july 2020 - 4 Aug 2020</a>
                                    </div> */}


                                    {/* Start Date and end Date */}
                                    {/* <div className="btn btn-sm light d-flex align-items-center svg-btn" data-toggle="dropdown">
                                        {filterEntities.map((element, i) => {
                                            let new_element = { ...element }
                                            let fieldName = `${element.name}`
                                            new_element.value = states.params[fieldName]

                                            return (
                                                <>
                                                    <InputElement key={i} element={new_element}
                                                        onChange={(newValue) => { onChangeSearch(newValue, fieldName, new_element) }}
                                                        onClick={() => { }}></InputElement>
                                                </>
                                            )
                                        })}

                                    </div> */}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


                {/* <div className="container-fluid"> */}

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

                    {/* <div className="col-xl-6 col-xxl-6 col-lg-12 col-md-12">
                        <div className="card-new card-new-shadow-yellow">
                            <div className="card-new-header border-0 pb-0 d-sm-flex d-block">
                                <div>
                                    <h4 className="card-new-title m-b-1">Orders Summary</h4>
                                    <small className="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
                                </div>
                                <div className="card-new-action card-new-tabs mt-3 mt-sm-0">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#user" role="tab">
                                                Monthly
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#bounce" role="tab">
                                                Weekly
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab">
                                                Today
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-new-body orders-summary">
                                <div className="d-flex order-manage p-3 align-items-center mb-4">
                                    <a href="javascript:void(0);" className="btn fs-22 py-1 btn-success px-4 mr-3">25</a>
                                    <h4 className="mb-0">New Orders <i className="fa fa-circle text-success ml-1 fs-15"></i></h4>
                                    <a href="javascript:void(0);" className="ml-auto text-primary font-w500">Manage orders <i className="ti-angle-right ml-1"></i></a>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 mb-4">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">25</h2>
                                            <p className="fs-12 mb-0">On Delivery</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">60</h2>
                                            <p className="fs-12 mb-0">Delivered</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Canceled</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-timeline-icon">
                                    <div className="row align-items-center mx-0">
                                        <div className="col-xl-3 col-lg-4 col-xxl-4 col-sm-4 px-0 my-2 text-center text-sm-left">
                                            <span className="donut" data-peity='{ "fill": ["rgb(62, 73, 84)", "rgba(255, 109, 76, 1)","rgba(43, 193, 85, 1)"]}'>2,5,3</span>
                                        </div>
                                        <div className="col-xl-9 col-lg-8 col-xxl-8 col-sm-8 px-0">
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="mb-0 fs-14 mr-2 col-4 px-0">Immunities (24%)</p>
                                                <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                                                    <div className="progress-bar bg-warning progress-animated" style={{ height: "8px", width: "85%" }} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                                <span className="pull-right ml-auto col-1 px-0 text-right">25</span>
                                            </div>
                                            <div className="d-flex align-items-center  mb-3">
                                                <p className="mb-0 fs-14 mr-2 col-4 px-0">Heart Beat (41%)</p>
                                                <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                                                    <div className="progress-bar bg-success progress-animated" style={{ height: "8px", width: "70%" }} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                                <span className="pull-right ml-auto col-1 px-0 text-right">60</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 fs-14 mr-2 col-4 px-0">Weigth (15%)</p>
                                                <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                                                    <div className="progress-bar bg-dark progress-animated" style={{ height: "8px", width: "30%" }} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                                <span className="pull-right ml-auto col-1 px-0 text-right">07</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-xl-6 col-xxl-6 col-lg-12 col-md-12">
                        <div className="card-new card-new-shadow-yellow">
                            <div className="card-new-header border-0 pb-0 d-sm-flex d-block">
                                <div>
                                    <h4 className="card-new-title m-b-1">Revenue</h4>
                                    <small className="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
                                </div>
                                <div className="dropdown mt-3 mt-sm-0">
                                    <button type="button" className="btn btn-primary dropdown-toggle light fs-14" data-toggle="dropdown" aria-expanded="false">
                                        Weekly
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Daily</a>
                                        <a className="dropdown-item" href="#">Weekly</a>
                                        <a className="dropdown-item" href="#">Monthly</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-new-body revenue-chart px-3">
                                <div className="d-flex align-items-end pr-3 pull-right revenue-chart-bar">
                                    <div className="d-flex align-items-end mr-4">
                                        <img src="images/svg/ic_stat2.svg" height="22" width="22" className="mr-2 m-b-1" alt="" />
                                        <div>
                                            <small className="text-dark fs-14">Income</small>
                                            <h3 className="font-w600 mb-0">$<span className="counter">41,512</span>k</h3>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-end">
                                        <img src="images/svg/ic_stat1.svg" height="22" width="22" className="mr-2 m-b-1" alt="" />
                                        <div>
                                            <small className="text-dark fs-14">Expense</small>
                                            <h3 className="font-w600 mb-0">$<span className="counter">41,512</span>k</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="chartBar"></div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-xl-9 col-xxl-9 col-lg-8 col-md-12">
                            <div id="user-activity" className="card-new card-new-shadow-yellow">
                                <div className="card-new-header border-0 pb-0 d-sm-flex d-block">
                                    <div>
                                        <h4 className="card-new-title m-b-1">Customer Map</h4>
                                        <small className="mb-0">Lorem Ipsum is simply dummy text of the printing</small>
                                    </div>
                                    <div className="card-new-action card-new-tabs mt-3 mt-sm-0">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#user" role="tab">
                                                    Monthly
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#bounce" role="tab">
                                                    Weekly
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab">
                                                    Today
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-new-body">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="user" role="tabpanel">
                                            <canvas id="activity" className="chartjs"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}


                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-4">

                        <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12">
                            {
                                (dashboard?.website?.website) ?


                                    <div className="card-new noboxShadow bg-secondary"
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

                {/* Second Row                 */}
                <div className='row'>
                    <div className="col-xl-8 col-xxl-8 col-lg-8 col-md-8">
                        <div className='card-new card-new-shadow-yellow'>
                            <div className="card-new-header border-0 pb-0 d-sm-flex d-block">
                                <div>
                                    <h4 className="card-new-title m-b-1">Task Summary</h4>
                                    <small className="mb-0">All Assigned and not started tasks</small>
                                </div>
                                <div className="card-new-action card-new-tabs mt-3 mt-sm-0">
                                    <ul className="nav nav-tabs nav-news-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab">
                                                Today
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#bounce" role="tab">
                                                Weekly
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#user" role="tab">
                                                Monthly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-new-body orders-summary">
                                <div className="d-flex order-manage p-3 align-items-center m-b-4">
                                    <a href="javascript:void(0);" className="btn fs-22 py-1 btn-success px-4 m-r-3">25</a>
                                    <h4 className="mb-0">New Tasks <i className="fa fa-circle text-success m-l-1 fs-15"></i></h4>
                                    <a href="javascript:void(0);" className="m-l-auto text-primary font-w500">Manage Tasks <i className="ti-angle-right m-l-1"></i></a>
                                </div>
                                <div className="row m-t-20">
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">25</h2>
                                            <p className="fs-12 mb-0">Assigned</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">60</h2>
                                            <p className="fs-12 mb-0">Inprogress</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Holding</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Restarted</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Cancelled</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Pending</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Completed</p>
                                        </div>
                                    </div>
                                    <div className="col-sm m-b-1">
                                        <div className="border px-2 py-1 rounded-xl">
                                            <h2 className="fs-26 font-w600 counter">7</h2>
                                            <p className="fs-12 mb-0">Delivered</p>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="widget-timeline-icon">
                                    <div className="row align-items-center mx-0">
                                        <div className="col-xl-3 col-lg-4 col-xxl-4 col-sm-4 px-0 my-2 text-center text-sm-left">
                                            <span className="donut" data-peity='{ "fill": ["rgb(62, 73, 84)", "rgba(255, 109, 76, 1)","rgba(43, 193, 85, 1)"]}'>2,5,3</span>
                                        </div>
                                        <div className="col-xl-9 col-lg-8 col-xxl-8 col-sm-8 px-0">
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="mb-0 fs-14 mr-2 col-4 px-0">Immunities (24%)</p>
                                                <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                                                    <div className="progress-bar bg-warning progress-animated" style={{ height: "8px", width: "85%" }} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                                <span className="pull-right ml-auto col-1 px-0 text-right">25</span>
                                            </div>
                                            <div className="d-flex align-items-center  mb-3">
                                                <p className="mb-0 fs-14 mr-2 col-4 px-0">Heart Beat (41%)</p>
                                                <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                                                    <div className="progress-bar bg-success progress-animated" style={{ height: "8px", width: "70%" }} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                                <span className="pull-right ml-auto col-1 px-0 text-right">60</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 fs-14 mr-2 col-4 px-0">Weigth (15%)</p>
                                                <div className="progress mb-0" style={{ height: "8px", width: "100%" }}>
                                                    <div className="progress-bar bg-dark progress-animated" style={{ height: "8px", width: "30%" }} role="progressbar">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                                <span className="pull-right ml-auto col-1 px-0 text-right">07</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-4">
                        <div className='row'>
                            <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-6">
                                <div className="widget-stat card-new card-new-shadow-pink">
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
                                <div className="widget-stat card-new card-new-shadow-pink">
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

                        <div className='row'>
                            <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-6">
                                <div className="widget-stat card-new card-new-shadow-pink">
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
                                <div className="widget-stat card-new card-new-shadow-pink">
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

                    </div>

                </div>

                {/* End Second Row                 */}

            </div>
            {/* </div> */}

        </>
    )
}

export default Dashboard;

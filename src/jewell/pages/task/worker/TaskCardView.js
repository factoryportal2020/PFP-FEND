import React from 'react';
import maleLogo from "../../../theme/images/profile/male1.png";
import femaleLogo from "../../../theme/images/profile/female.jpg";
import { Link } from 'react-router-dom';
import datetime from '../../../components/forms/datetime';


export const TaskCardView = React.forwardRef((props, ref) => {
    var element = props.element;

    let status = (element.status) ? element.status : "Unassigned"
    let name = element.title

    let profileImage = (element.gender == "female") ? femaleLogo : maleLogo;


    var count = 80;
    var description = element.description;
    description = (description) ? description.slice(0, count) + (description.length > count ? "..." : "") : "";


    if (element.task_image.length > 0 && element.task_image[0].url != "") {
        profileImage = element.task_image[0].url;
    }

    return (
        <>
            <div className="card w-auto">
                <div className="card-body  d-flex-web d-block-web">

                    <div className="card-image">
                        <div className="col-sm mt-2 mb-2 img-container">
                            <img className="border-radius-50 view-profile-image" src={profileImage} alt="Card image cap" />
                            <a href={profileImage} target='_blank'>
                                <i className="view-btn fa-solid fa-eye" /></a>
                        </div>
                        <div className="fs-12 pt-3">
                            <span className="grey fs-10">Assigned Date:</span><br></br>
                            {datetime.showDateTime(element.start_date)}
                        </div>

                        <div className="fs-12 pt-3">
                            <span className="grey fs-10">Due Date:</span><br></br>
                            {datetime.showDateTime(element.end_date)}
                        </div>

                    </div>



                    <div className="card-content">
                        <div className="d-flex justify-content-between">
                            <div><h5 className="card-title fs-20">{name}</h5></div>
                        </div>


                        <div className="fs-14">
                            <span className="grey fs-10">Code:</span>&nbsp;
                            {element.code}
                        </div>

                        <div className="fs-16">
                            <span className="grey fs-12">Category:</span>&nbsp;
                            {element.category_name}
                        </div>

                        <div className="fs-16">
                            <span className="grey fs-12">Price:</span>&nbsp;
                            ₹{element.price}
                        </div>

                        <div className="fs-14">
                            <span className="grey fs-12">Specification:</span>&nbsp;
                            {element.specification}
                        </div>


                        <div className="fs-14">
                            <span className="grey fs-12">Quantity:</span>&nbsp;
                            {element.quantity}
                        </div>


                        <div className="fs-14 pb-2 d-flex">
                            <div className="grey fs-12 pt-1">Description:</div>
                            <div className="ps-2">{description}</div>
                        </div>

                        {/* <div className="d-flex">

                            <div> */}
                        <h6 className="fs-14 pt-1">Other Descriptions:</h6>
                        {
                            (element.other_specifications.length) > 0 ?
                                element.other_specifications.map(function (spec) {
                                    return (
                                        <div className="fs-14 pb-1 d-flex">
                                            <div className="grey">{spec.label_name}:</div>
                                            <div className="ps-2">{spec.value}</div>
                                        </div>
                                    )
                                })
                                : ""
                        }
                        {/* </div> */}

                        <h6 className="fs-14 pt-2">Price Breakdowns:</h6>
                        {
                            (element.price_breakdowns.length) > 0 ?
                                element.price_breakdowns.map(function (spec) {
                                    return (
                                        <div className="fs-14 pb-1 d-flex">
                                            <div className="grey">{spec.label_name}:</div>
                                            <div className="ps-2">{spec.value}</div>
                                        </div>
                                    )
                                })
                                : ""
                        }

                        {/* </div> */}

                        <div className="fs-16 d-flex justify-content-between float-end">

                            <div className="ribbon-wrapper position-relative">
                                <div className={`ribbon-green bg-color3 ${status}`}>{status} </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div >
        </>
    )


})
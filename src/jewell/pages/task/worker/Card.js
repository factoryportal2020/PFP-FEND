import React from 'react';
import maleLogo from "../../../theme/images/profile/male1.png";
import femaleLogo from "../../../theme/images/profile/female.jpg";
import { Link } from 'react-router-dom';
import datetime from '../../../components/forms/datetime';


export const TaskCard = React.forwardRef((props, ref) => {
    console.log(props.element);
    var element = props.element;
    var addLink = props.addLink;
    var encrypt_id = element.encrypt_id;

    let status = (element.status) ? element.status : "Unassigned"
    let overdue = (element.overdue) ? element.overdue : ""
    let name = element.title

    let profileImage = (element.gender == "female") ? femaleLogo : maleLogo;


    var count = 80;
    var description = element.description;
    description = (description) ? description.slice(0, count) + (description.length > count ? "..." : "") : "";

    var specification = element.specification;
    specification = (specification) ? specification.slice(0, count) + (specification.length > count ? "..." : "") : "";


    if (element.task_image && element.task_image.url != "") {
        profileImage = element.task_image.url;
    }

    return (
        <>
            <div className="card w-auto">
                <div className="card-body d-flex">

                    <div className="card-image">
                        <div className="col-sm mt-2 mb-2 img-container">
                            <img className="border-radius-50 card-profile-image" src={profileImage} alt="Card image cap" />
                            <a href={profileImage} target='_blank'>
                                <i className="preview-btn fa-solid fa-eye" /></a>
                        </div>
                        <div className="fs-12 pt-3">
                            <span className="grey fs-8">Start Date:</span><br></br>
                            {datetime.showDateTime(element.start_date)}
                        </div>

                        <div className="fs-12 pt-3">
                            <span className="grey fs-8">Due Date:</span><br></br>
                            {datetime.showDateTime(element.end_date)}
                        </div>

                        {(overdue != "") ?
                            <div className="fs-14 ">
                                <span className="red fs-14">Overdue:</span><br></br>
                            </div> : ""}

                    </div>

                    <div className="card-content">
                        <div className="card-title">
                            <div><h5 className="card-title fs-18">Title: {name}</h5></div>
                            <div className="ms-2">
                                <Link to={`/${addLink}/edit/${element.encrypt_id}`}>
                                    <i title="Edit" className="fa-solid fa-pencil fs-20 ps-2 jewell-color"></i>
                                </Link>
                                <a href="#/" onClick={(event) => props.viewModalTriggerClick(event)}>
                                    <i id={encrypt_id} title="View" className="fa-solid fa-eye fs-20 ps-2 jewell-color"></i>
                                </a>
                            </div>
                        </div>
                        <div className="fs-14">
                            <span className="grey fs-12">Code:</span>&nbsp;
                            {element.code}
                        </div>

                        <div className="fs-16">
                            <span className="grey fs-10">Category:</span>&nbsp;
                            {element.category_name}
                        </div>

                        <div className="fs-12">
                            <span className="grey fs-10">Specification:</span>&nbsp;
                            {specification}
                        </div>


                        <div className="fs-12">
                            <span className="grey fs-10">Quantity:</span>&nbsp;
                            {element.quantity}
                        </div>

                        <div className="fs-12">
                            <span className="grey fs-10">Price:</span>&nbsp;
                            {element.price}
                        </div>

                        <div className="fs-12 pt-1 pb-3 d-flex">
                            <div className="grey fs-10 pt-1 ">Description:</div>
                            <div className="ps-2">{description}</div>
                        </div>

                        <div className={"maxw-40 float-end pt-1"}>
                            <div className="ribbon-wrapper position-relative">
                                <div className={`ribbon-green w-auto bg-color3 ${status}`}>{status}
                                    &nbsp;&nbsp;
                                    <a className="" href="#/" onClick={(event) => props.changeStatusModalTriggerClick(event)}>
                                        <i id={encrypt_id} title="Status Edit" className="fa-solid fa-pencil fs-16 jewell-color"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

})
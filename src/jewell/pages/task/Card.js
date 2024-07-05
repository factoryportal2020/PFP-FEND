import React from 'react';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import { Link } from 'react-router-dom';
import datetime from '../../components/forms/datetime';
import NewProductLogo from "../../theme/images/profile/no-image.jpg";


export const TaskCard = React.forwardRef((props, ref) => {
    console.log(props.element);
    var element = props.element;
    var addLink = props.addLink;
    var encrypt_id = element.encrypt_id;

    let status = (element.status) ? element.status : "Unassigned"
    let overdue = (element.overdue) ? element.overdue : ""
    let name = element.title

    let profileImage = (element.gender == "female") ? femaleLogo : maleLogo;
    let workerImage = (element.gender == "female") ? femaleLogo : maleLogo;
    let customerImage = (element.gender == "female") ? femaleLogo : maleLogo;


    var count = 80;
    var description = element.description;
    description = (description) ? description.slice(0, count) + (description.length > count ? "..." : "") : "";


    if (element.task_image && element.task_image.url != "") {
        profileImage = element.task_image.url;
    }else{
        profileImage = NewProductLogo
    }

    if (element.worker_image && element.worker_image.url != "") {
        workerImage = element.worker_image.url;
    }
    if (element.customer_image && element.customer_image.url != "") {
        customerImage = element.customer_image.url;
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
                        <div className="fs-10 pt-3">
                            <span className="grey fs-8">Start Date:</span><br></br>
                            {datetime.showDateTime(element.start_date)}
                        </div>

                        <div className="fs-10 pt-3 pb-3">
                            <span className="grey fs-8">Due Date:</span><br></br>
                            {datetime.showDateTime(element.end_date)}
                        </div>

                        {(overdue != "") ?
                            <div className="fs-14 ">
                                <span className="red fs-14">Overdue:</span><br></br>
                            </div> : ""}

                        <div className="ribbon-wrapper">
                            <div className={`ribbon-green w-auto bg-color3 ${status}`}>{status}
                                &nbsp;&nbsp;
                                <a className="" href="#/" onClick={(event) => props.changeStatusModalTriggerClick(event)}>
                                    <i id={encrypt_id} title="Status Edit" className="fa-solid fa-pencil fs-16 jewell-color"></i>
                                </a>
                            </div>
                        </div>
                    </div>



                    <div className="card-content">
                        <div className="card-title">
                            <div><h5 className="card-title fs-16">{name}</h5></div>
                            <div className="card-action">
                                <a href="#/" onClick={(event) => props.deleteModalTriggerClick(event)}>
                                    <i id={encrypt_id} data-title={`${name}`} title="delete" className="fa-solid fa-trash fs-20 light-red"></i>
                                </a>
                                <Link to={`/${addLink}/edit/${element.encrypt_id}`}>
                                    <i title="Edit" className="fa-solid fa-pencil fs-20 ps-2  light-green"></i>
                                </Link>
                                <a href="#/" onClick={(event) => props.viewModalTriggerClick(event)}>
                                    <i id={encrypt_id} title="View" className="fa-solid fa-eye fs-20 ps-2 jewell-color"></i>
                                </a>
                            </div>
                        </div>


                        <div className="fs-12">
                            <span className="grey fs-10">Code:</span>&nbsp;
                            {element.code}
                        </div>

                        <div className="fs-16">
                            <span className="grey fs-10">Category:</span>&nbsp;
                            {element.category_name}
                        </div>

                        <div className="fs-12">
                            <span className="grey fs-10">Specification:</span>&nbsp;
                            {element.specification}
                        </div>


                        <div className="fs-12">
                            <span className="grey fs-10">Quantity:</span>&nbsp;
                            {element.quantity}
                        </div>


                        <div className="fs-12 pt-1 pb-3 d-flex">
                            <div className="grey fs-10 pt-1 ">Description:</div>
                            <div className="ps-2">{description}</div>
                        </div>

                        <div className='worker-customer-div'>
                            {(element.worker_name) ?

                                <div className="worker_detail d-flex">
                                    <div className="img-container">
                                        <div className="">
                                            <img className="border-radius-50 worker-profile-image" src={workerImage} alt="Card image cap" />
                                            <a href={workerImage} target='_blank'>
                                                <i className="worker-preview-btn fa-solid fa-eye" /></a>
                                        </div>
                                    </div>

                                    <div className='ms-2'>
                                        <h6 className='fs-12'>Worker:</h6>
                                        <h6 className='fs-10'>{element.worker_name}</h6>
                                        <h6 className='fs-10'>{element.worker_specialist}</h6>
                                        <h6 className='fs-10'>{element.worker_phone_no}</h6>
                                    </div>
                                </div> : ""}

                            {(element.customer_name) ?
                                <div className="customer_detail d-flex mob-m-t-2">
                                    <div className="img-container">
                                        <div className="">
                                            <img className="border-radius-50 worker-profile-image" src={customerImage} alt="Card image cap" />
                                            <a href={customerImage} target='_blank'>
                                                <i className="worker-preview-btn fa-solid fa-eye" /></a>
                                        </div>
                                    </div>

                                    <div className='ms-2'>
                                        <h6 className='fs-12'>Customer</h6>
                                        <h6 className='fs-10'>{element.customer_name}</h6>
                                        <h6 className='fs-10'>{element.customer_phone_no}</h6>
                                    </div>
                                </div> : ""}

                        </div>

                        <div className={"maxw-40 float-end pt-1 mob-m-t-1 mob-maxw-80"}>
                            <div className='fs-8 pb-1'>Created At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                            <div className='fs-8'>Updated At: <span className="created_at" title="Created Date">{element.updated_at}</span></div>
                        </div>

                    </div>



                </div>
            </div >
        </>
    )

})
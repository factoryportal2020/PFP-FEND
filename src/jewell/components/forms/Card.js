import React from 'react';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import categoryLogo from "../../theme/images/profile/no-image.jpg";
import NewProductLogo from "../../theme/images/profile/no-image.jpg";
import CustomerCard from '../../pages/customer/Card';
import WorkerCard from '../../pages/worker/Card';
import CategoryCard from '../../pages/category/Card';
import AdminCard from '../../pages/admin/Card';
import ItemCard from '../../pages/product/Card';
import { Link } from 'react-router-dom';
import { FigureCaption } from 'react-bootstrap';


export const Card = React.forwardRef((props, ref) => {
    var element = props.element;
    var addLink = props.addLink;
    var encrypt_id = element.encrypt_id;

    var title = props.title;
    let status = (element.status == 1) ? "Active" : "Deactive"

    let profileImage = NewProductLogo;

    if (element.gender == "female") {
        profileImage = femaleLogo;
    }else{
        profileImage = maleLogo;
    }

    let card = <CustomerCard element={element} />;
    let name = (element.first_name) ? element.first_name : "" + " " + (element.last_name) ? element.last_name : ""

    if (addLink == "customer") {
        if (element.profile_image.url != "") {
            profileImage = element.profile_image.url;
        }
    }

    if (addLink == "admin") {
        if (element.profile_image.url != "") {
            profileImage = element.profile_image.url;
        }
        card = <AdminCard element={element} />;
    }
    if (addLink == "worker") {
        if (element.profile_image.url != "") {
            profileImage = element.profile_image.url;
        }
        card = <WorkerCard element={element} />;
    }
    if (addLink == "category") {
        if (element.category_image.url != "") {
            profileImage = element.category_image.url;
        } else {
            profileImage = categoryLogo
        }
        card = <CategoryCard element={element} />;
        name = element.name
    }

    if (addLink == "product") {
        if (element.item_image.url != "") {
            profileImage = element.item_image.url;
        } else {
            profileImage = NewProductLogo
        }
        card = <ItemCard element={element} />;
        name = element.name
    }


    let username = (element.username != null) ? element.username.substring(0, 10) : ""

    if (element.username != null && element.username.length > 10) {
        username = username + "....";
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
                    </div>
                    <div className="card-content">
                        <div className="card-title">
                            <div className="w-70"><h5 className="card-title fs-16">{name}</h5></div>
                            <div className="card-action">
                                <a href="#/" onClick={(event) => props.deleteModalTriggerClick(event)}>
                                    <i id={encrypt_id} data-title={`${name}`} title="delete" className="fa-solid fa-trash fs-20 light-red"></i>
                                </a>
                                <Link to={`/${addLink}/edit/${element.encrypt_id}`}>
                                    <i title="Edit" className="fa-solid fa-pencil fs-20 ps-2 light-green"></i>
                                </Link>
                                <a href="#/" onClick={(event) => props.viewModalTriggerClick(event)}>
                                    <i id={encrypt_id} title="View" className="fa-solid fa-eye fs-20 ps-2 jewell-color"></i>
                                </a>
                            </div>
                        </div>

                        <h6 className="fs-12">Code: {element.code}</h6>

                        {card}


                        {(username) ?
                            <div className='d-flex justify-content-between'>

                                <div className="fs-10 grey maxw-60">
                                    {(username) ? <>Username: <br /> <span className='fs-14 theme-red'> {username}</span></> : ""}

                                </div>
                                <div className="maxw-40  mob-m-t-1">
                                    <div className='fs-8 pb-1'>Created At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                                    <div className='fs-8'>Updated At: <span className="created_at" title="Created Date">{element.updated_at}</span></div>
                                </div>
                            </div>
                            :
                            <div className='d-flex justify-content-end'>

                                <div className="mob-maxw-80 mob-m-t-1">
                                    <div className='fs-8 pb-1'>Created At: <span className="created_at" title="Created Date"> {element.created_at}</span></div>
                                    <div className='fs-8'>Updated At: <span className="created_at" title="Created Date">{element.updated_at}</span></div>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="ribbon-wrapper">
                        <div className={`ribbon-green ${status.toLowerCase()}`}>{status}</div>
                    </div>
                </div>
            </div >
        </>
    )

})
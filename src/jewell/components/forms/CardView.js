import React from 'react';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import CustomerCard from '../../pages/customer/CardView';
import WorkerCard from '../../pages/worker/CardView';
import CategoryCard from '../../pages/category/CardView';
import AdminCard from '../../pages/admin/CardView';
import ItemCard from '../../pages/product/Card';
import { Link } from 'react-router-dom';


export const CardView = React.forwardRef((props, ref) => {
    var element = props.element;
    var addLink = props.addLink;
    var encrypt_id = element.encrypt_id;

    var title = props.title;
    let status = (element.status == 1) ? "Active" : "Deactive"
    let profileImage = maleLogo;
    let genderImage = maleLogo;

    if (element.gender == "female") {
        profileImage = femaleLogo;
        genderImage = femaleLogo;
    }
    let card = <CustomerCard element={element} />;
    let name = (element.first_name) ? element.first_name : "" + " " + (element.last_name) ? element.last_name : ""
    if (addLink == "customer") {
        if (element.profile_image.length > 0 && element.profile_image[0].url != "") {
            profileImage = element.profile_image[0].url;
        }
    }

    if (addLink == "admin") {
        if (element.profile_image.length > 0 && element.profile_image[0].url != "") {
            profileImage = element.profile_image[0].url;
        }
        card = <AdminCard element={element} />;
    }

    if (addLink == "worker") {
        if (element.profile_image.length > 0 && element.profile_image[0].url != "") {
            profileImage = element.profile_image[0].url;
        }
        card = <WorkerCard element={element} />;
    }
    if (addLink == "category") {
        if (element.category_image.length > 0 && element.category_image[0].url != "") {
            profileImage = element.category_image[0].url;
        }
        card = <CategoryCard element={element} />;
        name = element.name
    }

    if (addLink == "product") {
        if (element.item_image.url != "") {
            profileImage = element.item_image.url;
        }
        card = <ItemCard element={element} />;
        name = element.name
    }

    name = (name) ? name : "";
    let code = (element.code) ? element.code : "";

    let username = (element.username != null) ? element.username.substring(0, 10) : ""

    if (element.username != null && element.username.length > 10) {
        username = username + "....";
    }

    return (
        <>
            <div className="card-body d-flex">
                <div className="card-image">
                    <div className="col-sm mt-2 mb-2 img-container">
                        <img className="border-radius-50 view-profile-image" src={profileImage} alt={`${element.listLink} image cap`} />
                        <a href={profileImage} target='_blank'>
                            <i className="view-btn fa-solid fa-eye" /></a>

                    </div>
                    <div className="ribbon-wrapper position-relative">
                        <div className={`ribbon-green ${status.toLowerCase()}`}>{status}</div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className="card-title fs-20">
                                <img className="border-radius-50 gender-profile-image me-2" src={genderImage} alt="Card image cap" />
                                {(name)?name:""}
                            </h5>
                        </div>
                    </div>

                    <h6 className="fs-12 grey pb-1">Code: {(code)?code:""}</h6>

                    {card}


                </div>
            </div>
        </>
    )

})
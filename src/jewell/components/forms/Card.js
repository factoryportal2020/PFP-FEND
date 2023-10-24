import React from 'react';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import CustomerCard from '../../pages/customer/Card';


export const Card = React.forwardRef((props, ref) => {
    var element = props.element;
    var addLink = props.addLink;
    var encrypt_id = element.encrypt_id;

    var title = props.title;
    let status = (element.status == 1) ? "Active" : "Deactive"
    let profileImage = maleLogo;

    if (element.gender == "female") {
        profileImage = femaleLogo;
    }
    if (element.profile_image.url != "") {
        profileImage = element.profile_image.url;
    }

    let username = (element.username != null) ? element.username.substring(0, 10) : ""

    if (element.username != null && element.username.length > 10) {
        username = username + "....";
    }

    return (
        <>
            <div className="card" >
                <div className="card-body d-flex">
                    <div className="card-image">
                        <div className="col-sm mt-2 mb-2 img-container">

                            <img className="border-radius-50 card-profile-image" src={profileImage} alt="Card image cap" />
                            <a href={profileImage} target='_blank'>
                                <i className="preview-btn fa-solid fa-eye" /></a>
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="d-flex justify-content-between">
                            <div><h5 className="card-title fs-14">{element.first_name} {element.last_name}</h5></div>
                            <div className="ms-2">
                                <a href="#/" onClick={(event) => props.deleteModalTriggerClick(event)}><i id={encrypt_id} data-title={`${element.first_name} ${element.last_name}`} title="delete" className="fa-solid fa-trash fs-20 light-red"></i></a>
                                <a href={`/${addLink}/edit/${element.encrypt_id}`}><i title="Edit" className="fa-solid fa-pencil fs-20 ps-2 jewell-color"></i></a>
                                <a href="#/" onClick={(event) => props.viewModalTriggerClick(event)}><i id={encrypt_id} title="View" className="fa-solid fa-eye fs-20 ps-2 jewell-color"></i></a>
                            </div>
                        </div>

                        <h6 className="fs-10">Code: {element.code}</h6>
                        <CustomerCard element={element} />
                        <div className='d-flex justify-content-between'>
                            <div className="fs-14 maxw-60">
                                {(username) ? <span className='fs-10 grey'>Username: </span> : ""}
                                {username}
                            </div>
                            <div className="maxw-40">
                                <span className="created_at" title="Created Date">{element.created_at}</span>
                            </div>
                        </div>
                    </div>
                    <div className="ribbon-wrapper">

                        <div className={`ribbon-green ${status.toLowerCase()}`}>{status}</div>
                    </div>
                </div>
            </div >
        </>
    )

})
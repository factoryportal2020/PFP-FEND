import React from 'react';
import profileLogo from "../../theme/images/profile/6.jpg";
import CustomerCard from '../../pages/customer/Card';


export const Card = React.forwardRef((props, ref) => {
    var element = props.element;
    var title = props.title;
    return (
        <>
            <div className="card" >
                <div className="card-body d-flex">
                    <div className="card-image">
                        <img className="border-radius-50" src={profileLogo} alt="Card image cap" />
                    </div>
                    <div className="card-content">
                        <div className="d-flex justify-content-between">
                            <div><h5 className="card-title fs-14">{element.first_name} {element.last_name}</h5></div>
                            <div className="ms-2">
                                <a href="#/"><i title="delete" className="fa-solid fa-trash fs-20 light-red"></i></a>
                                <a href="#/"><i title="Edit" className="fa-solid fa-pencil fs-20 ps-2 jewell-color"></i></a>
                                <a href="#/"><i title="View" className="fa-solid fa-eye fs-20 ps-2 jewell-color"></i></a>
                            </div>
                        </div>
                        <h6 className="fs-10">Code: {element.code}</h6>
                        <CustomerCard element={element} />
                        <div className="d-flex justify-content-end">
                            <span className="created_at" title="Created Date">{element.created_at}</span>
                        </div>
                    </div>
                    <div className="ribbon-wrapper">
                        <div className="ribbon-green alert-danger">Dective</div>
                    </div>
                </div>
            </div>
        </>
    )

})
import React from 'react';
import profileLogo from "../../theme/images/profile/6.jpg";



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
                                <a href="#/"><i alt="View" className="fa-solid fa-eye fs-18 jewell-color"></i></a>
                                <a href="#/"><i alt="Edit" className="fa-solid fa-pencil fs-18 ps-2 jewell-color"></i></a>
                            </div>
                        </div>
                        <h6 className="fs-10">Code: {element.code}</h6>
                    </div>
                </div>
            </div>
        </>
    )

})
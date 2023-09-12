import React from 'react';

const Card = React.forwardRef((props, ref) => {
    var element = props.element;
    return (
        <>
            
            <h6 className="fs-12"><i title="Email" className="fa-solid fa-envelope fs-16 ps-2 jewell-color"></i> {element.email}</h6>
            <h6 className="fs-12"><i title="Phone" className="fa-solid fa-mobile fs-16 ps-2 jewell-color"></i> {element.phone_no}</h6>
            <h6 className="fs-12"><i title="City" className="fa-solid fa-globe fs-16 ps-2 jewell-color"></i> {element.city}</h6>
            <h6 className="fs-12"><i title="Whatsapp" className="fa-solid fa-whatsapp fs-16 ps-2 jewell-color"></i> {element.whatsapp_no}</h6>

        </>
    )
})

export default Card;
import React from 'react';

const Card = React.forwardRef((props, ref) => {
    var element = props.element;

    var whatsapp_no = (element.whatsapp_no)?element.whatsapp_no:"-";

    return (
        <>

            <h6 className="fs-12"><i title="Email" className="fa-solid fa-envelope fs-18 ps-2 light-orange wd-30"></i>&nbsp;{element.email}</h6>
            <h6 className="fs-12"><i title="Phone" className="fa-solid fa-mobile fs-18 ps-2 pink wd-30"></i>&nbsp;{element.phone_no}</h6>
            <h6 className="fs-12"><i title="Whatsapp" className="fa-solid fab fa-whatsapp fs-18 ps-2 light-green wd-30"></i>&nbsp;{whatsapp_no}</h6>
            <h6 className="fs-12"><i title="City" className="fa-solid fa-globe fs-18 ps-2 color4 wd-30"></i>&nbsp;{element.city}</h6>

        </>
    )
})

export default Card;
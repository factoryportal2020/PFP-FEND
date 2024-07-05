import React from 'react';

const CardView = React.forwardRef((props, ref) => {
    var element = props.element;

    var whatsapp_no = (element.whatsapp_no) ? element.whatsapp_no : "-";
    var instagram_id = (element.instagram_id) ? '@' + element.instagram_id : "-";

    return (
        <>
            <h6 className="fs-12 green mt-0">{element.specialist}&nbsp;Specialist</h6>
            
            <h6 className="fs-12"><i title="Email" className="fa-solid fa-envelope fs-18 ps-2 me-2 light-orange wd-30"></i>{element.email}</h6>
            <h6 className="fs-12"><i title="Phone" className="fa-solid fa-mobile fs-18 ps-2 me-2 pink wd-30"></i>&nbsp;{element.phone_no}</h6>
            <h6 className="fs-12"><i title="Whatsapp" className="fa-solid fab fa-whatsapp fs-18 ps-2 me-2 light-green wd-30"></i>&nbsp;{whatsapp_no}</h6>
            <h6 className="fs-12"><i title="Instagram" className="fa-solid fab fa-instagram fs-18 ps-2 me-2 purple wd-30"></i>&nbsp;{instagram_id}</h6>
            <div className="d-flex">
                <div><i title="Address" className="fa-solid fa-globe fs-18 ps-2 me-1 light-blue wd-30"></i></div>
                <div className="ps-1 fs-12 fw-normal">{element.address},<br />
                    {element.city},&nbsp;{element.state}</div>
            </div>
            <div className="d-flex pt-2">
                <div><i title="Notes" className="fa-solid fa-sticky-note fs-18 ps-2 me-1 grey wd-30"></i></div>
                <div className="ps-1 fs-12 fw-normal">{element.notes}</div>
            </div>
        </>
    )
})

export default CardView;
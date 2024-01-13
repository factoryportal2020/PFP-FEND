import React from 'react';

const CardView = React.forwardRef((props, ref) => {
    var element = props.element;
    return (
        <>
            <div className="d-flex pt-2">
                <div><i title="Notes" className="fa-solid fa-sticky-note fs-20 ps-2 me-1 grey wd-30"></i></div>
                <div className="ps-1 fs-16">{element.description}</div>
            </div>
        </>
    )
})

export default CardView;
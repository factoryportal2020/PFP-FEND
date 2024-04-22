import React from 'react';

const Card = React.forwardRef((props, ref) => {
    var element = props.element;

    
    return (
        <>
            <h6 className="fs-12 pb-1">{element.sub_title}</h6>
            <h6 className="fs-10 pb-1">{element.description}</h6>
            <span className="fs-12 fw-normal">Showing in Website:&nbsp;&nbsp;</span>
            {(element.is_show) ?
                <i className="light-green fs-14 fa-solid fa-check-circle" />
                : <i className="light-red fs-14 fa-solid fa-times-circle" />}
            {/* <button type="button"
                className={`btn btn-light jewell-bg-color fs-10 ${is_showClass}`}>{is_show}&nbsp;&nbsp;
            </button> */}

        </>
    )
})

export default Card;
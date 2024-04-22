import React from 'react';

const Card = React.forwardRef((props, ref) => {
    var element = props.element;

    var count = 80;
    var description = element.description;
    description = (element.description)?description.slice(0, count) + (description.length > count ? "..." : ""):"";

    return (
        <>
            <h5 className="fs-16">Category:&nbsp;{element.category_name}</h5>
            <h6 className="fs-14 pb-1">{description}</h6>
            <span className="fs-12 fw-normal">Showing in Website:&nbsp;&nbsp;</span>
            {(element.is_show) ?
                <i className="light-green fs-14 fa-solid fa-check-circle" />
                : <i className="light-red fs-14 fa-solid fa-times-circle" />}
        </>
    )
})

export default Card;
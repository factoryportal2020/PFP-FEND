import React from 'react';

const Card = React.forwardRef((props, ref) => {
    var element = props.element;

    var count = 80;
    var description = element.description;
    description = (element.description)?description.slice(0, count) + (description.length > count ? "..." : ""):"";

    return (
        <>
            <h5 className="fs-16">Category:&nbsp;{element.category_name}</h5>
            <h6 className="fs-14 pb-4">{description}</h6>
        </>
    )
})

export default Card;
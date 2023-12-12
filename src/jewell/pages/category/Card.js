import React from 'react';

const Card = React.forwardRef((props, ref) => {
    var element = props.element;

    return (
        <>
            <h6 className="fs-14 pb-4">{element.description}</h6>
        </>
    )
})

export default Card;
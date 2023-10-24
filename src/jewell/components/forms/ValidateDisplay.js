import React from 'react';
import validator from './validate';


export const ValidateDisplay = React.forwardRef((props, ref) => {
    let state = props.state;
    let new_element = props.new_element;
    let fieldName = props.fieldName;
    // console.log(new_element);

    // (new_element.validate) ? 
    if (!new_element.validate) { return ""; }

    return (
        <>
            {new_element.validateOptions.map((option, j) => {
                let hasErrName = validator.hasErrorNaming(fieldName, option.rule);
                return (
                    // <><div>{hasErrName}</div></>
                    (state.states.validations[hasErrName] && (state.states.validate)) ?
                        <><span key={j} className="error" >{option.msg}</span> <br /></>
                        : ""
                )
            })}
        </>
    )

    // : ""
})

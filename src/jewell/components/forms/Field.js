import React from "react";
import validator from "./validate";
import { Input } from "./Input";

export const Field = React.forwardRef((props, ref) => {
    var state = props.state;
    var tab = props.tab;
    return (
        state.entities.map((element, i) => {
            var tabShow = "hide";
            if (element.tab && tab.id == element.tab) {
                tabShow = "";
            }
            if (tabShow == "hide") {
                return;
            }
            let new_element = { ...element }
            let fieldName = `${element.name}`
            new_element.value = state.states.params[fieldName]
            if (element.type == "file") {
                if (element.fileType == "image") {
                    new_element.images = state.states.params[fieldName]
                } else {
                    new_element.files = state.states.params[fieldName]
                }
            }
            return (
                <>
                    <div className={`${new_element.colClass} ${tabShow}`}>
                        <Input key={i} element={new_element}
                            // ref={ref}
                            onChange={(newValue) => { props.onChange(newValue, fieldName, new_element) }}
                            onClick={(e) => { props.onClick(e, fieldName, new_element) }}
                        ></Input>
                        {
                            (new_element.validate) ?
                                new_element.validateOptions.map((option, j) => {
                                    let hasErrName = validator.hasErrorNaming(fieldName, option.rule);
                                    return (
                                        // <><div>{hasErrName}</div></>
                                        (state.states.validations[hasErrName] && (state.states.validate)) ?
                                            <><span key={j} className="error" >{option.msg}</span> <br /></> : ""
                                    )
                                })
                                : ""
                        }
                    </div>
                </>
            )

        })
    )
})

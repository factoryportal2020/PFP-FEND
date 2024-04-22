import React from "react";
import validator from "./validate";
import { InputElement } from "./InputElement";
import { ValidateDisplay } from "./ValidateDisplay";

export const Field = React.forwardRef((props, ref) => {
    var state = props.state;
    var tab = props.tab;
    var isFile = props.isFile;
    var isFileCheckbox = props.isFileCheckbox;
    return (
        state.entities.map((element, i) => {
            var tabShow = "hide";
            if (tab.length != 0) {
                if (element.tab && tab.id == element.tab) {
                    tabShow = "";
                }
            } else {
                tabShow = "show";
            }

            if (tabShow == "hide") {
                return;
            }
            let new_element = { ...element }
            let fieldName = `${element.name}`
            new_element.value = state.states.params[fieldName]

            if (element.type == "file") {
                if (!isFile) { return; }
                if (element.fileType == "image") {
                    new_element.images = state.states.params[fieldName]
                } else {
                    new_element.files = state.states.params[fieldName]
                }
            }

            if (element.type == "fileCheckbox") {
                if (!isFileCheckbox) { return; }
                if (element.fileType == "image") {
                    new_element.images = state.states.params[fieldName]
                } else {
                    new_element.files = state.states.params[fieldName]
                }
            }


            if (isFile && (element.type != "file")) { return; }
            if (isFileCheckbox && (element.type != "fileCheckbox")) { return; }

            return (
                <>
                    <div className={`${new_element.colClass} ${tabShow}`}>
                        <InputElement key={i} element={new_element}
                            onChange={(newValue) => { props.onChange(newValue, fieldName, new_element) }}
                            onClick={(e) => { props.onClick(e, fieldName, new_element) }}
                            onSelectImage={(e) => { props.onSelectImage(e, fieldName, new_element) }}
                        />
                        <ValidateDisplay state={state} new_element={new_element} fieldName={fieldName} />
                    </div>
                </>
            )

        })
    )
})

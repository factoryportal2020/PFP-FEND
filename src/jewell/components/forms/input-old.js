import { Textbox, Select } from "react-inputs-validation";

export const TextInput = (props) => {
    return (
        <div className={props.colClass}>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <Textbox
                attributesInput={{
                    name: props.name,
                    type: props.type,
                    placeholder: props.placeholder,
                    className: 'form-control input-rounded'
                }}
                onChange={(newValue) => { console.log(newValue) }}
                onBlur={e => { console.log(e) }}
                disabled={props.readonly}
                validate={props.validate}
                value={props.value}
                validationOption={{ name: props.name, required: props.required, reg: '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' }}
                validationCallback={res => { console.log(res) }}
            />
        </div>
    )
}


export const SelectInput = (props) => {
}

export const CheckBoxInput = (props) => {
}

export const TextAreaInput = (props) => {
}




export const Input = (props) => {
    let name = props.element.name;
    let type = props.element.type;
    let colClass = (props.element.colClass) ? props.element.colClass : "col-md-6";
    let className = props.element.className;
    let label = props.element.label;
    let htmlFor = props.element.htmlFor;
    let value = (props.element.value) ? props.element.value : "";
    let placeholder = (props.element.placeholder) ? props.element.placeholder : "";

    let readonly = (props.element.readonly) ? props.element.readonly : false;
    let validate = (props.element.validate) ? props.element.validate : false;
    let required = (props.element.required) ? props.element.required : false;
    let email = (props.element.email) ? props.element.email : false;

    let element = { type, name, colClass, className, label, htmlFor, value, placeholder, readonly, validate, required, email };
    switch (type) {
        case "text": return <TextInput {...element} />;
        case "number": return <TextInput {...element} />;
        case "email": return <TextInput {...element} />;
        default: return <TextInput {...element} />
    }
}



<div className={props.colClass}>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <input type="number" className="form-control" id={props.htmlFor} value={props.value} />
        </div>
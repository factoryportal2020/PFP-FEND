import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import excelImage from "../../theme/images/file-images/excel.png";
import pdfImage from "../../theme/images/file-images/pdf.png";
import fileImage from "../../theme/images/file-images/file.png";
import docImage from "../../theme/images/file-images/doc.png";
import csvImage from "../../theme/images/file-images/csv.png";
const isFile = input => 'File' in window && input instanceof File;

export const TextInput = (props) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <input type={props.type} className="form-control" id={props.htmlFor} value={props.value} placeholder={props.placeholder}
                onChange={(e) => { props.onChange(e.target.value) }}
                onBlur={(e) => { props.onChange(e.target.value) }} />
        </>
    )
}


export const SelectInput = (props) => {

    function findDefaultValue(needle, haystack) {
        var found = 0;
        for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i].value == needle) return haystack[i];
            found++;
        }
        return "";
    }
    let defaultValue = findDefaultValue(props.value, props.options);
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <Select
                name={props.name}
                defaultValue={defaultValue}
                options={props.options}
                onChange={(e) => { props.onChange(e.value) }}
            />
        </>
    )
}

export const CheckBoxInput = (props) => {

    function in_array(needle, haystack) {
        var found = 0;
        for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i] == needle) return i;
            found++;
        }
        return -1;
    }
    // console.log(props);
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <br />
            {/* <div className='d-inline-block'> */}
            {props.options.map((option, j) => {
                let checked = (in_array(option.value, props.value) != -1) ? true : false;
                return (
                    <>
                        <div className="d-inline-block" key={j}>
                            <input className="form-check-input" type="checkbox" defaultChecked={checked} value={option.value} id={option.label}
                                onChange={(e) => { props.onChange(e.target) }} />&nbsp;
                            <label className="form-check-label grey" htmlFor={option.label}>
                                {option.label}
                            </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </>
                )
            })}
            <br />

            {/* </div> */}
        </>
    )
}


export const RadioInput = (props) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <br />
            <>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">

                    <label className={"btn " + (props.value == 1 ? "btn-success active" : "btn-light")}>
                        <input
                            onChange={(e) => { props.onChange(e.target.value) }}
                            type="radio" name={props.name} value={props.options[0].value} id={props.options[0].label} autoComplete="off" checked={(props.value == 1) ? "checked" : ""} /> {props.options[0].label}
                    </label>
                    <label className={"btn " + (props.value == 0 ? "btn-success active" : "btn-light")}>
                        <input
                            onChange={(e) => { props.onChange(e.target.value) }}
                            type="radio" name={props.name} value={props.options[1].value} id={props.options[1].label} autoComplete="off" checked={(props.value == 0) ? "checked" : ""} /> {props.options[1].label}
                    </label>



                </div>

            </>
        </>
    )
}

export const TextAreaInput = (props) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <textarea className="form-control" id={props.htmlFor} value={props.value} placeholder={props.placeholder}
                onChange={(e) => { props.onChange(e.target.value) }}
                onBlur={(e) => { props.onChange(e.target.value) }} />
        </>
    )

}

export const DateTimeInput = (props) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <br />
            <DateTimePicker
                className="form-control w-70"
                format={"dd MMM yyyy HH:mm"}
                onChange={(date) => { props.onChange(date) }}
                value={props.value}
                clearIcon={null} />
        </>
    )

}



export const FileInput = React.forwardRef((props, ref) => {
    // console.log(props);
    let images = props.images;
    let files = props.files;
    let datas = (images.length > 0) ? images : files;
    let accept = ".gif,.jpg,.jpeg,.png";
    let iconimage = fileImage;
    let fileType = props.fileType;

    if (fileType == "image") {
    }
    else if (fileType == "csv") {
        accept = ".csv";
        iconimage = csvImage;
    }
    else if (fileType == "excel") {
        accept = ".xlsx,.xls";
        iconimage = excelImage;
    }
    else if (fileType == "doc") {
        accept = ".doc,.docx";
        iconimage = docImage;
    }
    else if (fileType == "pdf") {
        accept = ".pdf";
        iconimage = pdfImage;
    }
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}
                <span className='fs-6 light-green ps-1'>{(datas.length > 0) ? datas.length + " uploaded" : ""} </span>
            </label>
            <br />
            <div className="input-group mb-0">
                <input type="file" className="form-control" id={props.htmlFor}
                    multiple={props.multiple}
                    value=""
                    accept={accept}
                    onChange={(e) => { props.onChange(e) }}
                />
            </div>

            {(datas.length > 0) ?
                <div className="row">
                    {datas.map((data, j) => {
                        if (isFile(data.file)) {
                            iconimage = (fileType == "image") ? URL.createObjectURL(data.file) : iconimage;
                            return (
                                <>
                                    <div className="col-lg-3 col-6 mt-3 mb-3 img-container">
                                        <img
                                            src={iconimage}
                                            className="img-file shadow-1-strong rounded"
                                            alt={data.name}
                                        />
                                        <a href={URL.createObjectURL(data.file)} target='_blank'>
                                            <i className="preview-btn fa-solid fa-eye" /></a>
                                        <button type="button"
                                            id={j}
                                            className="delete-btn"
                                            onClick={(e) => { props.onClick(e) }}>Delete</button>
                                        <br></br>
                                        <span className='fs-8 text-left grey'>{data.name}</span>
                                    </div>
                                </>
                            )
                        }
                    })
                    }
                </div>
                : ""
            }
        </>
    )
})


export const Input = React.forwardRef((props, ref) => {
    let name = props.element.name;
    let type = props.element.type;
    let colClass = (props.element.colClass) ? props.element.colClass : "col-md-6";
    let className = props.element.className;
    let label = props.element.label;
    let htmlFor = props.element.htmlFor;
    let value = (props.element.value) ? props.element.value : "";
    let placeholder = (props.element.placeholder) ? props.element.placeholder : "";
    let options = (props.element.options) ? props.element.options : [];

    let readonly = (props.element.readonly) ? props.element.readonly : false;
    let validate = (props.element.validate) ? props.element.validate : false;
    let required = (props.element.required) ? props.element.required : false;
    let email = (props.element.email) ? props.element.email : false;
    let fileType = (props.element.fileType) ? props.element.fileType : "image";

    let element = { type, name, colClass, className, label, htmlFor, value, placeholder, readonly, validate, required, email, options, fileType };
    switch (type) {
        case "select": return <SelectInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "checkbox": return <CheckBoxInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "radio": return <RadioInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "textarea": return <TextAreaInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "datetime": return <DateTimeInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "file":
            let images = (props.element.images) ? props.element.images : [];
            let files = (props.element.files) ? props.element.files : [];
            let multiple = (props.element.multiple) ? props.element.multiple : "";
            element = { ...element }
            element.images = images
            element.files = files
            element.multiple = multiple
            return <FileInput {...element}
                onChange={(e) => { props.onChange(e) }}
                onClick={(e) => { props.onClick(e) }}
                onBlur={(e) => { props.onChange(e) }} ref={ref} />;
        case "div": return "";
        default: return <TextInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />
    }
})



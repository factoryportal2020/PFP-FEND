import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import excelImage from "../../theme/images/file-images/excel.png";
import pdfImage from "../../theme/images/file-images/pdf.png";
import fileImage from "../../theme/images/file-images/file.png";
import imgImage from "../../theme/images/file-images/img.png";
import docImage from "../../theme/images/file-images/doc.png";
import csvImage from "../../theme/images/file-images/csv.png";
import multipleImage from "../../theme/images/file-images/muliple_image.png";
import { Editor } from '@tinymce/tinymce-react';

const isFile = input => 'File' in window && input instanceof File;

const TINYMCE_API_KEY = (process.env.REACT_APP_TINYMCE)

export const TextInput = (props) => {
    // let cursor = "";
    return (
        <>
            {(props.label != "") ?
                <label htmlFor={props.htmlFor} className="form-label">{props.label}</label> : ""
            }
            <input type={props.type}
                className={`form-control ${props.className}`} id={props.htmlFor} value={props.value} placeholder={props.placeholder}
                readOnly={props.readonly}
                onChange={(e) => {

                    props.onChange(e.target.value)
                }}
                onBlur={(e) => { }}
            />
        </>
    )
}

export const TinyInput = (props) => {
    // let cursor = "";
    return (
        <>
            {(props.label != "") ?
                <label htmlFor={props.htmlFor} className="form-label">{props.label}</label> : ""
            }
            <Editor
                apiKey={TINYMCE_API_KEY}
                // apiKey='rz0pw1oj4964nwqugfduv8zn0l345agbs3z36xcz8kvei4t4'
                value={props.value}
                init={{
                    height: 500,
                    menubar: false,
                }}
                onEditorChange={(e) => {

                    props.onChange(e)
                }}
            />

            {/* <Editor
                apiKey="your-api-key"
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            /> */}


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
    // console.log("defaultValue");
    // console.log(defaultValue);
    return (
        <>
            {(props.label != "") ?
                <label htmlFor={props.htmlFor} className="form-label">{props.label}</label> : ""
            }
            <Select
                name={props.name}
                // defaultValue={defaultValue}
                value={defaultValue}
                options={props.options}
                onChange={(e) => { props.onChange(e.value) }}
                className={`${props.className}`}
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

export const ButtonInput = (props) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">&nbsp;</label>
            <button type="button"
                id={props.htmlFor}
                disabled={props.disabled}
                className={`form-control ${props.className}`}
                onChange={(e) => { props.onChange(e.target.value) }}
                onClick={(e) => { props.onClick(e.target.value) }}
                onBlur={(e) => { props.onChange(e.target.value) }} >{props.label}</button>
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

export const RequiredSpan = (props) => {
    return (
        <>
            {props.label}&nbsp;<span className='red'>*</span>
        </>
    )

}


export const FileInput = React.forwardRef((props, ref) => {
    // console.log(props);
    let images = props.images;
    let files = props.files;
    let datas = (images.length > 0) ? images : files;
    // console.log(datas);

    let imgClassName = "img-file shadow-1-strong rounded";

    imgClassName = (props.className != "") ? props.className : imgClassName;

    let eyeBtnClassname = "preview-btn"

    eyeBtnClassname = (imgClassName == "medium-file" || imgClassName == "banner-file") ? "banner-btn" : "preview-btn";

    let deleteBtnClassname = "delete-btn"

    deleteBtnClassname = (imgClassName == "medium-file" || imgClassName == "banner-file") ? "banner-de" : "delete-btn";

    let accept = ".gif,.jpg,.jpeg,.png";
    let iconimage = fileImage;
    let fileType = props.fileType;

    if (fileType == "image") {
        // accept = ".csv";
        iconimage = imgImage;
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


            {(datas.length > 0) ?
                <div className="row">
                    {datas.map((file, j) => {
                        let ahref = "";
                        if (isFile(file)) {
                            iconimage = (fileType == "image") ? URL.createObjectURL(file) : iconimage;
                            ahref = URL.createObjectURL(file);
                        } else {
                            iconimage = ahref = (fileType == "image") ? file.url : iconimage;
                            j = file.id;
                        }
                        return (
                            <>
                                {/* <div className="col-lg-3 col-6 mt-3 mb-3 img-container"> */}
                                <div key={`image${j}`} className="col-sm mt-2 mb-4 img-container">
                                    <img
                                        src={iconimage}
                                        className={imgClassName}
                                        alt={file.name}
                                    />
                                    <a href={ahref} target='_blank'>
                                        <i className={`${eyeBtnClassname} fa-solid fa-eye`} /></a>
                                    <button type="button"
                                        id={j}
                                        className="delete-btn"
                                        onClick={(e) => { props.onClick(e) }}>Delete</button>
                                    <br></br>
                                    <span className='fs-8 text-left grey'>{file.name}</span>
                                </div>
                            </>
                        )
                    })
                    }
                </div>
                :
                (props.multiple == "") ?
                    <>
                        <label className={`${imgClassName} col-sm mt-2 img-drop-container`} for={props.htmlFor}>
                            <img src={iconimage} className="empty-img" />
                        </label>
                        <br />
                        <span className='fs-8 text-left grey'>&nbsp;</span>
                    </> :
                    <>
                        <label className={`${imgClassName} col-sm mt-2 img-drop-container`} for={props.htmlFor}>
                            <img src={multipleImage} className="empty-img" />
                        </label>
                        <br />
                        <span className='fs-8 text-left grey'>&nbsp;</span>
                    </>
            }

            <input type="file" className="form-control" id={props.htmlFor}
                multiple={props.multiple}
                value=""
                accept={accept}
                onChange={(e) => { props.onChange(e) }}
            />

{/* <hr></hr> */}
        </>
    )
})


export const InputElement = React.forwardRef((props, ref) => {
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

    let validateOptions = props.element.validateOptions;
    if (validate && label != "") {
        label = (validateOptions[0].rule === "required") ? <RequiredSpan label={label} /> : label;
    }

    let element = { type, name, colClass, className, label, htmlFor, value, placeholder, readonly, validate, required, email, options, fileType };
    switch (type) {
        case "select": return <SelectInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "checkbox": return <CheckBoxInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "radio": return <RadioInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "textarea": return <TextAreaInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "datetime": return <DateTimeInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "button": return <ButtonInput {...element} onClick={(e) => { props.onClick(e) }} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />
        case "tinyMCE": return <TinyInput {...element} onClick={(e) => { props.onClick(e) }} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />
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



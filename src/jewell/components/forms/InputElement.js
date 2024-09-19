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
                <label htmlFor={props.htmlFor} className="form-label">{props.label} {(props.name == "price") ? "(Rupees ₹)" : ""}</label> : ""
            }

            <input type={props.type}
                className={`${(!props.noFormcontrolCls ? "form-control" : "")} ${props.className}`}
                id={props.htmlFor} value={props.value} placeholder={props.placeholder}
                readOnly={props.readonly}
                pattern={`${(props.pattern) ? (props.pattern) : ""}`}
                maxLength={props.maxLength}
                onChange={(e) => {

                    props.onChange(e.target.value)
                }}
                onBlur={(e) => { }}
            />
            {(props.iconImgCls && props.iconImg) ? <img className={props.iconImgCls} src={props.iconImg} alt="ICON" /> : ""}

            {(props.noFormcontrolCls) ? <div className="focus-input1 trans-04"></div> : ""}
        </>
    )
}

export const TinyInput = (props) => {
    // let cursor = "";
    const sizeLimit = 1500;
    const [value, setValue] = React.useState((props.value) ? props.value : '');
    const [length, setLength] = React.useState(0);

    const handleInit = (evt, editor) => {
        setLength(editor.getContent({ format: 'text' }).length);
    };

    const handleUpdate = (value, editor) => {
        const length = editor.getContent({ format: 'text' }).length;
        if (length <= sizeLimit) {
            setValue(value);
            setLength(length);
            props.onChange(value);
        }
    };

    const handleBeforeAddUndo = (evt, editor) => {
        const length = editor.getContent({ format: 'text' }).length;
        // note that this is the opposite test as in handleUpdate
        // because we are determining when to deny adding an undo level
        if (length > sizeLimit) {
            evt.preventDefault();
        }
    };


    return (
        <>
            {(props.label != "") ?
                <label htmlFor={props.htmlFor} className="form-label">{props.label}</label> : ""
            }
            <Editor
                apiKey={TINYMCE_API_KEY}
                // apiKey='rz0pw1oj4964nwqugfduv8zn0l345agbs3z36xcz8kvei4t4'
                value={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'wordcount'
                    ],
                }}
                onInit={handleInit}
                onEditorChange={handleUpdate}
                onBeforeAddUndo={handleBeforeAddUndo}

            // onEditorChange={(e) => {
            //     handleUpdate
            // }}
            />
            <p>Remaining: {sizeLimit - length}</p>

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

                    <label className={"btn " + (props.value == 1 ? "btn-success active " : "btn-light theme-bg-brown theme-bodrer-brown")}>
                        <input
                            onChange={(e) => { props.onChange(e.target.value) }}
                            type="radio" name={props.name} value={props.options[0].value} id={props.options[0].label} autoComplete="off" checked={(props.value == 1) ? "checked" : ""} /> {props.options[0].label}
                    </label>
                    <label className={"btn " + (props.value == 0 ? "btn-success active" : "btn-light theme-bg-brown theme-bodrer-brown")}>
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
            <textarea
                className={`${(!props.noFormcontrolCls ? "form-control" : "")} ${props.className}`}
                id={props.htmlFor} value={props.value}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
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
                className={` ${props.className}`}
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

export const DateInput = (props) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
            <br />
            <DateTimePicker
                className="form-control w-70"
                format={"dd MMM yyyy"}
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
    // const [selectedImage, setSelectedImage] = 

    let imgClassName = "img-file shadow-1-strong rounded";

    imgClassName = (props.className != "") ? props.className : imgClassName;

    imgClassName = (props.filecheckbox) ? imgClassName + " pointer" : imgClassName;

    let eyeBtnClassname = "preview-btn"

    eyeBtnClassname = (imgClassName == "banner-file") ? "banner-btn" : "preview-btn";
    eyeBtnClassname = (imgClassName == "medium-file") ? "feature-btn" : eyeBtnClassname;

    let deleteBtnClassname = "delete-btn"

    deleteBtnClassname = (imgClassName == "banner-file") ? "banner-delete-btn" : "delete-btn";
    deleteBtnClassname = (imgClassName == "medium-file") ? "feature-delete-btn" : deleteBtnClassname;

    let selectBtnClassname = "select-btn";

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
            {(!props.filecheckbox) ?
                <>
                    <label htmlFor={props.htmlFor} className="form-label">{props.label}
                        <span className='fs-6 light-green ps-1'>{(datas.length > 0) ? datas.length + " uploaded" : ""} </span>
                    </label>
                </> : <h6 className='theme-red mt-4'>Choose {props.tab} Image from App</h6>}


            {(datas.length > 0) ?
                <div className="row img-container-row">
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
                                <div key={`image${j}`} className="col mt-1 mb-2 img-container">
                                    {(!props.filecheckbox) ?
                                        <>
                                            <img
                                                src={iconimage}
                                                className={imgClassName}
                                                alt={file.name}
                                            />
                                            <a href={ahref} target='_blank'>
                                                <i className={`${eyeBtnClassname} fa-solid fa-eye`} />
                                            </a>
                                            <button type="button"
                                                id={j}
                                                className={`${deleteBtnClassname}`}
                                                onClick={(e) => { props.onClick(e) }}>Delete</button>

                                        </> :
                                        <>
                                            <img
                                                data-url={file.url}
                                                data-id={file.id}
                                                data-name={file.name}
                                                data-public_url={file.public_url}
                                                src={iconimage}
                                                className={`${imgClassName}  pb-3"`}
                                                alt={file.name}
                                                onClick={(e) => { props.onSelectImage(e) }}
                                            />
                                            {/* <button type="button"

                                                className={`${selectBtnClassname} theme-red`}
                                            >
                                                {/* <i className='fa fa-check fs-20'></i> */}
                                            {/*</button>  */}
                                            </>
                                            }
                                    {/* <br></br> */}
                                    <p className='fs-8 text-left grey mb-0'>{file.name}</p>
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
                        {/* <br />*/}
                        <p className='fs-8 text-left grey mb-0'>&nbsp;</p>
                    </> :
                    <>
                        <label className={`${imgClassName} col-sm mt-2 img-drop-container`} for={props.htmlFor}>
                            <img src={multipleImage} className="empty-img" />
                        </label>
                        {/* <br />*/}
                        <p className='fs-8 text-left grey mb-0'>&nbsp;</p>
                    </>
            }
            {(!props.filecheckbox) ?
                <input type="file" className="form-control" id={props.htmlFor}
                    multiple={props.multiple}
                    value=""
                    accept={accept}
                    onChange={(e) => { props.onChange(e) }}
                /> : ""}

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
    let pattern = props.element.pattern;
    let maxLength = (props.element.maxLength) ? props.element.maxLength : "";
    let tab = props.element.tab;
    let value = (props.element.value) ? props.element.value : "";
    let placeholder = (props.element.placeholder) ? props.element.placeholder : "";
    let options = (props.element.options) ? props.element.options : [];

    let readonly = (props.element.readonly) ? props.element.readonly : false;
    let validate = (props.element.validate) ? props.element.validate : false;
    let required = (props.element.required) ? props.element.required : false;
    let email = (props.element.email) ? props.element.email : false;
    let fileType = (props.element.fileType) ? props.element.fileType : "image";
    let noFormcontrolCls = (props.element.noFormcontrolCls) ? true : false;
    let iconImg = (props.element.iconImg) ? props.element.iconImg : "";
    let iconImgCls = (props.element.iconImgCls) ? props.element.iconImgCls : "";



    let validateOptions = props.element.validateOptions;
    if (validate && label != "") {
        label = (validateOptions[0].rule === "required") ? <RequiredSpan label={label} /> : label;
    }

    let element = { type, name, colClass, className, label, htmlFor, tab, value, placeholder, readonly, validate, required, email, options, fileType, pattern, maxLength, noFormcontrolCls, iconImg, iconImgCls };
    switch (type) {
        case "select": return <SelectInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "checkbox": return <CheckBoxInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "radio": return <RadioInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "textarea": return <TextAreaInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "datetime": return <DateTimeInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
        case "date": return <DateInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />;
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
        case "fileCheckbox":
            let images1 = (props.element.images) ? props.element.images : [];
            // console.log(images1);
            let files1 = (props.element.files) ? props.element.files : [];
            let multiple1 = (props.element.multiple) ? props.element.multiple : "";
            element = { ...element }
            element.images = images1
            element.files = files1
            element.multiple = multiple1
            element.filecheckbox = true
            return <FileInput {...element}
                onChange={(e) => { props.onChange(e) }}
                onClick={(e) => { props.onClick(e) }}
                onSelectImage={(e) => { props.onSelectImage(e) }}
                onBlur={(e) => { props.onChange(e) }} ref={ref} />;
        case "div": return "";
        default: return <TextInput {...element} onChange={(e) => { props.onChange(e) }} onBlur={(e) => { props.onChange(e) }} />
    }
})



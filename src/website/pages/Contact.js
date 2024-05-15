import React, { useRef } from 'react';

import contact1 from "../theme/images/jewell/contact1.jpg"
import iconEmail from "../theme/images/icons/icon-email.png"


import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import apiDataService from "../services/api.service";
import Preloader from '../components/layouts/Preloader';
import StatusBar from '../components/layouts/StatusBar';
import FormImage from '../../jewell/components/forms/FormImage';

const Contact = () => {
    const ref = useRef(null);

    const [contact, setContact] = useState([]);

    useEffect(() => {
        getContact();
    }, []);

    const [preLoading, setPreLoading] = useState(false);

    const [states, setStates] = useState({
        title: "",
        submitted: false,
        submitDisabled: "",
        status: { show: false, type: 'success', msg: '' },
        clickedTabId: 0,
        errorsModalTrigger: "fade",
        errors: [],
        tabs: [{ id: "details", tab: "Details" }],
        params: {
            email: "",
            message: "",
        },
        validations: {
            hasEmailRequired: true,
            hasMessageRequired: true,
            hasEmailEmail: true,
        },
        validate: false
    })


    const [status, setStatus] = useState({ show: false, type: 'success', msg: '' })

    function onStatusClose() {
        setStatus({ show: false, type: 'success', msg: '' });
    }

    const [entities, setEntities] = useState([
        {
            name: "email", type: "email",
            colClass: 'bor8 m-b-20 how-pos4-parent',
            className: "stext-111 cl2 plh3 size-116 p-l-62 p-r-30",
            htmlFor: "Email", value: "", label: "", placeholder: "Your Email Address",
            validate: true,
            noFormcontrolCls: true,
            iconImg: iconEmail,
            iconImgCls: "how-pos4 pointer-none",
            tab: "details",
            maxLength: 40,
            validateOut: true,
            validateOptions: [
                {
                    rule: "required",
                    msg: "Email is Required"
                },
                {
                    rule: "email",
                    msg: "Email format is wrong",
                }
            ]
        }, {
            name: "message", type: "textarea", colClass: 'bor8 m-b-30',
            className: "stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25", htmlFor: "Address", value: "",
            label: "", placeholder: "How Can We Help?",
            validate: true,
            noFormcontrolCls: true,
            maxLength: 60,
            tab: "details",
            validateOut: true,
            validateOptions: [
                {
                    rule: "required",
                    msg: "Message is Required"
                }
            ]
        }
    ]);

    function getContact() {
        apiDataService.getContact()
            .then(async (response) => {
                let responseData = response.data;
                let contactData = responseData.data.contact;
                console.log(contactData);
                if (contactData) {
                    let arr = contactData;
                    console.log(arr);
                    setContact(arr);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    function saveDataApiCall(params) {
        setPreLoading(true);

        let callApi = apiDataService.saveMessage(params)
        let states1 = { ...states }
        callApi.then(response => {
            let data = response.data;
            console.log(response.data);
            if (!data.status) { // errors
                (async () => {
                    setStatus({ show: true, type: 'success', msg: 'Something went wrong' });
                    setPreLoading(false);
                    // setStates(states1)

                })();
            } else { // success
                // this.setState({ successMsg: data.message })
                let msg = data.message;
                setStatus({ show: true, type: 'success', msg: msg });
                setPreLoading(false);
                states1.params.email = ""
                states1.params.message = ""
                setStates(states1)
            }
        }).catch(e => {
            console.log(e);
            setStatus({ show: true, type: 'success', msg: 'Something went wrong' });
            setPreLoading(false);
            // setStates(states1)
        });
    }

    return (
        <>
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: `url(${contact1})` }}>
                <h2 className="ltext-105 cl0 txt-center">
                    Contact
                </h2>
            </section>


            <section className="bg0 p-t-104 p-b-116">
                <div className="container">
                    {preLoading ? <Preloader /> : ""}
                    <StatusBar className="m-t-3" status={status} onStatusClose={() => onStatusClose()} />
                    <div className="flex-w flex-tr">
                        <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                            <form>
                                <h4 className="mtext-105 cl2 txt-center p-b-30">
                                    Send Us A Message
                                </h4>

                                {/* <div className="bor8 m-b-20 how-pos4-parent">
                                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="email" placeholder="Your Email Address" />
                                    <img className="how-pos4 pointer-none" src={iconEmail} alt="ICON" />
                                </div>

                                <div className="bor8 m-b-30">
                                    <textarea className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25" 
                                    name="msg" placeholder="How Can We Help?"></textarea>
                                </div>

                                <button className="flex-c-m stext-101 cl5 size-121 bg2 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                                    Submit
                                </button> */}


                                < FormImage
                                    entities={entities}
                                    states={states}
                                    action="form"
                                    viewEncryptId=""
                                    saveDataApiCall={(params) => saveDataApiCall(params)}
                                    ref={ref}
                                    preLoading={preLoading}
                                    forMessage={true}
                                />

                            </form>
                        </div>

                        <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">

                            <div className="flex-w w-full p-b-25">
                                <span className="fs-18 cl5 txt-center size-211">
                                    <span className="lnr lnr-map-marker"></span>
                                </span>

                                <div className="size-212 p-t-2">
                                    <span className="mtext-110 cl2">
                                        Address
                                    </span>


                                    <p className="stext-115 cl6 size-213">
                                        <span className="mtext-101 cl11 size-213 p-t-10">
                                            {contact.company_name}
                                        </span><br></br>
                                        {contact.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-w w-full p-b-20">
                                <span className="fs-18 cl5 txt-center size-211">
                                    <span className="lnr lnr-phone-handset"></span>
                                </span>

                                <div className="size-212 p-t-2">
                                    <span className="mtext-110 cl2">
                                        Lets Talk
                                    </span>

                                    <p className="stext-115 cl1 size-213 p-t-10">
                                        {contact.landline_no}<br></br>
                                        {(contact.whatsapp_no) ? contact.phone_no : ""}
                                    </p>
                                </div>
                            </div>

                            {(contact.whatsapp_no) ?
                                <div className="flex-w w-full p-b-20">
                                    <span className="fs-18 cl5 txt-center size-211">
                                        <span className="fab fab fa-whatsapp "></span>
                                    </span>

                                    <div className="size-212 p-t-2">
                                        <span className="mtext-110 cl2">
                                            Whatsapp
                                        </span>

                                        <p className="stext-115 cl1 size-213 p-t-10">
                                            {contact.whatsapp_no}
                                        </p>
                                    </div>
                                </div> : ""}

                            <div className="flex-w w-full p-b-20">
                                <span className="fs-18 cl5 txt-center size-211">
                                    <span className="lnr lnr-envelope"></span>
                                </span>

                                <div className="size-212 p-t-2">
                                    <span className="mtext-110 cl2">
                                        Mail Support
                                    </span>

                                    <p className="stext-115 cl1 size-213 p-t-10">
                                        {contact.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-w w-full">
                                {
                                    (contact.facebook_link) ?
                                        <a href={contact.facebook_link} className="fs-18 cl5 txt-center size-100">
                                            <span className="fa-brands fa-facebook"></span>
                                        </a> : ""}
                                {(contact.instagram_link) ?
                                    <a href={contact.instagram_link} className="fs-18 cl5 txt-center size-100">
                                        <span className="fa-brands fa-instagram"></span>
                                    </a> : ""}
                                {(contact.twitter_link) ?
                                    <a href={contact.twitter_link} className="fs-18 cl5 txt-center size-100">
                                        <span className="fa-brands fa-twitter"></span>
                                    </a> : ""}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Contact
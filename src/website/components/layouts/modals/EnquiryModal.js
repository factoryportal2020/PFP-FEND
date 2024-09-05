import React from 'react';
import iconClose2 from "../../../theme/images/icons/icon-close2.png";
import FormImage from '../../../../jewell/components/forms/FormImage';
import apiDataService from "../../../services/api.service";
import StatusBar from '../StatusBar';
import Preloader from '../Preloader';
import ErrorModal from '../../../../jewell/modals/ErrorModal';

class EnquiryModal extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        let userInfo = (props.userInfo) ? props.userInfo : "";
        this.state = {
            preLoading: false,
            successMsg: "",
            modalTrigger: props.showModalTrigger,
            productName: props.productName,
            currentEncryptID: props.currentEncryptID,
            userInfo: userInfo,
            states: {
                title: props.productName,
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }],
                params: {
                    email: (userInfo && userInfo.email) ? userInfo.email : "",
                    count: 1,
                    comment: "",
                    // currentEncryptID: props.currentEncryptID
                },
                validations: {
                    hasEmailRequired: true,
                    hasEmailEmail: true,
                },
                validate: false
            },
            entities: [
                {
                    name: "email", type: "email", colClass: '', className: "", htmlFor: "Email", value: "", label: "Email", placeholder: "leo@gmail.com",
                    validate: true,
                    tab: "details",
                    maxLength: 40,
                    validateOptions: [
                        {
                            rule: "required",
                            msg: "Email is Required"
                        },
                        {
                            rule: "email",
                            msg: "Email format is wrong",
                        }]
                },
                {
                    name: "count", type: "number", colClass: 'mt-3', className: "", htmlFor: "Count", value: "", label: "Count", placeholder: "",
                    validate: false,
                    tab: "details",
                    maxLength: 3,
                },
                {
                    name: "comment", type: "text", colClass: 'mt-3', className: "", htmlFor: "Search", value: "",
                    label: "Comment", placeholder: "Comment",
                    validate: false,
                    tab: "details",
                    maxLength: 50,
                }
            ],
        }
        this.clickClose = this.clickClose.bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps);
        // if (newProps) {
        // console.log(newProps);
        let stateObj = { ...this.state };
        stateObj.states.title = newProps.productName
        stateObj.preLoading = false
        stateObj.modalTrigger = newProps.showModalTrigger
        stateObj.productName = newProps.productName
        stateObj.currentEncryptID = newProps.currentEncryptID
        if (newProps.userInfo) {
            stateObj.userInfo = newProps.userInfo
        }
        this.setState({ ...stateObj }, () => { })
        // }
        // this.setState({
        //     modalTrigger: newProps.showModalTrigger,
        //     productName: newProps.productName,
        //     currentEncryptID: newProps.currentEncryptID,
        //     userInfo: newProps.userInfo
        // });
    }

    clickClose() {
        this.setState({ successMsg: "" }, () => { this.props.clickShowModalClose() })

    }

    clickSubmit() {
        let datas = this.child.current.state.states.params;
        datas.currentEncryptID = this.state.currentEncryptID
        console.log(datas);
        this.saveDataApiCall(datas)
    }

    async saveDataApiCall(params) {
        this.setState({ preLoading: true });
        params.currentEncryptID = this.state.currentEncryptID
        params.userEncryptID = this.state.userInfo?.user_encrypt_id

        let callApi = apiDataService.saveEnquiry(params)
        callApi.then(response => {
            let data = response.data;
            console.log(response.data);
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                // this.setState({ action: "list" });
                // this.child.current.setStatusMsg("success", data.message)
                this.setState({ successMsg: data.message })

                // if (!this.state.preLoading) {
                setInterval(() => {
                    this.setState({ preLoading: false })
                }, 5000);
                // }
                // setInterval(() => {
                //     this.child.current.emptyStatusMsg(true);
                //     // let stateObj = { ...this.state };
                //     // stateObj.states.submitted = true
                //     // this.setState({ ...stateObj }, () => { })
                // }, 5000);
                // this.clickClose()
                // this.props.clickShowModalClose()
            }
        }).catch(e => {
            this.child.current.setStatusMsg("danger", "Something went wrong")
            this.setState({ preLoading: false });
        });
    }


    render() {
        return (
            <>
                <div className={`modal ${this.state.modalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fs-16 brown" id="exampleModalLongTitle">Enquiry </h5>
                                {/* <span className='fs-12'>Product name: <span className='fs-14 brown'>{this.state.productName}</span></span> */}
                                <a href="\\">
                                    <i className="fa-solid fa-close fs-4 brown" onClick={this.clickClose} />
                                </a>
                            </div>
                            <div className="modal-body">
                                {
                                    (this.state.successMsg != "") ?
                                        <div class="alert alert-success">
                                            <strong>Success!</strong> {this.state.successMsg}
                                        </div>
                                        : ""
                                }
                                < FormImage
                                    entities={this.state.entities}
                                    states={this.state.states}
                                    action="form"
                                    viewEncryptId=""
                                    saveDataApiCall={(params) => this.saveDataApiCall(params)}
                                    ref={this.child}
                                    preLoading={this.state.preLoading}
                                // forEnquiryModel={true}
                                />
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button"
                                    className="stext-101 cl5 size-101 bggrey bor1 hov-btn1 p-lr-15 trans-04"
                                    data-dismiss="modal" onClick={this.clickClose}>Cancel</button>
                                <button type="button"
                                    className="stext-101 cl5 size-101 bor1 hov-btn1 p-lr-15 trans-04"
                                    data-dismiss="modal" onClick={this.clickSubmit}>Submit</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default EnquiryModal;
import React from 'react';
import { Tab } from '../../../components/forms/Tab';
import validator from '../../../components/forms/validate';
import StatusBar from '../../../components/layouts/StatusBar';
import Preloader from '../../../components/layouts/Preloader';
import { Field } from '../../../components/forms/Field';
import ErrorModal from '../../../modals/ErrorModal';
import { TaskCardView } from './TaskCardView';

class FormImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: { ...props.states },
            entities: [...props.entities],
            clickedTabId: props.states.clickedTabId,
            errorsModalTrigger: props.states.errorsModalTrigger,
            errors: props.states.errors,
            preLoading: props.preLoading,
            action: props.action,
            viewEncryptId: props.viewEncryptId,
        }
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickTab = this.clickTab.bind(this);
        this.fileImage = React.createRef();

        this.showServerErrorMsg = this.showServerErrorMsg.bind(this);

        // errors model
        this.clickErrorModalClose = this.clickErrorModalClose.bind(this);
        this.disableSubmitButton = this.disableSubmitButton.bind(this);
        this.emptyStatusMsg = this.emptyStatusMsg.bind(this);

        this.props.innerRef.current = this;
        // console.log(this.state.states.params.other_specifications);

        this.OtherSpecificationsRef = React.createRef();
        this.PricebreakdownsRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.states != nextProps.states) {
            let stateObj = { ...this.state };
            stateObj.states = nextProps.states;
            if (this.state.entities != nextProps.entities) {
                stateObj.entities = nextProps.entities;
            }
            this.setState({ ...stateObj }, () => {
            });
        }

        if (this.state.preLoading != nextProps.preLoading) {
            this.setState({ preLoading: nextProps.preLoading }, () => { });
        }

    }

    emptyStatusMsg(submitted = false) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: false, type: 'success', msg: '' }
        stateObj.states.submitted = submitted;
        this.setState({ ...stateObj }, () => { });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    setStatusMsg(type, msg) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: true, type: type, msg: msg };
        this.setState({ ...stateObj }, () => { });
        setInterval(() => {
            this.disableSubmitButton();
            this.emptyStatusMsg();
        }, 3000);

    }

    async showServerErrorMsg(message) {
        let stateObj = { ...this.state };
        var msg = message;

        if (typeof msg == "string") {
            msg = { "msg": ["Server Error"] };
            // this.setStatusMsg("danger", "Server Error");return;
        }

        if (!Array.isArray(Object.values(msg))) {
            msg = { "msg": ["Server Error"] };
            // msg = { "msg": [msg] };
            // this.setStatusMsg("danger", msg)return;
        }
        stateObj.errors = msg;
        stateObj.errorsModalTrigger = "d-block";
        stateObj.preLoading = false;
        this.setState({ ...stateObj }, () => { this.disableSubmitButton(); console.log(this.state) });
    }

    clickTab(e) {
        var clickedTabId = e.currentTarget.id;
        this.setState({ clickedTabId: clickedTabId })
    }

    clickErrorModalClose() {
        this.setState({ errorsModalTrigger: "fade" })
    }

    handleChangeValue(event, fieldName, new_element) {
        let value = event;
        // console.log(value);
        let stateObj = { ...this.state };

        if (new_element.type == "checkbox") {
            value = this.handleChangeCheckBox(event, stateObj.states.params[fieldName]);
        }

        if (new_element.type == "file") {
            value = this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple);
        }

        // if (new_element.type == "datetime") {
        //     value = this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple);
        // }

        (async () => { await this.checkValidateSetState(value, fieldName, stateObj, new_element) })();
    }

    async checkValidateSetState(value, fieldName, stateObj, new_element, submitCheck = false) {
        if (new_element.validate) {
            if (new_element.validateOptions.length != 0) {
                await this.validation(value, fieldName, new_element, submitCheck);
            }
        } else {
            stateObj.states.params[`${fieldName}`] = value;
            this.setState({ ...stateObj }, () => { console.log(this.state.states.params) });
        }
    }


    handleChangeCheckBox(event, checkbox) {
        if (event.checked) {
            checkbox.push(event.value);
        } else {
            checkbox = checkbox.filter(function (e) { return e !== event.value })
        }
        return checkbox;
    }

    handleChangeFile(event, curArray, multiple) {
        if (multiple == "") {
            curArray = [];
        }

        let files = Array.prototype.slice.call(event.target.files);
        if (files.length > 0) {
            files.map((file, j) => {
                curArray.push(file);
            })
        }
        return curArray;
    }

    handleDeleteImage(e, fieldName, new_element) {
        if (new_element.type == "button") {
            this.props.changePasswordButton(fieldName, 'hide'); // change_password
            return;
        }

        let keyIndex = e.target.id
        let file_id = e.target.id
        let curArray = [...this.state.states.params[fieldName]];

        if (curArray.length > 0) {
            curArray.map((element, i) => {
                if (element.url && element.id) {
                    if (element.id == keyIndex) {
                        keyIndex = i;
                        file_id = element.id
                    }
                } else {
                    file_id = null
                }
            })
        }

        if (keyIndex > -1) { curArray.splice(keyIndex, 1); }
        let stateObj = { ...this.state };


        console.log(curArray);
        (async () => {
            await this.deleteExistImage(fieldName, file_id);
            await this.checkValidateSetState(curArray, fieldName, stateObj, new_element);
        })();
    }

    async deleteExistImage(fieldName, id = null) {
        //Edit 
        if (this.state.states.params.encrypt_id) {
            let stateObj = { ...this.state };
            // let files = stateObj.states.params[`${fieldName}`];
            let deleteImages = [...stateObj.states.params.deleteImages];
            console.log(deleteImages);
            if (id != null) {
                deleteImages.push(id);
            }
            // else {
            //     if (files.length == 0) { return; }
            //     files.map(val => {
            //         if (val.id && typeof val.id !== undefined) {
            //             deleteImages.push(val.id);
            //         }
            //     })
            // }
            console.log(deleteImages);

            stateObj.states.params.deleteImages = deleteImages.filter(validator.makeArrayUnique);
            this.setState({ ...stateObj }, () => { });
        }
    }

    handleSubmit(e) {
        (async () => {
            // await this.disableSubmitButton(true);
            await this.allValidation();
            var validationsArr = [];
            var validations = this.state.states.validations;
            console.log(this.state.states.validations);
            if (validations) {
                Object.values(validations).forEach(val => {
                    validationsArr.push(val);
                })
                if (validationsArr.indexOf(true) !== -1) { // Condition: true should not in validationsArr !==-1
                    console.log(validations);
                    console.log("Validation Error");
                    let stateObj = { ...this.state };
                    stateObj.states.validate = true;
                    this.setStatusMsg("success", "Fill all * Required fields")
                    this.setState({ ...stateObj }, () => { this.disableSubmitButton(false); });
                } else { //All Validation done, all validations should false, validate should false
                    // this.props.innerRef.current = this.state.states;
                    console.log("Validation Pass");

                    let stateObj = { ...this.state };

                    //product
                    if (this.OtherSpecificationsRef.current !== undefined && this.OtherSpecificationsRef.current != null) {
                        stateObj.states.params.other_specifications = this.OtherSpecificationsRef.current;
                        if (this.OtherSpecificationsRef.current.deletedIds !== undefined && this.OtherSpecificationsRef.current.deletedIds != null) {
                            stateObj.states.params.delete_specifications_ids = this.OtherSpecificationsRef.current.deletedIds;
                        }
                    }
                    if (this.PricebreakdownsRef.current !== undefined && this.PricebreakdownsRef.current != null) {
                        stateObj.states.params.price_breakdowns = this.PricebreakdownsRef.current;
                        if (this.PricebreakdownsRef.current.deletedIds !== undefined && this.PricebreakdownsRef.current.deletedIds != null) {
                            stateObj.states.params.delete_pricebreakdowns_ids = this.PricebreakdownsRef.current.deletedIds;;
                        }
                    }

                    this.setState({ ...stateObj }, () => { this.disableSubmitButton(false); });
                    await this.props.saveDataApiCall(this.state.states.params);
                }
            }
        })();
    }

    async disableSubmitButton(trigger = false) {
        let stateObj = { ...this.state };
        stateObj.states.submitDisabled = (trigger) ? "disabled" : "";
        this.setState({ ...stateObj }, () => { });
    }

    async allValidation() { // validate all field after click submit
        var entities = this.state.entities;
        let stateObj = { ...this.state };
        entities.map((Element, i) => {
            let value = this.state.states.params[`${Element.name}`];
            this.checkValidateSetState(value, Element.name, stateObj, Element, true)
        })
    }

    async validation(value, fieldName, new_element, submitCheck = false) {
        let hasErr = false;
        let hasHaveToErr = false;
        let stateObj = { ...this.state };
        new_element.validateOptions.map((option, j) => {
            let rule = option.rule
            let hasErrName = validator.hasErrorNaming(fieldName, rule);
            if (rule == "required") {
                hasErr = (validator.empty(value)) ? true : false;
            } else if (rule == "email") {
                hasErr = (validator.email(value)) ? true : false;
                hasErr = this.checkRequiredInArray(submitCheck, new_element.validateOptions, validator.empty(value), hasErr);
            } else if (rule == "phone_no") {
                hasErr = (validator.indianPhoneNo(value)) ? true : false;
                hasErr = this.checkRequiredInArray(submitCheck, new_element.validateOptions, validator.empty(value), hasErr);
            } else if (rule == "required_array") {
                hasErr = (validator.requiredArray(value)) ? true : false;
            } else if (rule == "have") {
                hasErr = false;
                let have_value = stateObj.states.params[`${option.have}`];
                if ((validator.empty(have_value) == false)) {
                    hasErr = (validator.empty(value)) ? true : false;
                }
                hasErr = this.props.specialValidationforUpdate(fieldName, hasErr);
            } else if (rule == "have_to") {// this only having "hasHaveToErr" trigger
                hasErr = false;
                let have_to_value = stateObj.states.params[`${option.have_to}`];
                if ((validator.empty(value) == false)) {
                    let hasErrNameHaveTo = validator.hasErrorNaming(option.have_to, "Have");
                    if ((validator.empty(have_to_value))) {
                        hasHaveToErr = true;
                        hasHaveToErr = this.props.specialValidationforUpdate(option.have_to, hasHaveToErr);
                        stateObj.states.validations[`${hasErrNameHaveTo}`] = hasHaveToErr;
                    }
                }
            }
            else if (rule == "equal") {
                hasErr = false;
                let equal_value = stateObj.states.params[`${option.equal}`];
                if ((validator.empty(equal_value) == false)) {
                    hasErr = (validator.equal(value, equal_value)) ? true : false;
                }
                hasErr = this.props.specialValidationforUpdate(fieldName, hasErr);
            }

            else if (rule == "image" || rule == "pdf" || rule == "csv" || rule == "excel" || rule == "doc") {
                let outresult = (validator.isFiles(value, rule));
                hasErr = outresult[0].result ? true : false; //If true means this rule having error
                if (this.state.states.params.encrypt_id) { submitCheck = true; }

                hasErr = this.checkRequiredInArray(submitCheck, new_element.validateOptions, value.length == 0, hasErr);
                value = outresult[1].value;
            }
            stateObj.states.validations[`${hasErrName}`] = hasErr;

        })
        stateObj.states.validate = (hasErr || hasHaveToErr) ? true : false; //set validate value
        stateObj.states.params[`${fieldName}`] = value; //set validation value for each param
        this.setState({ ...stateObj }, () => { });
    }


    checkRequiredInArray(submitCheck, array, emptyValue, hasErr) {
        var required = false;
        array.map((option, j) => {
            if (option.rule == "required") { required = true; }
        })
        if (submitCheck && !required && emptyValue) {
            hasErr = false;
        }
        return hasErr;
    }

    render() {
        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />

                    {this.state.preLoading ? <Preloader /> : ""}

                    <div className='d-flex justify-content-between'>
                        <div><h4 className='brown'>{this.state.states.title}</h4></div>
                        {(this.state.states.tabs.length > 1) ?
                            <Tab state={this.state} onClick={(e) => this.clickTab(e)} /> : ""}
                    </div>


                    <form>
                        {
                            this.state.states.tabs.map((tab, j) => {
                                var tabShow = (j == this.state.clickedTabId) ? "" : "hide";
                                var forTask = (this.state.states.listLink == "task") ? true : false;
                                return (
                                    <>
                                        <ErrorModal
                                            key={`errorModal${j}`}
                                            errors={this.state.errors}
                                            title={this.state.states.title}
                                            errorsModalTrigger={this.state.errorsModalTrigger}
                                            clickErrorModalClose={() => this.clickErrorModalClose()} />


                                        <div className='row'>
                                            <div className='col-md'>
                                                <TaskCardView element={this.state.states.params}
                                                    title={this.state.states.title}
                                                    addLink={this.state.states.listLink}
                                                />
                                            </div>
                                            <div className='col-md'>
                                                <div className="card w-auto">
                                                    <div className="card-body ps-1 pe-3">
                                                        <div className="card-content">
                                                            <h6>Initial Images</h6>
                                                            <div className="row pt-2">
                                                                {
                                                                    (this.state.states.params.initial_image.length) > 0 ?
                                                                        this.state.states.params.initial_image.map(function (image) {
                                                                            return (
                                                                                <div className="col-sm mt-2 mb-2 img-container">
                                                                                    <img className="img-file shadow-1-strong rounded" src={image.url} alt={image.name} />
                                                                                    <a href={image.url} target='_blank'>
                                                                                        <i className="preview-btn fa-solid fa-eye" /></a><br></br>
                                                                                    <span className='fs-8 text-left grey'>{image.name}</span>

                                                                                </div>

                                                                            )
                                                                        })
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div key={j} className={`row mt-2 brown ${tabShow}`}>
                                            <div className={(forTask ? "mb-4" : "col-md-3")}>
                                                <div className={(forTask ? "row" : "") + " g-3"}>
                                                    <Field
                                                        key={`fieldImages${j}`}
                                                        state={this.state}
                                                        tab={tab}
                                                        isFile={true}
                                                        onChange={(newValue, fieldName, new_element) => { this.handleChangeValue(newValue, fieldName, new_element) }}
                                                        onClick={(e, fieldName, new_element) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                                    // ref={this.fileImage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </form >


                    {(this.state.action != "view") ?
                        <div className="col-12">
                            <button type="button"
                                onClick={(e) => { this.handleSubmit(e) }}
                                disabled={this.state.states.submitDisabled}
                                className="btn btn-light jewell-bg-color brown float-end">Submit</button>
                        </div> : ""
                    }

                </div >
            </>
        )
    }
}

export default React.forwardRef((props, ref) =>
    <FormImage
        innerRef={ref} {...props}
    />);

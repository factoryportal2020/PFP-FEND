import React from 'react';
import validator from './validate';
import { Field } from './Field';
import ErrorModal from '../../modals/ErrorModal';
import { InputElement } from './InputElement';
import { ValidateDisplay } from './ValidateDisplay';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: { ...props.states },
            entities: [...props.entities],
            errorsModalTrigger: props.errorsModalTrigger,
            // errorsModalTrigger: props.states.errorsModalTrigger,
            errors: props.errors,
            // errors: props.states.errors,
            action: props.action,
        }
        console.log(this.state);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileImage = React.createRef();

        this.showServerErrorMsg = this.showServerErrorMsg.bind(this);

        // errors model
        this.clickErrorModalClose = this.clickErrorModalClose.bind(this);
        this.disableSubmitButton = this.disableSubmitButton.bind(this);
        this.emptyStatusMsg = this.emptyStatusMsg.bind(this);
        this.setStatusMsg = this.setStatusMsg.bind(this);


        this.props.innerRef.current = this;

    }

    componentWillReceiveProps(nextProps) {
        // if (this.state.states != nextProps.states) {
        //     let stateObj = { ...this.state };
        //     stateObj.states = nextProps.states;
        //     if (this.state.entities != nextProps.entities) {
        //         stateObj.entities = nextProps.entities;
        //     }
        //     if (this.state.preLoading != nextProps.preLoading) {
        //         stateObj.preLoading = nextProps.preLoading;
        //     }
        //     this.setState({ ...stateObj }, () => { console.log(stateObj) });
        // }

        if (this.state.errorsModalTrigger != nextProps.errorsModalTrigger) {
            let stateObj = { ...this.state };
            stateObj.errorsModalTrigger = nextProps.errorsModalTrigger;
            stateObj.errors = nextProps.errors;
            this.setState({ ...stateObj }, () => { console.log(stateObj) });
        }

        if (this.state.states.submitDisabled != nextProps.states.submitDisabled) {
            let stateObj = { ...this.state };
            stateObj.states.submitDisabled = nextProps.states.submitDisabled;
            this.setState({ ...stateObj }, () => { console.log(stateObj) });
        }
    }

    async emptyStatusMsg(submitted = false) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: false, type: 'success', msg: '' }
        stateObj.states.submitted = submitted;
        this.setState({ ...stateObj }, () => {
        });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    async setStatusMsg(type, msg) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: true, type: type, msg: msg };
        this.setState({ ...stateObj }, () => { });
        setInterval(() => {
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
        console.log(stateObj);
        this.setState({ ...stateObj }, () => { this.disableSubmitButton(); console.log(this.state) });
    }


    clickErrorModalClose() {
        // let stateObj = { ...this.state };
        // stateObj.errors = [];
        // stateObj.errorsModalTrigger = "fade";
        // this.setState({ ...stateObj }, () => { this.disableSubmitButton(); console.log(this.state) });
        this.disableSubmitButton();
        this.props.clickErrorModalClose();
    }

    handleChangeValue(event, fieldName, new_element) {
        let value = event;
        let stateObj = { ...this.state };

        if (new_element.type == "checkbox") {
            value = this.handleChangeCheckBox(event, stateObj.states.params[fieldName]);
        }

        if (new_element.type == "file") {
            value = this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple);
        }
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
        let curArray = [...this.state.states.params[fieldName]];
        if (keyIndex > -1) { curArray.splice(keyIndex, 1); }
        let stateObj = { ...this.state };

        if (stateObj.states.params.encrypt_id && new_element.multiple == "") {
            curArray.splice(0, 1);
        }

        // this.deleteExistImage(fieldName.keyIndex);
        console.log(curArray);
        (async () => { await this.checkValidateSetState(curArray, fieldName, stateObj, new_element) })();
    }

    deleteExistImage(fieldName, id = null) {
        //Edit 
        if (this.state.states.params.encrypt_id) {
            let stateObj = { ...this.state };
            let files = stateObj.states.params[`${fieldName}`];
            let deleteImages = [...stateObj.states.params.deleteImages];

            if (id != null) {
                deleteImages.push(id);
            } else {
                if (files.length == 0) { return; }
                files.map(val => {
                    if (val.id && typeof val.id !== undefined) {
                        deleteImages.push(val.id);
                    }
                })
            }
            stateObj.states.params.deleteImages = deleteImages.filter(validator.makeArrayUnique);
            this.setState({ ...stateObj }, () => { });
        }
    }

    handleSubmit(e) {
        (async () => {
            await this.disableSubmitButton(true);
            await this.allValidation();
            var validationsArr = [];
            var validations = this.state.states.validations;

            if (validations) {
                Object.values(validations).forEach(val => {
                    validationsArr.push(val);
                })
                if (validationsArr.indexOf(true) !== -1) { // Condition: true should not in validationsArr !==-1
                    console.log("Validation Error");
                    let stateObj = { ...this.state };
                    stateObj.states.validate = true;
                    this.setStatusMsg("success", "Fill all * Required fields")
                    this.setState({ ...stateObj }, () => { this.disableSubmitButton(false); });
                } else { //All Validation done, all validations should false, validate should false
                    // this.props.innerRef.current = this.state.states;
                    console.log("Validation Pass");
                    // this.setState({ preLoading: true })

                    await this.props.saveDataApiCall(this.state.states.params);
                    // this.setState({ preLoading: false })

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
            }
            else if (rule == "phone_no") {
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
                console.log(hasErr);
            }

            else if (rule == "image" || rule == "pdf" || rule == "csv" || rule == "excel" || rule == "doc") {
                let outresult = (validator.isFiles(value, rule));
                //If true means this rule having error
                hasErr = outresult[0].result ? true : false;
                if (this.state.states.params.encrypt_id) { submitCheck = true; }
                hasErr = this.checkRequiredInArray(submitCheck, new_element.validateOptions, value.length == 0, hasErr);
                value = outresult[1].value;

                // Edit if file is not validate
                if (this.state.states.params.encrypt_id) {
                    if (hasErr) {
                        value = this.state.states.params[`${fieldName}`];
                    } else {
                        this.deleteExistImage(fieldName);
                    }
                }
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
            if (option.rule == "required") {
                required = true;
            }
        })
        if (submitCheck && !required && emptyValue) {
            hasErr = false;
        }
        return hasErr;
    }

    render() {
        return (
            <>
                <ErrorModal
                    errors={this.state.errors}
                    title={this.state.states.title}
                    errorsModalTrigger={this.state.errorsModalTrigger}
                    clickErrorModalClose={() => this.clickErrorModalClose()} />

                {
                    this.state.entities.map((element, i) => {
                        var tabShow = "hide";
                        if (this.state.states.tabs.length != 0) {
                            if (element.tab && this.state.states.tabs.id == element.tab) {
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
                        new_element.value = this.state.states.params[fieldName]

                        if (element.type == "file") {
                            // if (!isFile) { return; }
                            if (element.fileType == "image") {
                                new_element.images = this.state.states.params[fieldName]
                            } else {
                                new_element.files = this.state.states.params[fieldName]
                            }
                        }

                        // if (isFile && (element.type != "file")) { return; }

                        return (
                            <>
                                <div className={`${new_element.colClass} ${tabShow}`}>
                                    <InputElement key={i} element={new_element}
                                        // ref={ref}
                                        onChange={(newValue) => { this.handleChangeValue(newValue, fieldName, new_element) }}
                                        onClick={(e) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                    />
                                    <ValidateDisplay state={this.state} new_element={new_element} fieldName={fieldName} />
                                </div>
                            </>
                        )

                    })
                }
                <div className='text-center'>
                <button type="button"
                    onClick={(e) => { this.handleSubmit(e) }}
                    disabled={this.state.states.submitDisabled}
                    className="form-control login__submit">{this.state.states.title}
                </button>
                </div>
            </>
        )
    }
}

export default React.forwardRef((props, ref) =>
    <Form
        innerRef={ref} {...props}
    />);


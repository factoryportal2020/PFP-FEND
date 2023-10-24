import React from 'react';
import { Input } from './Input';
import { Tab } from './Tab';
import validator from './validate';
import StatusBar from '../layouts/StatusBar';
import Preloader from '../layouts/Preloader';
import customerService from '../../services/customer.service';
import { Field } from './Field';
import ErrorModal from '../../modals/ErrorModal';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: { ...props.states },
            entities: [...props.entities],
            clickedTabId: 0,
            errorsModalTrigger: "fade",
            errors: [],
        }
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickTab = this.clickTab.bind(this);
        this.fileImage = React.createRef();

        // errors model
        this.clickErrorModalClose = this.clickErrorModalClose.bind(this);

    }

    emptyStatusMsg() {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: false, type: 'success', msg: '' }
        this.setState({ ...stateObj }, () => {
        });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    setStatusMsg(type, msg) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: true, type: type, msg: msg };
        this.setState({ ...stateObj }, () => {
        });
        setInterval(() => {
            this.emptyStatusMsg();
            // if (type == "success") { this.setState({ submitted: true }) }
        }, 5000);
    }

    showServerErrorMsg(message) {
        let stateObj = { ...this.state };
        var msg = message;
        console.log(msg);
        if (!Array.isArray(msg)) {
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
        this.setState({ ...stateObj });
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
        let stateObj = { ...this.state };

        if (new_element.type == "checkbox") {
            value = this.handleChangeCheckBox(event, stateObj.states.params[fieldName]);
        }

        if (new_element.type == "file") {
            value = this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple);
        }

        (async () => { await this.checkValidateSetState(value, fieldName, stateObj, new_element) })();
    }

    async checkValidateSetState(value, fieldName, stateObj, new_element) {
        if (new_element.validate) {
            if (new_element.validateOptions.length != 0) {
                await this.validation(value, fieldName, new_element);
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
        let keyIndex = e.target.id
        let curArray = [...this.state.states.params[fieldName]];
        if (keyIndex > -1) { curArray.splice(keyIndex, 1); }
        let stateObj = { ...this.state };
        (async () => { await this.checkValidateSetState(curArray, fieldName, stateObj, new_element) })();
    }

    handleSubmit(e) {
        (async () => {
            await this.requiredValidInly();
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
                    this.setState({ ...stateObj }, () => { });
                } else { //All Validation done, all validations should false, validate should false
                    // this.props.innerRef.current = this.state.states;
                    console.log("Validation Pass");
                    // this.savDataApiCall();
                }
            }
        })();
    }

    async requiredValidInly() { //to remove other validation option rather than required
        var validations = this.state.states.validations;
        let stateObj = { ...this.state };
        Object.keys(validations).forEach(str => {
            if (str.indexOf("Required") == -1) {
                stateObj.states.validations[`${str}`] = false;
            }
        })
        this.setState({ ...stateObj });
    }

    async validation(value, fieldName, new_element) {
        let hasErr = false;
        let stateObj = { ...this.state };
        await new_element.validateOptions.map((option, j) => {
            let rule = option.rule
            let hasErrName = validator.hasErrorNaming(fieldName, rule);
            if (rule == "required") {
                hasErr = (validator.empty(value)) ? true : false;
            } else if (rule == "email") {
                hasErr = (validator.email(value)) ? true : false;
            } else if (rule == "phone_no") {
                hasErr = (validator.indianPhoneNo(value)) ? true : false;
            } else if (rule == "required_array") {
                hasErr = (validator.requiredArray(value)) ? true : false;
            } else if (rule == "image" || rule == "pdf" || rule == "csv" || rule == "excel" || rule == "doc") {
                let outresult = (validator.isFiles(value, rule));
                //If true means this rule having error
                hasErr = outresult[0].result ? true : false;
                value = outresult[1].value;
            }
            stateObj.states.validations[`${hasErrName}`] = hasErr;
        })

        stateObj.states.validate = (hasErr) ? true : false; //set validate value
        stateObj.states.params[`${fieldName}`] = value; //set validation value for each param
        this.setState({ ...stateObj }, () => { console.log(this.state.states) });
    }


    savDataApiCall() {
        var params = this.state.states.params;
        // var deletedIds = (this.FieldItemcomponent.current.deletedIds != null) ? this.FieldItemcomponent.current.deletedIds : [];
        // console.log(products);
        // console.log(deletedIds);
        // data['products'] = products;
        // data['deletedIds'] = deletedIds;
        console.log(params);

        let callApi = (params.encrypt_id != null) ?
            customerService.update(params.encrypt_id, params) :
            customerService.create(params);

        callApi.then(response => {
            let data = response.data;
            console.log(data);
            if (!data.status) { // errors
                this.showServerErrorMsg(data.message);
            } else { // success
                this.setStatusMsg("success", data.message)
            }
        }).catch(e => {
            this.setStatusMsg("danger", e.getMessage())
        });
    }




    render() {
        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />
                    {/* <Preloader /> */}

                    <div className='d-flex justify-content-between'>
                        <div><h4 className='brown'>{this.state.states.title}</h4></div>
                        <Tab state={this.state} onClick={(e) => this.clickTab(e)} />
                    </div>


                    <form>
                        {
                            this.state.states.tabs.map((tab, j) => {
                                var tabShow = (j == this.state.clickedTabId) ? "" : "hide";
                                return (
                                    <>
                                        <ErrorModal
                                            key={`errorModal${j}`}

                                            errors={this.state.errors}
                                            title={this.state.states.title}
                                            errorsModalTrigger={this.state.errorsModalTrigger}
                                            clickErrorModalClose={() => this.clickErrorModalClose()} />


                                        <div key={j} className={`row g-3 mt-2 brown ${tabShow}`}>

                                            <Field
                                                key={`fieldImage${j}`}
                                                state={this.state}
                                                tab={tab}
                                                onChange={(newValue, fieldName, new_element) => { this.handleChangeValue(newValue, fieldName, new_element) }}
                                                onClick={(e, fieldName, new_element) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                            // ref={this.fileImage}
                                            />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </form >

                    <div className="col-12">
                        <button type="button"
                            onClick={(e) => { this.handleSubmit(e) }}
                            className="btn btn-light jewell-bg-color brown float-end">Submit</button>
                    </div>

                </div >
            </>
        )
    }
}

export default React.forwardRef((props, ref) => <Form
    innerRef={ref} {...props}
/>);

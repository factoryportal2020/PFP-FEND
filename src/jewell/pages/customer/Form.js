import React from 'react';
import { Input } from '../../components/forms/Input';
// import { entities, states } from './Entity';
import validator from '../../components/forms/validate';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import customerService from '../../services/customer.service';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { states: { ...props.states }, entities: [...props.entities] }
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileImage = React.createRef();
    }

    emptyStatusMsg() {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: false, type: 'success', msg: '' }
        this.setState({ ...stateObj }, () => {
            // console.log(this.state.states) 
        });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    setStatusMsg(type, msg) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: true, type: type, msg: msg };
        this.setState({ ...stateObj }, () => {
            // console.log(this.state.states) 
        });
        setInterval(() => {
            this.emptyStatusMsg();
            // if (type == "success") { this.setState({ submitted: true }) }
        }, 5000);
    }

    handleChangeTextValue(event, fieldName, new_element) {
        let value = event;
        let stateObj = { ...this.state };
        if (new_element.type == "checkbox") {
            let checkbox = stateObj.states.params[fieldName]
            if (event.checked) {
                checkbox.push(event.value);
            } else {
                checkbox = checkbox.filter(function (e) { return e !== event.value })
            }
            value = checkbox;
        }

        if (new_element.type == "file") {
            let curArray = stateObj.states.params[fieldName];
            let files = Object.entries(event.target.files);
            if (files.length > 0) {
                files.map((file, j) => {
                    let obj = { file: file[1], name: file[1].name }
                    curArray.push(obj);
                })
            }
            value = curArray;
        }

        (async () => {
            if (new_element.validate) {
                if (new_element.validateOptions.length != 0) {
                    await this.validation(value, fieldName, new_element);
                }
            } else {
                stateObj.states.params[`${fieldName}`] = value;
                this.setState({ ...stateObj }, () => { console.log(this.state.states.params) });
            }
        })();
    }


    handleDeleteImage(e, fieldName, new_element) {
        let keyIndex = e.target.id
        let curArray = [...this.state.states.params[fieldName]];
        if (keyIndex > -1) { curArray.splice(keyIndex, 1); }
        let value = curArray;
        (async () => {
            if (new_element.validate) {
                if (new_element.validateOptions.length != 0) {
                    await this.validation(value, fieldName, new_element);
                }
            } else {
                let stateObj = { ...this.state };
                stateObj.states.params[`${fieldName}`] = value;
                this.setState({ ...stateObj }, () => { console.log(this.state.states.params) });
            }
        })();
    }

    handleSubmit(e) {
        var validationsArr = [];
        var validations = this.state.states.validations;
        var validate = this.state.states.validate;
        if (validations) {
            Object.values(validations).forEach(val => {
                validationsArr.push(val);
            })
            // console.log(validationsArr);
            // console.log(validate);
            // console.log(validationsArr.indexOf(true));
            if (validationsArr.indexOf(true) !== -1) {
                // console.log("First");
                let stateObj = { ...this.state };
                stateObj.states.validate = true;
                this.setState({ ...stateObj }, () => { console.log(this.state.states.validate) });
            } else {
                //All Validation done, all validations should false, validate should false
                // this.props.innerRef.current = this.state.states;
                this.saveDatas();
                // console.log("Second");
            }
        }
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
                hasErr = outresult[0].result ? true : false;
                value = outresult[1].value;
            }
            stateObj.states.validations[`${hasErrName}`] = hasErr;
        })
        stateObj.states.validate = (hasErr) ? true : false;
        stateObj.states.params[`${fieldName}`] = value;
        this.setState({ ...stateObj }, () => { console.log(this.state.states) });
    }


    saveDatas() {
        var data = this.state.states;
        // var deletedIds = (this.FieldItemcomponent.current.deletedIds != null) ? this.FieldItemcomponent.current.deletedIds : [];
        // console.log(products);
        // console.log(deletedIds);
        // data['products'] = products;
        // data['deletedIds'] = deletedIds;

        let callApi = (this.state.states.params.encrypt_id != null) ?
            customerService.update(this.state.states.params.encrypt_id, data) :
            customerService.create(data);

        callApi.then(response => {
            let data = response.data;
            console.log(data);
            if (data.errors) {
                data.errors.forEach(element => {
                    this.setStatusMsg("danger", element.msg)
                    return;
                });
            } else {
                this.setStatusMsg("success", response.data.msg)
            }
        })
            .catch(e => {
                this.setStatusMsg("danger", "Something went wrong")
            });

    }

    render() {
        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />
                    {/* <Preloader /> */}
                    <form className="row g-3 brown">
                        <h4>Customers</h4>
                        {
                            this.state.entities.map((element, i) => {
                                let new_element = { ...element }
                                let fieldName = `${element.name}`
                                new_element.value = this.state.states.params[fieldName]
                                if (element.type == "file") {
                                    if (element.fileType == "image") {
                                        new_element.images = this.state.states.params[fieldName]
                                    } else {
                                        new_element.files = this.state.states.params[fieldName]
                                    }
                                }
                                return (
                                    <>
                                        <div className={new_element.colClass}>
                                            <Input key={i} element={new_element} ref={this.fileImage}
                                                onChange={(newValue) => { this.handleChangeTextValue(newValue, fieldName, new_element) }}
                                                onClick={(e) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                            ></Input>
                                            {
                                                (new_element.validate) ?
                                                    new_element.validateOptions.map((option, j) => {
                                                        let hasErrName = validator.hasErrorNaming(fieldName, option.rule);
                                                        return (
                                                            (this.state.states.validations[hasErrName] && (this.state.states.validate)) ? <><span key={j} className="error" >{option.msg}</span> <br /></> : ""
                                                        )
                                                    })
                                                    : ""
                                            }
                                        </div>
                                    </>
                                )
                            })}

                        <div className="col-12">
                            <button type="button"
                                onClick={(e) => { this.handleSubmit(e) }}
                                className="btn btn-light jewell-bg-color brown float-end">Submit</button>
                        </div>
                    </form >

                </div >
            </>
        )
    }
}

export default React.forwardRef((props, ref) => <Form
    innerRef={ref} {...props}
/>);

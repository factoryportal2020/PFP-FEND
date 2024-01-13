import React from 'react';
import { Tab } from './Tab';
import validator from './validate';
import StatusBar from '../layouts/StatusBar';
import Preloader from '../layouts/Preloader';
import { Field } from './Field';
import ErrorModal from '../../modals/ErrorModal';
import ProgressModal from '../../modals/ProgressModal';
import { SpecificationComponent } from '../../pages/product/Specification';
import imageCompression from 'browser-image-compression';


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

            progressModalTrigger: "fade",
            progressMessage: [{className: "", msg: ""}],
            progressTitle: [],
            progress: [],
        }
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickTab = this.clickTab.bind(this);
        this.fileImage = React.createRef();

        this.showServerErrorMsg = this.showServerErrorMsg.bind(this);
        this.showProgressMsg = this.showProgressMsg.bind(this);

        // errors model
        this.clickErrorModalClose = this.clickErrorModalClose.bind(this);
        this.clickProgressModalClose = this.clickProgressModalClose.bind(this);
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
        // console.log(message);
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

    async clickProgressModalClose() {
        this.setState({ progressModalTrigger: "fade" })
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

    async showProgressMsg(progress) {
        let stateObj = { ...this.state };
        // console.log(message);
        stateObj.progress = progress;
        stateObj.progressModalTrigger = "d-block";
        stateObj.progressMessage = [{className: "", msg: ""}];
        stateObj.progressTitle = [];
        stateObj.preLoading = false;
        this.setState({ ...stateObj }, () => { });
    }

    handleChangeValue(event, fieldName, new_element) {
        (async () => {
            let value = event;

            let stateObj = { ...this.state };

            if (new_element.type == "checkbox") {
                value = this.handleChangeCheckBox(event, stateObj.states.params[fieldName]);
                await this.checkValidateSetState(value, fieldName, stateObj, new_element)
            }

            if (new_element.type == "file") {
                // value = (async () => { await this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple) })();
                let fileValue = await this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple);
                console.log(fileValue);
                if (fileValue.length > 0) {
                    await this.checkValidateSetState(fileValue, fieldName, stateObj, new_element)
                }
                // setInterval(() => this.clickProgressModalClose(), 3000);

            }

            if (new_element.type == "tinyMCE") {
                value = value;
                await this.checkValidateSetState(value, fieldName, stateObj, new_element)
            }
            // if (new_element.type == "datetime") {
            //     value = this.handleChangeFile(event, stateObj.states.params[fieldName], new_element.multiple);
            // }

        })();
    }

    async handleChangeFile(event, curArray, multiple) {
        // await Promise.all(

        if (multiple == "") {
            curArray = [];
        }
        console.log(event.target.files);
        let files = Array.prototype.slice.call(event.target.files);
        // let files = Array.prototype.slice.call(event.target.files);
        // if (files.length > 0) {
        //     files.map((file, j) => {
        //         curArray.push(file);
        //     })
        // }
        // return curArray;
        // if (files.length > 0) {
        //     files.map(async (file, j) => {
        //         // (async () => {
        //         let compressedFile = await this.handleImageUpload(file)
        //         console.log("compressedFile");
        //         console.log(compressedFile);
        //         curArray.push(compressedFile);
        //         // })();
        //     })
        // }

        // var results = await files.map(async (file) => {
        //     let compressedFile = await this.handleImageUpload(file)
        //     console.log("compressedFile");
        //     console.log(compressedFile);
        //     return curArray.push(compressedFile);
        // });
        let progresArray = [];
        progresArray[0] = 0
        this.showProgressMsg(progresArray)
        var results = await Promise.all(
            files.map(async (item, i) => await this.handleImageUpload(item, i))
        );
        // await this.clickProgressModalClose();
        console.log(results);
        var resultFilter = curArray;
        results.map(function (value) {
            if (typeof value === 'object' &&
                value !== null &&
                !Array.isArray(value)
            ) {
                resultFilter.push(value)
            }
        });

        console.log(resultFilter);

        return resultFilter;
        // )
    }

    async handleImageUpload(imageFile, index) {

        // const imageFile = event.target.files[0];
        const options = {
            maxSizeMB: 0.2,
            // maxWidthOrHeight: 1200,
            useWebWorker: true,
            // fileType: 'image/png',
            alwaysKeepResolution: true,
            // onProgress: Function, 
            onProgress: (p) => {
                let stateObj = { ...this.state };
                let progress = stateObj.progress;
                progress[index] = p
                stateObj.progress = progress;
                this.setState({ ...stateObj }, () => { console.log(this.state.progress) });
            }

        }
        // let stateObj = { ...this.state };
        try {
            const blob = await imageCompression(imageFile, options);
            const blobsize = blob.size / 1024 / 1024;
            console.log(blob);
            console.log(blobsize);
            // console.log(blob.size / 1024 / 1024);
            if (blobsize > 0.2) {
                console.log(blobsize);
                let stateObj = { ...this.state };
                stateObj.progressMessage[index] = { className: "red", msg: "Image size should not exceed 200KB" };
                stateObj.progressTitle[index] = blob.name;
                this.setState({ ...stateObj }, () => { console.log("lkl"); });
                return [];
            }
            else {
                // console.log("blobsize");
                let stateObj = { ...this.state };
                stateObj.progressMessage[index] = { className: "green", msg: "Image uploaded Successfully" };
                stateObj.progressTitle[index] = blob.name;
                // stateObj.progressModalTrigger = "Image size should not exceed 200KB";
                this.setState({ ...stateObj }, () => { });
                return new File([blob], blob.name);
            }
            // stateObj.states.params[`${fieldName}`] = [new File([blob], blob.name)]; //set validation value for each param
            // this.setState({ ...stateObj }, () => { console.log(stateObj); });

        } catch (error) {
            console.log(error);
            // stateObj.states.params[`${fieldName}`] = []; //set validation value for each param
            // this.setState({ ...stateObj }, () => { });
        }
    }

    handleSubmit(e) {
        (async () => {
            // await this.disableSubmitButton(true);
            await this.allValidation();
            var validationsArr = [];
            var validations = this.state.states.validations;

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
                // if (outresult[1].value.length > 0) {
                //     (async () => {
                //         // console.log("valuefile");
                //         // console.log(value[0]);
                //         let compressedFile = await this.handleImageUpload(value[0], fieldName)
                //         // console.log("compressedFile");
                //         // console.log(compressedFile);
                //         // value = compressedFile;
                //         // console.log("valuedcd");
                //         // console.log(outresult[1].value); //file instance
                //     })();
                // }

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
                                var forTask = (j > 0 && this.state.states.listLink == "task") ? true : false;
                                var forWebsite = (j > 0 && this.state.states.listLink == "website") ? true : false;
                                return (
                                    <>
                                        <ErrorModal
                                            key={`errorModal${j}`}
                                            errors={this.state.errors}
                                            title={this.state.states.title}
                                            errorsModalTrigger={this.state.errorsModalTrigger}
                                            clickErrorModalClose={() => this.clickErrorModalClose()} />

                                        <ProgressModal
                                            key={`progressModal${j}`}
                                            progress={this.state.progress}
                                            progressMessage={this.state.progressMessage}
                                            progressTitle={this.state.progressTitle}
                                            title={this.state.states.title}
                                            progressModalTrigger={this.state.progressModalTrigger}
                                            clickProgressModalClose={() => this.clickProgressModalClose()} />

                                        <div key={j} className={`row mt-2 brown ${tabShow}`}>

                                            <div className={"" + ((forTask || (forWebsite && tab.id == "banner")) ? "col-md-3" : "col-md-9")}>
                                                <div className={`row g-3`}>
                                                    <Field
                                                        key={`fieldForm${j}`}
                                                        state={this.state}
                                                        tab={tab}
                                                        isFile={false}
                                                        onChange={(newValue, fieldName, new_element) => { this.handleChangeValue(newValue, fieldName, new_element) }}
                                                        onClick={(e, fieldName, new_element) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                                    />
                                                    {/* Product */}
                                                    {
                                                        (this.state.states.params.other_specifications && j == 0) ?
                                                            <>
                                                                <fieldset className='border-1-brown border-radius-25 p-3 mt-4'>
                                                                    <legend className='fs-18'>Other Specifications:</legend>
                                                                    <SpecificationComponent
                                                                        ref={this.OtherSpecificationsRef}
                                                                        specifications={this.state.states.params.other_specifications}
                                                                        deletedIds={this.state.states.params.delete_specifications_ids}
                                                                    />
                                                                </fieldset>
                                                            </> : ""
                                                    }
                                                    {
                                                        (this.state.states.params.price_breakdowns && j == 0) ?
                                                            <>
                                                                <fieldset className='border-1-brown border-radius-25 p-3 mt-5'>
                                                                    <legend className='fs-18'>Price Breakdowns:</legend>
                                                                    <SpecificationComponent
                                                                        ref={this.PricebreakdownsRef}
                                                                        specifications={this.state.states.params.price_breakdowns}
                                                                        deletedIds={this.state.states.params.delete_pricebreakdowns_ids}
                                                                    />
                                                                </fieldset>
                                                            </> : ""
                                                    }
                                                    {/* End Product */}

                                                </div>
                                            </div>



                                            <div className={((forTask) ? "mb-4" : ((forWebsite && tab.id == "banner")) ? "col-md-9" : "col-md-3")}>
                                                <div className={((forTask) ? "row" : "") + " g-3"}>
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





// async requiredValidInly() { //to remove other validation option rather than required
//     var validations = this.state.states.validations;
//     let stateObj = { ...this.state };
//     Object.keys(validations).forEach(str => {
//         if (str.indexOf("Required") == -1) {
//             stateObj.states.validations[`${str}`] = false;
//         }
//     })
//     this.setState({ ...stateObj });
// }
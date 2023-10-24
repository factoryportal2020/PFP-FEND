import React from 'react';
import { formEntities, formStates } from './Entity';
import FormImage from '../../components/forms/FormImage';
import customerService from '../../services/customer.service';
import { Navigate } from 'react-router-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.child = React.createRef();

        this.state = {
            // form
            states: formStates,
            entities: formEntities,
            // states: customerDatas.current,
            action: props.action,
            viewEncryptId: props.viewEncryptId,
            preLoading: false,
        }
        this.changePasswordButton = this.changePasswordButton.bind(this);
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
    }

    componentDidMount() {
        // console.log(window.location.pathname);
        let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        // console.log(encrypt_id);
        if ((encrypt_id != null && this.state.action == "form")) {
            if (this.dataInit(encrypt_id)) {
                return;
            }
        }

        //View
        if ((this.state.viewEncryptId != null && this.state.action == "view")) {
            if (this.dataInit(this.state.viewEncryptId)) {
                return;
            }
        }
    }

    dataInit(encrypt_id) {
        customerService.get(encrypt_id)
            .then(async (response) => {
                let responseData = response.data;
                let updateData = responseData.data;


                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.child.current.showServerErrorMsg(responseData.message);
                    return;
                }
                console.log(updateData);

                let customerData = updateData.customer;
                let userData = updateData.user;
                let profile_imageData = updateData.profile_image;

                let params = { ...this.state.states.params };

                let updatedData = { ...params, ...customerData, ...userData, ...profile_imageData };

                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    entitiesObjects = this.getupdatedEntities("change_password", "show");
                }
                stateObj.entities = entitiesObjects;

                console.log(updatedData);

                stateObj.states.params = updatedData;
                stateObj.states.params.encrypt_id = encrypt_id;
                stateObj.states.params.old_username = (userData.username) ? userData.username : "";
                this.updateStates(stateObj);

            })
            .catch(e => {
                console.log(e);
            });
    }

    changePasswordButton(fieldName, trigger) {
        let stateObj = { ...this.state };
        let entitiesObjects = this.getupdatedEntities(fieldName, trigger);
        stateObj.entities = entitiesObjects;
        this.updateStates(stateObj);
    }


    getupdatedEntities(fieldName, changePasswordtrigger) {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;
        let readOnly = "readonly";

        stateObj.entities.map((element, i) => {
            if (element.name == "username" || element.name == "password" || element.name == "confirm_password") {
                if (changePasswordtrigger == "show") {
                    readOnly = "readonly";
                    stateObj.states.params.password = "";
                    stateObj.states.params.confirm_password = "";
                } else {
                    if (!stateObj.states.params.isPasswordChange) {
                        readOnly = "";
                    }
                }
                entitiesObjects[i].readonly = readOnly;
            }

            if (element.name == "change_password") {
                let colClass = "col-md-3 show";
                let username = stateObj.states.params.username;
                let label = (username == null || username == "") ? "Change Username & Password" : "Change Username & Password";

                stateObj.states.params.isPasswordChange = false;

                if (changePasswordtrigger == "hide") {
                    if (entitiesObjects[i].label != "No Changes in Username & password") {
                        stateObj.states.params.isPasswordChange = true;
                        label = "No Changes in Username & password";
                    } else {
                        stateObj.states.params.username = stateObj.states.params.old_username;
                        stateObj.states.params.password = "";
                        stateObj.states.params.confirm_password = "";
                    }
                }
                entitiesObjects[i].colClass = colClass;
                entitiesObjects[i].label = label;
            }
            this.updateStates(stateObj);
        })
        return entitiesObjects;
    }


    disabledAllInputs() {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;
        let readOnly = "readonly";

        stateObj.entities.map((element, i) => {
            if (element.name == "change_password") {
                entitiesObjects[i].disabled = "disabled";
                entitiesObjects[i].toggle = "hide";
                entitiesObjects[i].colClass = "hide";
            } else {
                entitiesObjects[i].readonly = readOnly;

            }
        })
        return entitiesObjects;
    }

    updateStates(stateObj) {
        this.setState({ ...stateObj }, () => { console.log(stateObj); })
    }

    specialValidationforUpdate(fieldName, hasErr) {
        if (fieldName == "password" || fieldName == "confirm_password" || fieldName == "username") {
            if (this.state.states.params.encrypt_id != null && !this.state.states.params.isPasswordChange) {
                hasErr = false;
            }
        }
        return hasErr;
    }


    async saveDataApiCall(params) {

        this.setState({ preLoading: true });

        let callApi = (params.encrypt_id != null) ?
            customerService.update(params) :
            customerService.create(params);

        callApi.then(response => {
            let data = response.data;
            console.log(data);
            if (!data.status) { // errors
                this.child.current.showServerErrorMsg(data.message);
                this.child.current.disableSubmitButton(false);
                // this.setState({ preLoading: false });

            } else { // success
                // this.setState({ action: "list" });
                this.child.current.setStatusMsg("success", data.message)
                setInterval(() => {
                    this.child.current.emptyStatusMsg(true);
                }, 3000);
            }
        }).catch(e => {
            this.child.current.setStatusMsg("danger", "Something went wrong")
            this.setState({ preLoading: false });

        });
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    {(this.state.states.submitted) ? <Navigate to={`/${this.state.states.listLink}/list`} /> : ""}
                </div>
                {
                    <>
                        < FormImage
                            entities={this.state.entities}
                            states={this.state.states}
                            action={this.state.action}
                            viewEncryptId={this.state.viewEncryptId}
                            changePasswordButton={(fieldName, trigger) => this.changePasswordButton(fieldName, trigger)}
                            specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                            saveDataApiCall={(params) => this.saveDataApiCall(params)}
                            ref={this.child}
                            preLoading={this.state.preLoading} />
                    </>
                }
            </React.Fragment>
        )
    }
}
export default Index;

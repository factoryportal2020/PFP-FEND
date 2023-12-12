import React from 'react';
import { formEntities } from './Entity';
import FormImage from '../../components/forms/FormImage';
import workerService from '../../services/worker.service';
import { Navigate } from 'react-router-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            // form
            states: {
                title: "Worker",
                listLink: "worker",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }, { id: "login_detail", tab: "Login Detail" }],
                params: {
                    encrypt_id: null,
                    deleteImages: [], // Edit purpose
                    isPasswordChange: false,
                    first_name: "",
                    last_name: "",
                    code: "",
                    email: "",
                    phone_no: "",
                    whatsapp_no: "",
                    instagram_id: "",
                    gender: "",
                    address: "",
                    state: "",
                    specialist: "",
                    city: "",
                    notes: "",
                    username: "",
                    password: "",
                    profile_image: [],
                    status: 1,

                    old_username: "",

                },
                validations: {
                    hasFirst_nameRequired: true,
                    hasLast_nameRequired: true,
                    hasEmailRequired: true,
                    hasEmailEmail: true,
                    hasPhone_noRequired: true,
                    hasPhone_noPhone_no: false,
                    hasGenderRequired: true,
                    hasCityRequired: true,
                    hasStateRequired: true,

                    //Inital false
                    hasProfile_imageImage: false,

                    hasUsernameHave_to: false,
                    hasUsernameHave: false,

                    hasPasswordHave_to: false,
                    hasPasswordHave: false,

                    hasConfirm_passwordHave_to: false,
                    hasConfirm_passwordEqual: false,
                },
                validate: false,

            },
            entities: formEntities,
            action: props.action,
            viewEncryptId: (props.viewEncryptId) ? props.viewEncryptId : null,
            preLoading: true,
        }
        this.changePasswordButton = this.changePasswordButton.bind(this);
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
    }

    componentDidMount() {
        //Edit
        let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        if ((encrypt_id != null && this.state.action == "form")) {
            this.dataInit(encrypt_id);
        }
        //add
        if ((encrypt_id == null && this.state.action == "form")) { this.setState({ preLoading: false }) }
        // View
        if ((this.state.viewEncryptId != null && this.state.action == "view")) {
            this.dataInit(this.state.viewEncryptId);
        }
    }

    componentWillUnmount() {
        this.disabledAllInputs(false);
    }

    dataInit(encrypt_id) {
        workerService.get(encrypt_id)
            .then(async (response) => {
                let responseData = response.data;
                let updateData = responseData.data;


                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.child.current.showServerErrorMsg(responseData.message);
                    return;
                }

                let workerData = updateData.worker;
                let userData = updateData.user;
                let profile_imageData = updateData.profile_image;

                let params = { ...this.state.states.params };

                let updatedData = { ...params, ...workerData, ...userData, ...profile_imageData };

                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    entitiesObjects = this.updatedChangePasswordEntities("change_password", "show");
                }
                stateObj.entities = entitiesObjects;

                stateObj.states.params = updatedData;
                stateObj.states.params.encrypt_id = encrypt_id;
                stateObj.states.params.old_username = (userData.username) ? userData.username : "";
                stateObj.preLoading = false;
                this.updateStates(stateObj);

            })
            .catch(e => {
                console.log(e);
            });
    }

    changePasswordButton(fieldName, trigger) {
        let stateObj = { ...this.state };
        let entitiesObjects = this.updatedChangePasswordEntities(fieldName, trigger);
        stateObj.entities = entitiesObjects;
        this.updateStates(stateObj);
    }


    updatedChangePasswordEntities(fieldName, changePasswordtrigger) {
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


    disabledAllInputs(disableTrigger = true) {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;

        stateObj.entities.map((element, i) => {
            if (element.name == "change_password") {
                entitiesObjects[i].disabled = (disableTrigger == true) ? "disabled" : "";
                entitiesObjects[i].toggle = "hide";
                entitiesObjects[i].colClass = "hide";
            }
            else if (element.name == "code") {
                entitiesObjects[i].readonly = "readonly";
            }
            else {
                entitiesObjects[i].readonly = (disableTrigger == true) ? "readonly" : "";
            }
        })
        return entitiesObjects;
    }

    updateStates(stateObj) {
        this.setState({ ...stateObj }, () => { })
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
            workerService.update(params) :
            workerService.create(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
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

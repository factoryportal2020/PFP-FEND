import React from 'react';
import { formEntities } from './Entity';
import FormImage from '../../components/forms/FormImage';
import workerService from '../../services/worker.service';
import profileService from '../../services/profile.service';
import { Navigate } from 'react-router-dom';
import View from './View';
import { workerTaskWorkerId } from '../../features/auth/viewSlice';
import { changeNavMenu } from '../../features/auth/authSlice';
import { connect } from 'react-redux';

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.auth);
        this.child = React.createRef();
        const role = (props.auth.userInfo?.role) ? props.auth.userInfo.role : localStorage.getItem('role')

        this.state = {
            // form
            apiService: (role == "worker") ? profileService : workerService,
            states: {
                title: (role == "worker") ? "Profile" : "Worker",
                listLink: "worker",
                editLink: (role == "worker") ? "profile" : "worker",
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
                    tasks_count: {},
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
                    hasPassword_confirmationEqual: false,
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

    componentWillReceiveProps(nextProps) {
        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            let stateObj = { ...this.state };
            stateObj.preLoading = true;
            stateObj.viewEncryptId = nextProps.viewEncryptId;
            this.setState({ ...stateObj }, () => { })
            this.dataInit(nextProps.viewEncryptId);
        }
    }

    componentWillUnmount() {
        this.disabledAllInputs(false);
    }

    workerTaskWorkerId(worker_id) {
        let menuName = "Task";
        this.props.workerTaskWorkerId(worker_id);
        this.props.changeNavMenu(menuName)
    }

    dataInit(encrypt_id) {
        this.state.apiService.get(encrypt_id)
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

                console.log("worker datainit datas : ");
                console.log(updatedData);
                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    // entitiesObjects = this.updatedChangePasswordEntities("change_password", "show");
                }
                // stateObj.entities = entitiesObjects;

                stateObj.states.params = updatedData;
                stateObj.states.params.encrypt_id = encrypt_id;
                stateObj.states.params.old_username = (userData.username) ? userData.username : "";
                stateObj.preLoading = false;
                this.setState({ ...stateObj }, () => { this.changePasswordButton("change_password", "show") })
            })
            .catch(e => {
                console.log(e);
                this.setState({ preLoading: false })
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
            if (element.name == "username" || element.name == "password" || element.name == "password_confirmation") {
                if (changePasswordtrigger == "show") {
                    readOnly = "readonly";
                    stateObj.states.params.password = "";
                    stateObj.states.params.password_confirmation = "";
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
                console.log("username");
                console.log(stateObj.states.params.username);
                let label = (username == null || username == "") ? "Create Username & Password" : "Change Username & Password";

                stateObj.states.params.isPasswordChange = false;

                if (changePasswordtrigger == "hide") {
                    if (entitiesObjects[i].label != "No Changes in Username & password") {
                        stateObj.states.params.isPasswordChange = true;
                        label = "No Changes in Username & password";
                    } else {
                        stateObj.states.params.username = stateObj.states.params.old_username;
                        stateObj.states.params.password = "";
                        stateObj.states.params.password_confirmation = "";
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
        if (fieldName == "password" || fieldName == "password_confirmation" || fieldName == "username") {
            if (this.state.states.params.encrypt_id != null && !this.state.states.params.isPasswordChange) {
                hasErr = false;
            }
        }
        return hasErr;
    }


    async saveDataApiCall(params) {

        this.setState({ preLoading: true });
        let callApi = (params.encrypt_id != null) ?
            this.state.apiService.update(params) :
            this.state.apiService.create(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                this.child.current.setStatusMsg("success", data.message)
                console.log("gfggf");
                setInterval(() => {
                    this.child.current.emptyStatusMsg(true);
                    let stateObj = { ...this.state };
                    stateObj.states.submitted = true
                    this.setState({ ...stateObj }, () => { })
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
                    {(this.state.states.submitted) ?
                        (this.state.states.editLink === "profile") ?
                            <Navigate to={`/${this.state.states.editLink}`} />
                            : <Navigate to={`/${this.state.states.editLink}/list`} />

                        : ""}
                </div>
                {
                    <>
                        {
                            ((this.state.viewEncryptId != null && this.state.action == "view")) ?
                                <View
                                    entities={this.state.entities}
                                    states={this.state.states}
                                    action={this.state.action}
                                    viewEncryptId={this.state.viewEncryptId}
                                    clickTaskDetail={(worker_id) => this.workerTaskWorkerId(worker_id)}
                                    ref={this.child}
                                    preLoading={this.state.preLoading}
                                />
                                :
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
                        }
                    </>
                }
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    workerTaskWorkerId: (payload) => dispatch(workerTaskWorkerId(payload)),
    changeNavMenu: (payload) => dispatch(changeNavMenu(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Index);

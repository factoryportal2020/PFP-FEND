import React, { Suspense } from 'react';
import { formEntities } from '../../../jewell/pages/customer/Entity';
import FormImage from '../../../jewell/components/forms/FormImage';
import customerService from '../../../jewell/services/customer.service';
import profileService from '../../../jewell/services/profile.service';
import apisService from '../../services/api.service';
import { Navigate } from 'react-router-dom';
import View from '../../../jewell/pages/customer/View';
import { connect } from 'react-redux';
// const FormImage = React.lazy(() => import('../../components/forms/FormImage'));


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        const stateEntities = formEntities
        const role = (props.websiteAuth?.userInfo?.role) ? props.websiteAuth.userInfo.role : localStorage.getItem('role')
        const adminInfo = (props.adminAuth) ? props.adminAuth.adminInfo : null;
        const site_url = (adminInfo && adminInfo.site_url) ? adminInfo.site_url : "undefined";
        this.state = {
            // form
            apiService: (role == "customer") ? customerService : profileService,
            states: {
                title: (role == "customer") ? "Profile" : "Customer",
                listLink: "customer",
                editLink: (role == "customer") ? site_url + "/profile" : "customer",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }, { id: "login_detail", tab: "Login Detail" }],
                validate: false,
                site_url: site_url,
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
                    city: "",
                    notes: "",
                    username: "",
                    password: "",
                    profile_image: [],
                    status: 1,
                    old_username: "",
                    enquiry_count: 0,
                    favourite_count: 0,
                    subscribed_email: "",
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
                }
            },
            entities: stateEntities,
            action: props.action,
            viewEncryptId: (props.viewEncryptId) ? props.viewEncryptId : null,
            preLoading: true,
        }
        this.changePasswordButton = this.changePasswordButton.bind(this);
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
    }

    componentDidMount() {
        //Edit
        let encrypt_id = (window.location.pathname.split('/')[4]) ? window.location.pathname.split('/')[4] : null;
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
        this.disabledAllInputs(false); //
    }

    dataInit(encrypt_id) {
        apisService.getProfile(encrypt_id)
            .then(async (response) => {
                let responseData = response.data;
                let updateData = responseData.data;

                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.child.current.showServerErrorMsg(responseData.message);
                    return;
                }

                let customerData = updateData.customer;
                let userData = updateData.user;
                let enquiriesData = updateData.enquiries;
                let favouritesData = updateData.favourites;
                let subscribeData = updateData.subscribe;
                let profile_imageData = updateData.profile_image;

                let params = { ...this.state.states.params };

                let updatedData = {
                    ...params, ...customerData, ...userData, ...profile_imageData,
                    ...enquiriesData, ...favouritesData, ...subscribeData
                };
                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    // entitiesObjects = this.updatedChangePasswordEntities("change_password", "show");
                }
                stateObj.entities = entitiesObjects;

                stateObj.states.params = updatedData;
                stateObj.states.params.encrypt_id = encrypt_id;
                stateObj.states.params.old_username = (userData.username) ? userData.username : "";
                stateObj.preLoading = false;
                // this.updateStates(stateObj);
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
        this.setState({ ...stateObj }, () => {
            // console.log(stateObj) 
        })
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
            apisService.updateProfile(params) :
            this.state.apiService.create(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                // this.setState({ action: "list" });
                this.child.current.setStatusMsg("success", data.message)
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
                            <Navigate to={`/${this.state.states.site_url}/${this.state.states.editLink}`} />
                            : <Navigate to={`/${this.state.states.site_url}/home`} />

                        : ""}
                </div>
                {
                    <>
                        <div className='m-t-100 m-b-30'>
                            {/* <Suspense fallback={<div>Loading...</div>}> */}

                            {
                                ((this.state.viewEncryptId != null && this.state.action == "view")) ?
                                    <View
                                        entities={this.state.entities}
                                        states={this.state.states}
                                        action={this.state.action}
                                        viewEncryptId={this.state.viewEncryptId}
                                        enquiryLink={`/${this.state.states.site_url}/enquiry`}
                                        favouriteLink={`/${this.state.states.site_url}/favourite`}
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
                            {/* </Suspense> */}
                        </div>

                    </>
                }
            </React.Fragment>
        )
    }
}

// const statesDatas = () => {
//     fetch('jewell/pages/customer/Entity.json', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     }
//     )
//         .then(response => {
//             console.log(response);
//             return response;
//         }).catch(Error => {
//             console.log(Error);
//         });
// }

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, null)(Index);

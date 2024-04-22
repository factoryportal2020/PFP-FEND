import React from 'react';
import { formEntities } from './Entity/Register';
import Form from '../../../../jewell/components/forms/Form';
import { connect } from 'react-redux';

import StatusBar from '../../../components/layouts/StatusBar';
import Preloader from '../../../components/layouts/Preloader';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// auth
import { registerUser } from '../../../features/auth/webAuctions';
import { emptyStatus } from '../../../features/auth/websiteSlice';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.child = React.createRef();
        this.state = {
            // form
            states: {
                title: "Register",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [],
                params: {
                    encrypt_id: null,
                    email: "",
                    phone_no: "",
                    username: "",
                    password: "",
                },
                validations: {
                    hasEmailRequired: true,
                    hasEmailEmail: true,
                    hasPhone_noRequired: true,
                    hasPhone_noPhone_no: false,
                    hasUsernameRequired: true,
                    hasPasswordRequired: true,
                    hasPassword_confirmationRequired: true,
                    hasPassword_confirmationEqual: false,
                },
                validate: false,
            },
            status: { show: false, type: 'success', msg: '' },
            submitted: false,
            entities: formEntities,
            action: "Edit",

            auth: { ...props.websiteAuth },
            adminAuth: { ...props.adminAuth }

        }
        console.log(props)
    }

    componentWillReceiveProps(nextProps) {
        let auth = nextProps.websiteAuth;
        let adminAuth = nextProps.adminAuth;
        console.log(adminAuth);
        if ((!auth.success) && (auth.errorsModalTrigger == "d-block") && auth.errors) { //errors block display
            (async () => {
                await this.showServerErrorMsg(auth.errors)
            })();
        }

        if ((!auth.success) && (auth.errorsModalTrigger == "fade") && (auth.message != "")) { //single success message display
            (async () => {
                await this.setStatusMsg("success", auth, false, false);
                setInterval(() => { this.onStatusClose() }, 3000);
            })();
        }

        if (auth.success) { // status success for both register and login
            console.log(auth);
            (async () => {
                await this.setStatusMsg("success", auth, false, true);
            })();
            setInterval(() => { this.onSubmitChange() }, 3000);
        }
        if (this.state.adminAuth != nextProps.adminAuth) {
            let stateObj = { ...this.state };
            stateObj.adminAuth = nextProps.adminAuth;
            this.setState({ ...stateObj }, () => { });
        }
    }

    async showServerErrorMsg(message) {
        let stateObj = { ...this.state };
        var msg = message;

        if (typeof msg == "string") {
            msg = { "msg": [message] };
        }

        if (!Array.isArray(Object.values(msg))) {
            msg = { "msg": ["Server Error"] };
        }
        stateObj.auth['errors'] = msg;
        stateObj.auth['errorsModalTrigger'] = "d-block";
        stateObj.auth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { });
    }

    async setStatusMsg(type, auth, submitted, preLoading) { //success
        let stateObj = { ...this.state };
        stateObj.status = { show: true, type: type, msg: auth.message };
        stateObj.submitted = submitted;
        stateObj.auth['preLoading'] = preLoading;
        this.setState({ ...stateObj }, () => { this.props.emptyStatus(); });
    }

    onSubmitChange() {
        let stateObj = { ...this.state };
        let status = { show: false, type: 'success', msg: '' }
        stateObj.status = status
        stateObj.auth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { this.props.emptyStatus(); this.setState({ submitted: true }) });
    }

    clickErrorModalClose() { //from register
        let stateObj = { ...this.state };
        stateObj.auth['errors'] = [];
        stateObj.auth['errorsModalTrigger'] = "fade";
        stateObj.auth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { this.props.emptyStatus() });
    }

    async saveDataApiCall(params) { //register
        let stateObj = { ...this.state };
        stateObj.auth['preLoading'] = true;
        params.role = 3;
        params.adminToken = this.state.adminAuth.adminToken;
        this.setState({ ...stateObj }, () => {
            (async () => {
                await this.props.registerUser(params)
            })();
        });
    }

    specialValidationforUpdate(fieldName, hasErr) {
        return hasErr;
    }


    render() {
        return (
            <>
                <div className='row login-row'>
                    {/* <div className='login-small-round vertical right'>

                        <div className='login-small-round-content'>
                            <a href="/">
                                Pocket<br />Poche<br />Admin
                            </a>
                        </div>
                    </div> */}

                    <div className='col-sm login-form-card m-b-20'>
                        {(this.state.submitted) ?
                            <Navigate to={`/${this.state.adminAuth.adminInfo.site_url}/login`} /> : ""
                        }
                        <StatusBar status={this.state.status} onStatusClose={this.onStatusClose} />

                        {this.state.auth.preLoading ? <Preloader /> : ""}
                        <div className="card login-card">
                            <div className="login-card-header">
                                Register New Account
                            </div>

                            <div className="card-body">
                                <form>
                                    <>
                                        < Form
                                            entities={this.state.entities}
                                            states={this.state.states}
                                            action={this.state.action}
                                            saveDataApiCall={(params) => this.saveDataApiCall(params)}
                                            clickErrorModalClose={() => this.clickErrorModalClose()}
                                            specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                            ref={this.child}

                                            errorsModalTrigger={this.state.auth.errorsModalTrigger}
                                            errors={this.state.auth.errors}
                                        />
                                    </>
                                    <hr className='login-hr'></hr>
                                    <div className='d-flex justify-content-between fs-14 brown'>
                                        {(this.state.adminInfo) ?
                                            <>
                                                <Link to={`${this.state.adminAuth.adminInfo.site_url}/login`} className="brown">
                                                    Login
                                                </Link>
                                                <Link to={`${this.state.adminAuth.adminInfo.site_url}/login`} className="brown">
                                                    Have a problem in Register ?
                                                </Link>
                                            </>
                                            : ""}
                                    </div>
                                </form>

                            </div>
                        </div >
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    registerUser: (payload) => dispatch(registerUser(payload)),
    emptyStatus: () => dispatch(emptyStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);



{/* <div className="form-group mt-4">
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
</div>
<div className="form-group mt-4">
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Mobile no" />
</div>
<div className="form-group mt-4">
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
</div>
<div className="form-group mt-4">
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
</div> */}


{/* <div className="form-check mt-4">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
</div> */}




// async saveDataApiCall(params) {

//     // this.setState({ preLoading: true });

//     let result = this.props.registerUser(params)
//     console.log(result);
//     // let callApi = (params.encrypt_id != null) ?
//     //     registerService.update(params) :
//     //     registerService.create(params);

//     // callApi.then(response => {
//     //     let data = response.data;
//     //     console.log(data);
//     //     if (!data.status) { // errors
//     //         this.child.current.showServerErrorMsg(data.message);
//     //         // this.setState({ preLoading: false });
//     //     } else { // success
//     //         // this.setState({ action: "list" });
//     //         this.child.current.setStatusMsg("success", data.message)
//     //         setInterval(() => {
//     //             this.child.current.emptyStatusMsg(true);
//     //         }, 3000);
//     //     }
//     // }).catch(e => {
//     //     this.child.current.setStatusMsg("danger", "Something went wrong")
//     //     this.setState({ preLoading: false });

//     // });
// }
import React from 'react';
import { formEntities } from './Entity/ForgetPassword';
import Form from '../../components/forms/Form';
import { connect } from 'react-redux';

import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { Link } from 'react-router-dom';
// auth
import { sendPasswordResetLink } from '../../features/auth/authAuctions';
import { emptyStatus } from '../../features/auth/authSlice';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            // form
            states: {
                title: "Send Password Reset Link",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [],
                params: {
                    email: "",
                },
                validations: {
                    hasEmailRequired: true,
                    hasEmailEmail: true
                },
                validate: false,
            },
            status: { show: false, type: 'success', msg: '' },
            submitted: false,
            entities: formEntities,
            action: "Edit",
            auth: { ...props.auth }
        }
    }

    componentWillReceiveProps(nextProps) {
        let auth = nextProps.auth;

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

    async sendPasswordResetApiCall(params) { //register
        let stateObj = { ...this.state };
        stateObj.auth['preLoading'] = true;
        this.setState({ ...stateObj }, () => {
            (async () => {
                await this.props.sendPasswordResetLink(params)
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
                    <div className='login-small-round vertical right'>

                        <div className='login-small-round-content'>
                            <a href="/">
                                Pocket<br />Poche<br />Admin
                            </a>
                            {/* <h6 className='grey'>Task Management Portal</h6> */}
                        </div>
                    </div>

                    <div className='col-sm login-form-card mt-5'>
                        {(this.state.submitted) ?
                            <Navigate to={'/login'} /> : ""
                        }
                        <StatusBar status={this.state.status} onStatusClose={this.onStatusClose} />

                        {this.state.auth.preLoading ? <Preloader /> : ""}
                        <div className="card login-card">
                            <div className="login-card-header">
                                Reset Password
                            </div>

                            <div className="card-body">
                                <form>
                                    <>
                                        < Form
                                            entities={this.state.entities}
                                            states={this.state.states}
                                            action={this.state.action}
                                            saveDataApiCall={(params) => this.sendPasswordResetApiCall(params)}
                                            clickErrorModalClose={() => this.clickErrorModalClose()}
                                            specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                            ref={this.child}

                                            errorsModalTrigger={this.state.auth.errorsModalTrigger}
                                            errors={this.state.auth.errors}
                                        />
                                    </>
                                    <hr className='login-hr'></hr>
                                    <div className='d-flex justify-content-between fs-14 brown'>
                                        <Link to='/login' className="brown">
                                            Login
                                        </Link>
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
    sendPasswordResetLink: (payload) => dispatch(sendPasswordResetLink(payload)),
    emptyStatus: () => dispatch(emptyStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

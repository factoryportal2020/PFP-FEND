import React from 'react';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import Register from './Register';
import { connect } from 'react-redux';
import { FormComponent } from './FormComponent';
import CustomerList from '../../../jewell/pages/customer/List';
import { Navigate } from 'react-router-dom';
import Preloader from '../../components/layouts/Preloader';
// import { emptyStatus } from '../../features/auth/authSlice';

// auth
import { registerUser, userLogin } from '../../features/auth/authAuctions';
import { emptyStatus } from '../../features/auth/authSlice';


class LoginIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            //own elements
            pathname: "login",
            status: { show: false, type: 'success', msg: '' },
            submitted: false,

            //Auth
            auth: { ...props.auth }
        }
    }

    componentWillReceiveProps(nextProps) {
        let auth = nextProps.auth;
        console.log("auth");
        console.log(this.props);

        if ((!auth.success) && (auth.errorsModalTrigger == "d-block")) { //errors block display
            this.setState({ auth: { ...auth } });
        }

        if ((!auth.success) && (auth.errorsModalTrigger == "fade") && (auth.message != "")) { //single success message display
            let stateObj = { ...this.state };
            stateObj.status = { show: true, type: "error", msg: auth.message };
            stateObj.submitted = false;
            stateObj.auth['preLoading'] = false;
            this.setState({ ...stateObj });
        }

        if (auth.success) { // status success for both register and login
            (async () => {
                await this.setStatusMsg("success", auth);
                // setInterval(() => {
                this.setUserInfo(auth);
                // }, 3000);
            })();
        }

        // let pathname = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : "login";
        // console.log(pathname);
        // this.setState({ pathname: pathname });
    }

    componentDidMount() {
        //console.log(this.state.auth);
        let pathname = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : "login";
        this.setState({ pathname: pathname });
    }

    async setStatusMsg(type, auth) { //success
        let stateObj = { ...this.state };
        stateObj.status = { show: true, type: type, msg: auth.message };
        stateObj.submitted = true;
        stateObj.auth['preLoading'] = true;
        this.setState({ ...stateObj }, () => { });
    }

    async setUserInfo(auth) { //success
        let stateObj = { ...this.state };

        if (auth.userInfo && auth.userToken) {
            // document.body.dataset.pageVersion = 'dashboard';
            stateObj.auth['userInfo'] = auth.userInfo;
            stateObj.auth['userToken'] = auth.userToken;
        }

        this.setState({ ...stateObj }, () => { //only for: after register successfully submitted
            setInterval(() => {
                this.loginPageRedirect();
            }, 2000);
        });
    }

    onStatusClose() {
        let stateObj = { ...this.state };
        let status = { show: false, type: 'success', msg: '' }
        stateObj.status = status
        this.setState({ ...stateObj }, () => { this.props.emptyStatus() });
    }

    loginPageRedirect() { //from register
        let stateObj = { ...this.state };
        stateObj.pathname = "login"
        stateObj.auth['preLoading'] = false;
        this.setState({ ...stateObj }, () => {
            setInterval(() => {
                this.onStatusClose();
            }, 3000);
        });
    }

    clickErrorModalClose() { //from register
        let stateObj = { ...this.state };
        stateObj.auth['errors'] = [];
        stateObj.auth['errorsModalTrigger'] = "fade";
        stateObj.auth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { this.props.emptyStatus() });
    }

    async saveDataApiCall(params) { //register
        await this.props.registerUser(params)
    }

    async loginApiCall(params) {
        let stateObj = { ...this.state };
        stateObj.auth['preLoading'] = true;
        this.setState({ ...stateObj }, () => {
            (async () => {
                await this.props.userLogin(params)
            })();

        });
    }

    render() {
        return (
            <>
                {
                    (this.state.auth.userToken && this.state.auth.userInfo) ?
                        <Navigate to={'/profile'} replace="true" /> :
                        <>
                            {this.state.auth.preLoading ? <Preloader /> : ""}

                            <div className='row login-row'>
                                <div className='login-small-round vertical right'>

                                    <div className='login-small-round-content'>
                                        <a href="/">
                                            Pocket<br />Poche<br />Admin
                                        </a>
                                        {/* <h6 className='grey'>Task Management Portal</h6> */}
                                    </div>
                                </div>


                                <FormComponent
                                    pathname={this.state.pathname}
                                    auth={this.state.auth}
                                    status={this.state.status}
                                    submitted={this.state.submitted}
                                    onStatusClose={() => this.onStatusClose()}
                                    clickErrorModalClose={() => this.clickErrorModalClose()}
                                    loginApiCall={(params) => this.loginApiCall(params)}
                                    saveDataApiCall={(params) => this.saveDataApiCall(params)}
                                />
                            </div>
                        </>
                }
            </>
        )
    }
}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    registerUser: (payload) => dispatch(registerUser(payload)),
    userLogin: (payload) => dispatch(userLogin(payload)),
    emptyStatus: () => dispatch(emptyStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginIndex);

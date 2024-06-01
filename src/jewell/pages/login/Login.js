import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { formEntities, formStates } from './Entity/Login';
import { Link } from 'react-router-dom';
import Form from '../../components/forms/Form';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';

// import { emptyStatus } from '../../features/auth/authSlice';

// auth
import { userLogin } from '../../features/auth/authAuctions';
import { emptyStatus } from '../../features/auth/authSlice';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {

            //own elements
            status: { show: false, type: 'success', msg: '' },
            submitted: false,
            states: formStates,
            entities: formEntities,

            //Auth
            auth: { ...props.auth }
        }

        this.onStatusClose = this.onStatusClose.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        let auth = nextProps.auth;
        console.log(auth);
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
                await this.setStatusMsg("success", auth, true, true);
                await this.setUserInfo(auth);
            })();
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
        this.setState({ ...stateObj }, () => { });
    }

    async setUserInfo(auth) { //success
        let stateObj = { ...this.state };
        if (auth.userInfo && auth.userToken) {
            // document.body.dataset.pageVersion = 'dashboard';
            stateObj.auth['userInfo'] = auth.userInfo;
            stateObj.auth['userToken'] = auth.userToken;
        }
        this.setState({ ...stateObj }, () => { });
    }

    onStatusClose() {
        let stateObj = { ...this.state };
        let status = { show: false, type: 'success', msg: '' }
        stateObj.status = status
        this.setState({ ...stateObj }, () => { this.props.emptyStatus() });
    }

    clickErrorModalClose() { //from register
        let stateObj = { ...this.state };
        stateObj.auth['errors'] = [];
        stateObj.auth['errorsModalTrigger'] = "fade";
        stateObj.auth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { this.props.emptyStatus() });
    }

    async loginApiCall(params) {
        let stateObj = { ...this.state };
        stateObj.auth['preLoading'] = true;
        let paramss = { ...stateObj.states.params };
        paramss.email = "";
        paramss.password = "";
        stateObj.states.params = { ...paramss };
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
                                {/* <div className='col-sm-2'>
                                    <div className='login-small-round vertical right'>

                                        <div className='login-small-round-content'>
                                            <a href="/">
                                                Pocket<br />Poche<br />Admin
                                            </a>
                                            <h6 className='grey'>Task Management Portal</h6>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='col-sm-6'>
                                    <h2 className='mt-5 ms-5 poppins-bold-family theme-yellow'>Pocket Ecommerce, Admin</h2>
                                    <h5 className='mt-2 ms-5 brown'>Manage in your pocket </h5>
                                    <div class="boxing">
                                        <div class="box">
                                            <div class="box-item color1">
                                                {/* <div class="box-image">
                                                    <img src="/nexware-learn/login_screen/images/customer.png" />
                                                </div>
                                                <div class="box-body">
                                                    <div class="box-head">
                                                        Customer
                                                    </div>
                                                    <div class="box-content">
                                                        Manage your valid customers
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div class="box-item color2"></div>
                                            <div class="box-item color3"></div>
                                        </div>
                                        <div class="box">
                                            <div class="box-item color4"></div>
                                            <div class="box-item color5"></div>
                                            <div class="box-item color6"></div>
                                        </div>
                                        <div class="box">
                                            <div class="box-item color7"></div>
                                            <div class="box-item color8"></div>
                                            <div class="box-item color9"></div>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-sm-6'>

                                <div className='login-form-card mt-5'>
                                        <StatusBar status={this.state.status} onStatusClose={this.onStatusClose} />
                                        <div className="card login-card">
                                            <div className="login-card-header">
                                                Sign into your account
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <>
                                                        < Form
                                                            entities={this.state.entities}
                                                            states={this.state.states}
                                                            action={this.state.action}
                                                            saveDataApiCall={(params) => this.loginApiCall(params)}
                                                            clickErrorModalClose={() => this.clickErrorModalClose()}
                                                            ref={this.child}
                                                            errorsModalTrigger={this.state.auth.errorsModalTrigger}
                                                            errors={this.state.auth.errors}
                                                        />
                                                    </>
                                                    {/* <div className='clearfix'></div> */}
                                                    <hr className='login-hr'></hr>
                                                    <div className='text-center'>
                                                        <button type="submit" className="login__submit">
                                                            <i className='fa-solid fab fa-google red'></i>&nbsp;&nbsp;Login with Google
                                                        </button>


                                                        <button type="submit" className="login__submit">
                                                            <i className='fa-solid fab fa-facebook fb-blue'></i>&nbsp;&nbsp;Login with Facebook
                                                        </button>
                                                    </div>
                                                    <hr className='login-hr'></hr>
                                                    <div className='d-flex justify-content-between fs-13'>
                                                        <Link to='/forget/password' className="theme-red notextDecor">
                                                            Forget Password
                                                        </Link>&nbsp;&nbsp;
                                                        <Link to='/' className="theme-red notextDecor">
                                                            Have a problem in login ?
                                                        </Link>
                                                    </div>
                                                    <hr className='login-hr'></hr>
                                                    <div className='text-center'>
                                                        <Link to='/register' className="login__submit">Signup</Link>
                                                    </div>
                                                </form>
                                            </div>
                                        </div >
                                    </div>
                                </div>
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
    userLogin: (payload) => dispatch(userLogin(payload)),
    emptyStatus: () => dispatch(emptyStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

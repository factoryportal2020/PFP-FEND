import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { formEntities, formStates } from './Entity/Login';
import { Link } from 'react-router-dom';
import Form from '../../../../jewell/components/forms/Form';
import StatusBar from '../../../components/layouts/StatusBar';
import Preloader from '../../../components/layouts/Preloader';

// import { emptyStatus } from '../../features/auth/authSlice';

// auth
import { userLogin } from '../../../features/auth/webAuctions';
import { emptyStatus } from '../../../features/auth/websiteSlice';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            redirectLink: (props.redirectLink) ? props.redirectLink : "",
            //own elements
            status: { show: false, type: 'success', msg: '' },
            submitted: false,
            states: formStates,
            entities: formEntities,

            // //Auth
            websiteAuth: { ...props.websiteAuth },
            adminAuth: { ...props.adminAuth }

        }
        console.log(this.state.redirectLink)
        this.onStatusClose = this.onStatusClose.bind(this);
        this.loginApiCall = this.loginApiCall.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        if (this.state.adminAuth != nextProps.adminAuth) {
            let stateObj = { ...this.state };
            stateObj.adminAuth = nextProps.adminAuth;
            this.setState({ ...stateObj }, () => { });
        }

        if (this.state.redirectLink != nextProps.redirectLink) {
            let stateObj = { ...this.state };
            stateObj.redirectLink = nextProps.redirectLink;
            this.setState({ ...stateObj }, () => { });
        }

        if (nextProps.websiteAuth) {
            // let stateObj = { ...this.state };
            // stateObj.websiteAuth = nextProps.websiteAuth;
            // this.setState({ ...stateObj }, () => { });
            console.log(nextProps);

            let auth = nextProps.websiteAuth;
            console.log(auth);
            // typeof auth !== 'undefined' && auth && 
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
        stateObj.websiteAuth['errors'] = msg;
        stateObj.websiteAuth['errorsModalTrigger'] = "d-block";
        stateObj.websiteAuth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { });
    }

    async setStatusMsg(type, websiteAuth, submitted, preLoading) { //success
        let stateObj = { ...this.state };
        stateObj.status = { show: true, type: type, msg: websiteAuth.message };
        stateObj.submitted = submitted;
        stateObj.websiteAuth['preLoading'] = preLoading;
        this.setState({ ...stateObj }, () => { });
    }

    async setUserInfo(websiteAuth) { //success
        let stateObj = { ...this.state };
        console.log(websiteAuth);
        if (websiteAuth.userInfo && websiteAuth.userToken) {
            console.log(websiteAuth);
            // document.body.dataset.pageVersion = 'dashboard';
            stateObj.websiteAuth['userInfo'] = websiteAuth.userInfo;
            stateObj.websiteAuth['userToken'] = websiteAuth.userToken;
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
        stateObj.websiteAuth['errors'] = [];
        stateObj.websiteAuth['errorsModalTrigger'] = "fade";
        stateObj.websiteAuth['preLoading'] = false;
        this.setState({ ...stateObj }, () => { this.props.emptyStatus() });
    }

    async loginApiCall(params) {
        console.log(params);
        let stateObj = { ...this.state };
        console.log(stateObj);
        stateObj.websiteAuth['preLoading'] = true;
        this.setState({ ...stateObj }, () => {
            console.log(stateObj);

            (async () => {
                await this.props.userLogin(params)
            })();
        });
    }

    render() {
        return (
            <>
                {
                    (this.state.websiteAuth.userToken && this.state.websiteAuth.userInfo) ?
                        <>
                            {
                                (this.state.redirectLink != "") ?
                                    <Navigate to={`/${this.state.adminAuth?.adminInfo?.site_url}/${this.state.redirectLink}`} replace="true" /> :

                                    <Navigate to={`/${this.state.adminAuth?.adminInfo?.site_url}/home`} replace="true" />
                            }
                        </>
                        :
                        <>
                            {(this.state.websiteAuth.preLoading) ? <Preloader /> : ""}
                            <div className={`${(this.state.redirectLink) ? 'ps-50 ' : 'row login-row'}`}>
                                {/* <div className='login-small-round vertical right'>

                                    <div className='login-small-round-content'>
                                        <a href="/">
                                            Pocket<br />Poche<br />Admin
                                        </a>
                                    </div>
                                </div> */}
                                <div className='login-form-card m-b-20'>
                                    <StatusBar status={this.state.status} onStatusClose={this.onStatusClose} />
                                    <div className="card login-card">
                                        <div className="login-card-header">
                                            Sigin into your account
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
                                                        errorsModalTrigger={this.state.websiteAuth.errorsModalTrigger}
                                                        errors={this.state.websiteAuth.errors}
                                                    />
                                                </>
                                                {/* <div className='clearfix'></div> */}
                                                <hr className='login-hr'></hr>
                                                <div className='text-center'>
                                                    <button type="submit" className="form-control login__submit">
                                                        <i className='fa-solid fab fa-google red'></i>&nbsp;&nbsp;Login with Google
                                                    </button>


                                                    <button type="submit" className="form-control login__submit">
                                                        <i className='fa-solid fab fa-facebook fb-blue'></i>&nbsp;&nbsp;Login with Facebook
                                                    </button>
                                                </div>
                                                <hr className='login-hr'></hr>
                                                <div className='d-flex justify-content-between fs-12 brown'>
                                                    <Link to={`/${this.state.adminAuth?.adminInfo?.site_url}/forget/password`} className="brown">
                                                        Forget Password
                                                    </Link>&nbsp;&nbsp;
                                                    <Link to='/' className="brown">
                                                        Have a problem in login ?
                                                    </Link>
                                                </div>
                                                <hr className='login-hr'></hr>
                                                <div className='text-center'>
                                                    <Link to={`/${this.state.adminAuth?.adminInfo?.site_url}/register`} className="login__submit">Signup</Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div >
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

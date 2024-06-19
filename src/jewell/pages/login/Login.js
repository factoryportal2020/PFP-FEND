import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { formEntities, formStates } from './Entity/Login';
import { Link } from 'react-router-dom';
import Form from '../../components/forms/Form';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import pocketMob from "../../theme/images/jewell/pocket-mob.png";

// import { emptyStatus } from '../../features/auth/authSlice';

// auth
import { userLogin } from '../../features/auth/authAuctions';
import { emptyStatus } from '../../features/auth/authSlice';

import Slider from "react-slick";
import Footer from '../../components/layouts/Footer';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        ""
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        ""
    );
}

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
            auth: { ...props.auth },

            //slick
            settings: {
                arrows: true,
                // dotsClass: 'slick1-dots',
                dots: false,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
                settings: 'unslick',
                slidesToShow: 2,
                slidesToScroll: 2,

                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            infinite: true,
                            speed: 500,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            // autoplay: true,
                            // autoplaySpeed: 3000,
                            arrows: true,
                            dots: true,
                            dotsClass: 'slick-dots',
                            // appendDots: dots => (
                            //     <div
                            //         style={{
                            //             textAlign: "center",
                            //             display: 'inline-block'
                            //             // borderRadius: "10px",
                            //             // padding: "10px"
                            //         }}
                            //     >
                            //         <ul style={{ margin: "0px" }}> {dots} </ul>
                            //     </div>
                            // ),

                            nextArrow: <NextArrow />,
                            prevArrow: <PrevArrow />,
                        }
                    }
                ]
            },

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
                // setInterval(() => { this.onStatusClose() }, 6000);
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

                            <div className="content-div">

                                <div className='row login-row'>


                                    <Slider {...this.state.settings}>

                                        <div className='col-sm-6 col-xs-12 title-div'>
                                            <div className='logo-corner'>
                                                <img src={pocketMob} />
                                            </div>
                                            <div className='vertical-center'>
                                                {/* E&#8209;com */}
                                                <h2 className='main_head animated zoomIn'>Admin&nbsp;<span className='grey animated slideInUp'>FOR</span></h2>
                                                <h5 className='sub_main_head animated flipInY pink'>Website </h5>
                                                <h5 className='sub_main_head animated flipInX'>Tasks </h5>
                                                <h5 className='sub_main_head animated flipInY'>Billing </h5>
                                                <h5 className='sub_main_head animated flipInX'>Branding </h5>
                                                <h5 className='sub_main_head animated flipInY'>Digitial Marketing </h5>
                                                <h6 className='sub_main_content animated jackInTheBox'>Make Business Easy</h6>
                                            </div>

                                        </div>

                                        <div className='col-sm-6 col-xs-12'>

                                            <div className='small-corner-logo'>
                                                <img src={pocketMob} />
                                            </div>
                                            <StatusBar status={this.state.status} onStatusClose={this.onStatusClose} />
                                            <div className='login-form-card'>
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
                                                            {/* <div className='text-center'>
                                                            <button type="submit" className="login__submit">
                                                                <i className='fa-solid fab fa-google red'></i>&nbsp;&nbsp;Login with Google
                                                            </button>


                                                            <button type="submit" className="login__submit">
                                                                <i className='fa-solid fab fa-facebook fb-blue'></i>&nbsp;&nbsp;Login with Facebook
                                                            </button>
                                                        </div> */}
                                                            {/* <hr className='login-hr'></hr> */}
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
                                    </Slider>

                                </div>
                            </div>
                            <Footer />
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

import React from 'react';
import { formEntities } from './Entity/ForgetPassword';
import Form from '../../components/forms/Form';
import { connect } from 'react-redux';

import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { Link } from 'react-router-dom';
import pocketMob from "../../theme/images/jewell/pocket-mob.png"

// auth
import { sendPasswordResetLink } from '../../features/auth/authAuctions';
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

                                <div className='login-form-card'>
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
                                                    <Link to='/login' className="theme-red notextDecor">
                                                        Login
                                                    </Link>
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

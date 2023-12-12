import React from 'react';
import StatusBar from '../../components/layouts/StatusBar';
import { formEntities, formStates } from './Entity/Login';
import Form from '../../components/forms/Form';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';


class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.child = React.createRef();
        this.state = {
            // form
            states: formStates,
            auth: props.auth,
            status: props.status,
            submitted: props.submitted,
            entities: formEntities,
            action: "Edit",
            pathname: props.pathname,
        }
    }

    componentWillReceiveProps(nextProps) {
        let stateObj = { ...this.state };

        if (this.state.status != nextProps.status) {
            if (nextProps.status == "error") {
                stateObj.states.submitDisabled = ""
            }
            stateObj.status = nextProps.status
        }

        this.setState({ ...stateObj }, () => {
            console.log(this.state); 
        });

    }

    render() {
        return (
            <div className='login-form-card mt-5'>

                <StatusBar status={this.state.status} onStatusClose={this.props.onStatusClose} />


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
                                    saveDataApiCall={(params) => this.props.loginApiCall(params)}
                                    clickErrorModalClose={() => this.props.clickErrorModalClose()}
                                    specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                    ref={this.child}

                                    errorsModalTrigger={this.state.auth.errorsModalTrigger}
                                    errors={this.state.auth.errors}
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
                            <div className='d-flex justify-content-between fs-14 brown'>
                                <Link to='/forget/password' className="brown">
                                    Forget Password
                                </Link>
                                <Link to='/' className="brown">
                                    Have a problem in login ?
                                </Link>
                            </div>
                            <hr className='login-hr'></hr>
                            <div className='text-center'>
                            <Link to="/register" className="form-control login__submit">Signup</Link>
                            </div>
                        </form>

                    </div>
                </div >
            </div>
        )
    }

}


export default Login;





import React from 'react';
import registerService from '../../services/register.service';
import { formEntities, formStates } from './Entity/Register';
import Form from '../../components/forms/Form';

import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Navigate } from 'react-router-dom';
import LoginIndex from './LoginIndex';


class Register extends React.Component {
    constructor(props) {
        super(props);

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

    specialValidationforUpdate(fieldName, hasErr) {
        return hasErr;
    }

    componentWillReceiveProps(nextProps) {
        let stateObj = { ...this.state };

        let auth = nextProps.auth;

        if (this.state.auth != nextProps.auth) {
            stateObj.auth = nextProps.auth
            if ((!auth.success) && (auth.errorsModalTrigger == "d-block")) {
                stateObj.auth['preLoading'] = false;
            }
        }

        if (this.state.status != nextProps.status) {
            stateObj.status = nextProps.status
        }

        if (this.state.submitted != nextProps.submitted) {
            stateObj.submitted = nextProps.submitted
        }
        this.setState({ ...stateObj }, () => {

            if ((!auth.success) && (auth.errorsModalTrigger == "d-block")) {
                this.child.current.showServerErrorMsg(auth.errors);
            }
        });

    }

    render() {
        return (
            <div className='col-sm login-form-card mt-5'>
                {(this.state.submitted) ?
                    <Navigate to={'/'} element={<LoginIndex status={this.state.status} />} /> : ""
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
                                    saveDataApiCall={(params) => this.props.saveDataApiCall(params)}
                                    clickErrorModalClose={() => this.props.clickErrorModalClose()}
                                    specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                    ref={this.child}

                                    errorsModalTrigger={this.state.auth.errorsModalTrigger}
                                    errors={this.state.auth.errors}
                                />
                            </>



                            <hr className='login-hr'></hr>

                            <div className='d-flex justify-content-between fs-14 brown'>
                                <a href='/' className="brown">
                                    Login
                                </a>
                                <a href='/' className="brown">
                                    Have a problem in Register ?
                                </a>
                            </div>
                        </form>

                    </div>
                </div >
            </div>
        )
    }

}


export default Register;




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
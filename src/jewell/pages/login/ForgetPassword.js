import React from 'react';

class ForgetPassword extends React.Component {

    componentDidMount() {
    }


    render() {
        return (
            <div className='col-sm login-form-card mt-100'>

                <div className="card login-card">
                    <div className="login-card-header">
                        Reset Password
                    </div>

                    <div className="card-body">
                        <form>
                            <div className="form-group mt-4">
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <button type="submit"
                                className="form-control btn btn-light float-end brown jewell-bg-color fs-20 font-weight-bold mt-4 mb-4">Send Password Reset Link
                            </button>
                        </form>

                    </div>
                </div >
            </div>
        )
    }

}


export default ForgetPassword;

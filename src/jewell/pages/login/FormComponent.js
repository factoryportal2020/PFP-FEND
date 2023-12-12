import React from 'react';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import Register from './Register';

export const FormComponent = React.forwardRef((props, ref) => {
    let pathname = props.pathname;
    let status = props.status;
    let auth = props.auth;
    let submitted = props.submitted;

    let elements = { pathname: pathname, auth: { ...auth }, status: status, submitted: submitted }
    // console.log(elements.status);
    switch (pathname) {
        case "login":
            return <Login
                {...elements}
                onStatusClose={props.onStatusClose}
                loginApiCall={(params) => props.loginApiCall(params)}
            />;
        case "register":
            return <Register
                {...elements}
                onStatusClose={props.onStatusClose}
                clickErrorModalClose={props.clickErrorModalClose}
                saveDataApiCall={(params) => props.saveDataApiCall(params)}
            />;
        case "forget":
            return <ForgetPassword
                {...elements}
                onStatusClose={props.onStatusClose}
                saveDataApiCall={(params) => props.saveDataApiCall(params)}
            />;
        case "reset":
            return <ResetPassword
                {...elements}
                onStatusClose={props.onStatusClose}
                saveDataApiCall={(params) => props.saveDataApiCall(params)}
            />;
        default:
            return <Login
                {...elements}
                onStatusClose={props.onStatusClose}
                loginApiCall={(params) => props.loginApiCall(params)}
            />
    }

})



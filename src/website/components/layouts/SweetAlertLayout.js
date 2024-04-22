import SweetAlert from 'react-bootstrap-sweetalert';
import { useState } from 'react';

const SweetAlertLayout = (props) => {

    let propsMessage = (props.message) ? props.message : "Here's a message!";
    let propsTitle = (props.title) ? props.title : "Here's a title!";
    const [message, setMessage] = useState(propsMessage);


    <SweetAlert
        title="Here's a message!"
        // onConfirm={props.handleLogout}
        // onCancel={onCancel}
        showCancel={true}
        focusCancelBtn={true}
    />



}
export default SweetAlertLayout

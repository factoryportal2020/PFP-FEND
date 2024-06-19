import SweetAlert from 'react-bootstrap-sweetalert';
import { useState } from 'react';

const SweetAlertLayout = (props) => {

    let propsMessage = (props.message) ? props.message : "Here's a message!";
    let propsTitle = (props.title) ? props.title : "Here's a title!";
    // const [title, setTitle] = useState(propsTitle);
    // const [message, setMessage] = useState(propsMessage);

    return (
        <SweetAlert
            title={propsTitle}
            // onConfirm={props.closeNotification}
            onConfirm={props.closeNotification}
            //  onCancel={onCancel}
            customClass={props.customClass}
            confirmBtnCssClass="white-color"
            confirmBtnText={props.confirmBtnText}

            // onCancel={onCancel}
            // showCancel={true}
            // focusCancelBtn={true}
            dependencies={[propsMessage]}
        >{propsMessage}
        </SweetAlert>
    )



}
export default SweetAlertLayout

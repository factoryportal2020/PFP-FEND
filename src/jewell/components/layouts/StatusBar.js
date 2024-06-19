import React from 'react';
import classnames from 'classnames';
// import "../../theme/css/status.scss"
import SweetAlert from 'react-bootstrap-sweetalert';
import SweetAlertLayout from './SweetAlertLayout';

export default class StatusBar extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
    }

    onStatusClose() {
        this.props.onStatusClose()
    }

    render() {
        let type = this.props.status.type;
        let classType = (type == "error") ? "danger" : type;
        let show = this.props.status.show;
        let msg = this.props.status.msg;
        return (
            (show) ?
                // <div id="statusloader">
                // {/* <div id=""> */}
                //     <div className={classnames("alert alertCustom ", `alert-${classType}`, "noborder")
                //     }>
                //         {msg}
                //         <i className="fa-solid fa-times-circle ps-5 pt-1 fs-5 floatRight" onClick={this.onStatusClose}></i>
                //     </div>
                // </div> 

                // <div id='status-container'>
                //     {(type == "success") ?
                //         <div id="success-box">
                //             <div className="face">
                //                 <div className="eye"></div>
                //                 <div className="eye right"></div>
                //                 <div className="mouth happy"></div>
                //             </div>
                //             <div className="shadow scale"></div>
                //             <div className="message"><h1 className="alert">Success!</h1><p>{msg}</p></div>
                //             <button className="button-box" onClick={this.onStatusClose}><h1 className="green">continue</h1></button>
                //         </div>
                //         :
                //         <div id="error-box">
                //             <div className="face2">``
                //                 <div className="eye"></div>
                //                 <div className="eye right"></div>
                //                 <div className="mouth sad"></div>
                //             </div>
                //             <div className="shadow move"></div>
                //             <div className="message"><h1 className="alert">Error!</h1><p>{msg}</p></div>
                //             <button className="button-box" onClick={this.onStatusClose}><h1 className="red">try again</h1></button>
                //         </div>}
                // </div>

                (type == "success") ?
                    // <div id="success-box">
                    //     <div className="face">
                    //         <div className="eye"></div>
                    //         <div className="eye right"></div>
                    //         <div className="mouth happy"></div>
                    //     </div>
                    //     <div className="shadow scale"></div>
                    //     <div className="message"><h1 className="alert">Success!</h1><p>{msg}</p></div>
                    //     <button className="button-box" onClick={this.onStatusClose}><h1 className="green">continue</h1></button>
                    // </div>
                    <SweetAlertLayout
                        customClass="success-box"
                        confirmBtnText="Continue"
                        title="Success!"
                        closeNotification={this.onStatusClose}
                        message={msg}
                    ></SweetAlertLayout>
                    :
                    <SweetAlertLayout
                        title="Error!"
                        confirmBtnText="Continue"
                        customClass="error-box"
                        closeNotification={this.onStatusClose}
                        message={msg}
                    ></SweetAlertLayout>

                : ""
        )
    }
}


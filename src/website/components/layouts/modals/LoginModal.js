import React from 'react';
import iconClose2 from "../../../theme/images/icons/icon-close2.png";
import FormImage from '../../../../jewell/components/forms/FormImage';
import apiDataService from "../../../services/api.service";
import StatusBar from '../StatusBar';
import Preloader from '../Preloader';
import ErrorModal from '../../../../jewell/modals/ErrorModal';
import Login from '../../../pages/visitors/login/Login';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        let userInfo = (props.userInfo) ? props.userInfo : "";
        this.state = {
            preLoading: false,
            successMsg: "",
            modalTrigger: props.showModalTrigger,
            productName: props.productName,
            currentEncryptID: props.currentEncryptID,
            userInfo: userInfo,
        }
        this.clickClose = this.clickClose.bind(this);
    }

    componentWillReceiveProps(newProps) {

        // if (newProps) {
        let stateObj = { ...this.state };
        stateObj.preLoading = false
        stateObj.modalTrigger = newProps.showModalTrigger
        stateObj.currentEncryptID = newProps.currentEncryptID
        stateObj.userInfo = newProps.userInfo
        this.setState({ ...stateObj }, () => { })
        // }

    }

    clickClose() {
        this.setState({ successMsg: "" }, () => { this.props.clickShowModalClose() })
    }

    render() {
        return (
            <>
                <div className={`modal mt-30 ${this.state.modalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                {
                                    (!this.state.userInfo) ?
                                        <Login redirectLink={`product/${this.state.currentEncryptID}`} /> : ""}
                                <a href="\\" className="login__submit bg-grey white ml-350" onClick={this.clickClose} >
                                    Close
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default LoginModal;
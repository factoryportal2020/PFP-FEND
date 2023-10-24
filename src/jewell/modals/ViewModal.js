import React from 'react';
import CustomerForm from '../../jewell/pages/customer/Index';


class ViewModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            viewModalTrigger: props.viewModalTrigger,
            viewEncryptId: props.viewEncryptId
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state != nextProps) {
            let stateObj = { ...this.state };
            stateObj.viewModalTrigger = nextProps.viewModalTrigger;
            stateObj.viewEncryptId = nextProps.viewEncryptId;
            this.setState({ ...stateObj });
        }
    }

    render() {
        return (
            <>
                <div className={`modal ${this.state.viewModalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content border-1-brown">
                            <div className="modal-body">
                                {(this.state.viewEncryptId != null && this.state.viewEncryptId != "") ?
                                    <CustomerForm action="view" viewEncryptId={this.state.viewEncryptId} /> : ""}
                            </div>
                            <div className="modal-footer">
                                < button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={this.props.closeViewModal}>Close</button>

                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}

export default ViewModal;
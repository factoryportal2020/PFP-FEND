import React from 'react';
import TaskForm from '../pages/task/TaskForm';
import validator from '../components/forms/validate';

class ChangeStatusModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeStatusModalTrigger: props.changeStatusModalTrigger,
            changeStatusModalEncryptId: props.changeStatusModalEncryptId,
            title: props.title
        }
        this.afterChangedStatusTrigger = this.afterChangedStatusTrigger.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (this.state != nextProps) {
            let stateObj = { ...this.state };
            stateObj.changeStatusModalTrigger = nextProps.changeStatusModalTrigger;
            stateObj.changeStatusModalEncryptId = (nextProps.changeStatusModalEncryptId) ? nextProps.changeStatusModalEncryptId : "";
            this.setState({ ...stateObj }, () => { });
        }
    }

    afterChangedStatusTrigger() {
        let stateObj = { ...this.state };
        stateObj.changeStatusModalTrigger = "fade";
        stateObj.changeStatusModalEncryptId = "";
        this.setState({ ...stateObj }, () => { this.props.afterChangedStatusTrigger() });
    }

    render() {
        let form = ""
        if ((this.state.changeStatusModalEncryptId != null && this.state.changeStatusModalEncryptId != "")) {
            form = <TaskForm action="changeStatus"
                viewEncryptId={this.state.changeStatusModalEncryptId}
                afterChangedStatusTrigger={() => this.afterChangedStatusTrigger()}
            />
        }

        return (
            <>
                <div className={`modal ${this.state.changeStatusModalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content border-1-brown">
                            <div className="modal-header">
                                <div className='w-100 text-center'>
                                    <h5 class="modal-title theme-red">{validator.toCapitalize(this.state.title)} Status Change</h5>
                                </div>
                            </div>


                            <div className="modal-body">
                                {(this.state.changeStatusModalEncryptId != null && this.state.changeStatusModalEncryptId != "") ?
                                    form : ""}
                            </div>


                            <div className="modal-footer">
                                < button type="button" className="btn btn-secondary border-radius-50" data-dismiss="modal"
                                    onClick={this.props.closeChangeStatusModal}>Close</button>

                            </div>
                        </div>
                    </div>
                </div >


            </>
        )
    }
}

export default ChangeStatusModal;
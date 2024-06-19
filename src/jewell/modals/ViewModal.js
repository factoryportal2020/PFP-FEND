import React from 'react';
import CustomerForm from '../../jewell/pages/customer/Index';
import WorkerForm from '../../jewell/pages/worker/Index';
import CategoryForm from '../../jewell/pages/category/Index';
import ProductForm from '../../jewell/pages/product/Index';
import TaskForm from '../../jewell/pages/task/TaskForm';
import validator from '../components/forms/validate';

class ViewModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModalTrigger: props.viewModalTrigger,
            viewEncryptId: props.viewEncryptId,
            prevEncryptId: "",
            nextEncryptId: "",
            title: props.title,
            encrypt_ids: props.encrypt_ids
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state != nextProps) {
            let stateObj = { ...this.state };
            stateObj.viewModalTrigger = nextProps.viewModalTrigger;
            stateObj.viewEncryptId = (nextProps.viewEncryptId) ? nextProps.viewEncryptId : "";
            stateObj.encrypt_ids = nextProps.encrypt_ids;
            this.setState({ ...stateObj }, () => { this.getPrevNextEncryptId() });
        }
    }

    getPrevNextEncryptId() {
        let encrypt_ids = this.state.encrypt_ids;
        let stateObj = { ...this.state };

        let cur_id_inx = encrypt_ids.indexOf(this.state.viewEncryptId);
        let prevEncryptId = ((cur_id_inx - 1) < 0) ? "" : encrypt_ids[cur_id_inx - 1];
        let nextEncryptId = (cur_id_inx >= (this.state.encrypt_ids.length - 1)) ? "" : encrypt_ids[cur_id_inx + 1];
        stateObj.prevEncryptId = prevEncryptId;
        stateObj.nextEncryptId = nextEncryptId;
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
    }

    render() {
        let form = ""
        if ((this.state.viewEncryptId != null && this.state.viewEncryptId != "")) {
            if (this.state.title == "customer") {
                form = <CustomerForm action="view"
                    viewEncryptId={this.state.viewEncryptId}
                />
            } else if (this.state.title == "worker") {
                form = <WorkerForm action="view"
                    viewEncryptId={this.state.viewEncryptId}
                />
            } else if (this.state.title == "category") {
                form = <CategoryForm action="view"
                    viewEncryptId={this.state.viewEncryptId}
                />
            } else if (this.state.title == "product") {
                form = <ProductForm action="view"
                    viewEncryptId={this.state.viewEncryptId}
                />
            } else if (this.state.title == "task") {
                form = <TaskForm action="view"
                    viewEncryptId={this.state.viewEncryptId}
                />
            }
        }

        return (
            <>
                <div className={`modal ${this.state.viewModalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content border-1-brown">
                            <div className="modal-header">
                                <div className='w-100'>
                                    {(this.state.prevEncryptId != "") ?
                                        <a href="#/" className='view__btn fs-14 p-2' onClick={(event) => this.props.viewModalTriggerClick(event)}
                                            id={this.state.prevEncryptId}>
                                            Prev
                                        </a> : ""}
                                </div>

                                <div className='w-100 text-center'>
                                    <h5 class="modal-title  theme-red">{validator.toCapitalize(this.state.title)} Detail</h5>
                                </div>
                                <div className='w-100 text-end'>

                                    {(this.state.nextEncryptId != "") ?

                                        <a href="#/" className='view__btn fs-14 p-2' onClick={(event) => this.props.viewModalTriggerClick(event)}
                                            id={this.state.nextEncryptId}>
                                            Next
                                        </a> : ""}
                                </div>
                            </div>


                            <div className="modal-body">
                                {(this.state.viewEncryptId != null && this.state.viewEncryptId != "") ?
                                    form : ""}
                            </div>


                            <div className="modal-footer">
                                < button type="button" className="btn btn-secondary border-radius-50" data-dismiss="modal"
                                    onClick={this.props.closeViewModal}>Close</button>

                            </div>
                        </div>
                    </div>
                </div >


            </>
        )
    }
}

export default ViewModal;
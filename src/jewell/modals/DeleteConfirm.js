import React from 'react';

class DeleteConfirm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            deleteModalTrigger: props.deleteModalTrigger,
            deleteEncryptId: props.deleteEncryptId,
            title: props.title
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state != nextProps) {
            let stateObj = { ...this.state };
            stateObj.deleteModalTrigger = nextProps.deleteModalTrigger;
            stateObj.deleteEncryptId = nextProps.deleteEncryptId;
            stateObj.title = nextProps.title;
            this.setState({ ...stateObj });
        }
    }


    render() {
        return (
            <>
                <div className={`modal ${this.state.deleteModalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Deleting record <span className='brown'>{this.state.title}</span></h5>
                                <a href="#/" onClick={this.props.closeDeleteModal}>
                                    <i className="fa-solid fa-close fs-4" />
                                </a>
                            </div>
                            <div className="modal-body">
                                <p>Are you want to delete?</p>
                            </div>
                            <div className="modal-footer">
                                < button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={this.props.closeDeleteModal}>No</button>
                                <button type="button" className="btn btn-light jewell-bg-color"
                                    onClick={this.props.deleteRecord}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}

export default DeleteConfirm;
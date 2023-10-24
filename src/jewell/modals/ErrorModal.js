import React from 'react';

class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: { ...props.errors },
            modalTrigger: props.errorsModalTrigger,
            title: props.title,
        }
        this.clickClose = this.clickClose.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps);
        this.setState({
            modalTrigger: newProps.errorsModalTrigger,
            errors: newProps.errors
        });
    }

    clickClose() {
        this.props.clickErrorModalClose()
    }

    render() {
        var errors = Object.values(this.state.errors);
        return (
            <>
                <div className={`modal ${this.state.modalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fs-16 brown" id="exampleModalLongTitle">{this.state.title} Errors</h5>
                                <a href="\\">
                                    <i className="fa-solid fa-close fs-4 brown" onClick={this.clickClose} />
                                </a>
                            </div>
                            <div className="modal-body">
                                {/* <MsgComponent errors={errors} /> */}
                                {
                                    errors.map((error, i) => {
                                        return (
                                            error.map((msg, j) => {
                                                return <h6 key={`msg${j}`} className='fs-12 red'>{msg}</h6>
                                            })
                                        )
                                    })
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clickClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const MsgComponent = (props) => {

}


export default ErrorModal;
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';


class ProgressModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: props.progress,
            progressMessage: [...props.progressMessage],
            progressTitle: props.progressTitle,

            modalTrigger: props.progressModalTrigger,
            title: props.title,
        }
        this.clickClose = this.clickClose.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // // console.log(newProps);
        // if (this.state.modalTrigger != newProps.progressModalTrigger) {
        //     this.setState({
        //         modalTrigger: newProps.progressModalTrigger,
        //     });
        // }
        // if (this.state.progressMessage != newProps.progressMessage) {

        //     this.setState({
        //         progressMessage: newProps.progressMessage,
        //         progressTitle: newProps.progressTitle
        //     });
        // }
        this.setState({
            modalTrigger: newProps.progressModalTrigger,
            progressMessage: newProps.progressMessage,
            progressTitle: newProps.progressTitle,
            progress: newProps.progress,
        });
    }

    clickClose() {
        this.props.clickProgressModalClose()
    }

    render() {
        var progress = this.state.progress;
        var progressMessage = this.state.progressMessage;
        var progressTitle = this.state.progressTitle;
        // console.log(progressMessage);
        return (
            <>
                <div className={`modal ${this.state.modalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fs-16 brown" id="progressmodaltitle">Image Upload Progress</h5>
                                <a href="\\">
                                    <i className="fa-solid fa-close fs-4 brown" onClick={this.clickClose} />
                                </a>
                            </div>
                            <div className="modal-body">
                                {
                                    progress.map(function (v, i) {
                                        return (
                                            <>
                                                <div className='border-1-brown border-radius-10 p-3 m-3'>
                                                    {
                                                        (progressMessage[i]) ?
                                                            < h6 className={`fs-14 ${progressMessage[i]['className']}`}>
                                                                <span className='grey fs-12'>{progressTitle[i]} </span>
                                                                {progressMessage[i]['msg']}
                                                            </h6 >
                                                            : ""}
                                                    < ProgressBar now={v} label={`${v}%`} variant="warning" />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clickClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        )
    }
}


export default ProgressModal;
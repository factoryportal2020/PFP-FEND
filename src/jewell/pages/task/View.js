import React from 'react';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import { TaskCardView } from './TaskCardView';
import { TaskCard } from './Card';
import { CardView } from '../../components/forms/CardView';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: { ...props.states },
            entities: [...props.entities],
            preLoading: props.preLoading,
            action: props.action,
            viewEncryptId: props.viewEncryptId,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.viewEncryptId);
        // if (this.state.states != nextProps.states) {
        let stateObj = { ...this.state };
        stateObj.states = nextProps.states;
        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            stateObj.viewEncryptId = nextProps.viewEncryptId;
        }
        stateObj.preLoading = nextProps.preLoading;
        // if (this.state.entities != nextProps.entities) {
        // stateObj.entities = nextProps.entities;
        // }
        this.setState({ ...stateObj }, () => { });
        // }
        if (this.state.preLoading != nextProps.preLoading) {
            this.setState({ preLoading: nextProps.preLoading }, () => { });
        }
    }

    render() {
        const param = this.state.states.params
        let customer = (param.customer) ? param.customer : {}
        let worker = (param.worker) ? param.worker : {}

        customer.customer_image = (customer.customer_image) ? customer.customer_image : []
        worker.worker_image = (worker.worker_image) ? worker.worker_image : []

        customer.name = (customer.name) ? customer.name : ""
        customer.code = (customer.code) ? customer.code : ""

        console.log(customer)
        console.log(worker)

        let customerImage = [];
        if (customer.customer_image.length > 0 && customer.customer_image[0].url != "") {
            customerImage.push(customer.customer_image[0]);
        }
        customer.profile_image = customerImage;

        let workerImage = [];
        if (worker.worker_image.length > 0 && worker.worker_image[0].url != "") {
            workerImage.push(worker.worker_image[0]);
        }
        worker.profile_image = workerImage;



        let status = (param.status == 1) ? "Active" : "Deactive"

        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />
                    {this.state.preLoading ? <Preloader /> : ""}
                    <div className='row'>
                        <div className='col-md'>
                            <div className="card w-auto mb-3">

                                <TaskCardView element={this.state.states.params}
                                    title={this.state.states.title}
                                    addLink={this.state.states.listLink}
                                />
                            </div>
                        </div>
                        <div className='col-md'>
                            <div className="card w-auto">
                                <div className="card-body ps-3 pe-5">
                                    <div className="card-content">
                                        <h5>Status</h5>
                                        <>
                                            <div className='row'>

                                                {
                                                    (param.task_histories.length) > 0 ?
                                                        param.task_histories.map(function (history, i) {
                                                            return (
                                                                // <div className='green fs-12 fw-normal'>
                                                                //     <span className='green fs-14'>{history.updated_by}&nbsp;</span>
                                                                //     {(i == 0) ?
                                                                //         <span className='grey'>have created status with </span> :
                                                                //         <span className='grey'>have changed status to </span>}

                                                                //     <span className='green fs-14'>{history.status} </span>
                                                                //     {(history.comment != "" && history.comment != null) ?
                                                                //         <>
                                                                //             <span className='grey'>with comment </span>
                                                                //             <span className='brown fs-10'>{history.comment} </span>
                                                                //         </> : ""}
                                                                //     <span className='grey float-end'>at&nbsp;
                                                                //         <span className='brown fs-8'>{history.updated_at}</span>
                                                                //     </span>
                                                                // </div>
                                                                <div className='green fs-12 fw-normal pb-2'>
                                                                    <span className='green fs-12'>{history.status} </span>
                                                                    <span className='grey fs-10'> Changed By </span>
                                                                    <span className='brown fs-12'>{history.updated_by}&nbsp;</span>
                                                                    <span className='grey float-end'>at&nbsp;
                                                                        <span className='brown fs-8'>{history.updated_at}</span>
                                                                    </span>
                                                                    {(history.comment != "" && history.comment != null) ?
                                                                        <><br></br><span className='brown fs-10'>&#10635;{history.comment}&#10636; </span> </> : ""}

                                                                </div>

                                                            )
                                                        })
                                                        : ""
                                                }
                                            </div>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-md'>
                            {
                                (param.worker_id != null && param.worker_id != "") ?
                                    <div className="card w-auto mb-3">
                                        <div className="card-body ps-1 pe-1">
                                            <div className="card-content">
                                                <h5>Worker</h5>
                                                <CardView element={worker}
                                                    title="Customer"
                                                    addLink="customer"
                                                // viewModalTriggerClick={(event) => this.viewModalTriggerClick(event)}
                                                // deleteModalTriggerClick={(event) => this.deleteModalTriggerClick(event)}
                                                />
                                            </div>
                                        </div>
                                    </div> : ""
                            }
                        </div>
                        <div className='col-md'>
                            {
                                (param.customer_id != null && param.customer_id != "") ?
                                    <div className="card w-auto">
                                        <div className="card-body ps-1 pe-1">
                                            <div className="card-content">
                                                <h5>Customer</h5>
                                                <CardView element={customer}
                                                    title="Customer"
                                                    addLink="customer"
                                                />
                                            </div>
                                        </div>
                                    </div> : ""
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md mob-m-t-2'>
                            <div className="card w-auto">
                                <div className="card-body ps-1 pe-3">
                                    <div className="card-content">
                                        <h5>Initial Images</h5>
                                        <div className="row pt-2">
                                            {
                                                (param.initial_image.length) > 0 ?
                                                    param.initial_image.map(function (image) {
                                                        return (
                                                            <div className="col-sm mt-2 mb-2 img-container">
                                                                <img className="img-file shadow-1-strong rounded" src={image.url} alt={image.name} />
                                                                <a href={image.url} target='_blank'>
                                                                    <i className="preview-btn fa-solid fa-eye" /></a><br></br>
                                                                <span className='fs-8 text-left grey'>{image.name}</span>

                                                            </div>

                                                        )
                                                    })
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-md mob-m-t-2'>
                        <div className="card w-auto">
                                <div className="card-body ps-1 pe-3">
                                    <div className="card-content">
                                        <h5>Working Images</h5>
                                        <div className="row pt-2">
                                            {
                                                (param.working_image.length) > 0 ?
                                                    param.working_image.map(function (image) {
                                                        return (
                                                            <div className="col-sm mt-2 mb-2 img-container">
                                                                <img className="img-file shadow-1-strong rounded" src={image.url} alt={image.name} />
                                                                <a href={image.url} target='_blank'>
                                                                    <i className="preview-btn fa-solid fa-eye" /></a><br></br>
                                                                <span className='fs-8 text-left grey'>{image.name}</span>

                                                            </div>

                                                        )
                                                    })
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-md mob-m-t-2'>
                            <div className="card w-auto">
                                <div className="card-body ps-1 pe-3">
                                    <div className="card-content">
                                        <h5>Completed Images</h5>
                                        <div className="row pt-2">
                                            {
                                                (param.completed_image.length) > 0 ?
                                                    param.completed_image.map(function (image) {
                                                        return (
                                                            <div className="col-sm mt-2 mb-2 img-container">
                                                                <img className="img-file shadow-1-strong rounded" src={image.url} alt={image.name} />
                                                                <a href={image.url} target='_blank'>
                                                                    <i className="preview-btn fa-solid fa-eye" /></a><br></br>
                                                                <span className='fs-8 text-left grey'>{image.name}</span>

                                                            </div>

                                                        )
                                                    })
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-md mob-m-t-2'>
                        <div className="card w-auto">
                                <div className="card-body ps-1 pe-3">
                                    <div className="card-content">
                                        <h5>Delivered Images</h5>
                                        <div className="row pt-2">
                                            {
                                                (param.delivered_image.length) > 0 ?
                                                    param.delivered_image.map(function (image) {
                                                        return (
                                                            <div className="col-sm mt-2 mb-2 img-container">
                                                                <img className="img-file shadow-1-strong rounded" src={image.url} alt={image.name} />
                                                                <a href={image.url} target='_blank'>
                                                                    <i className="preview-btn fa-solid fa-eye" /></a><br></br>
                                                                <span className='fs-8 text-left grey'>{image.name}</span>

                                                            </div>

                                                        )
                                                    })
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                        

                </div>
            </>
        )
    }
}



export default React.forwardRef((props, ref) =>
    <View
        innerRef={ref} {...props}
    />);


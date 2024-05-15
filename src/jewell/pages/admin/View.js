import React from 'react';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';
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
        const textentities = []
        const states = this.state.states
        const param = this.state.states.params

        let status = (param.status == 1) ? "Active" : "Deactive"

        const displayEntities = ['gender', 'address', 'city', 'state', 'notes'];



        this.state.entities.map((element, i) => {
            if (displayEntities.indexOf(element.name) > -1) {
                textentities.push(element);
            }
        });

        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />
                    {this.state.preLoading ? <Preloader /> : ""}
                    <div className='row'>
                        <div className='col-md'>
                            <div className="card w-auto">
                                <CardView element={this.state.states.params}
                                    title={this.state.states.title}
                                    addLink={this.state.states.listLink}
                                />
                                <div className="card-body ps-3">
                                    <div className="card-content mt-0">

                                        <div className='row'>
                                            <div className='col-sm-6 '>
                                                <Link to={`/${this.state.states.editLink}/edit/${param.encrypt_id}`} role="button"
                                                    type="button" className="view__btn">Edit Details</Link>
                                            </div>
                                            <div className="col-sm-6 text-end pe-5 pt-2">
                                                <div className='fs-8 pb-1'>Created At: <span className="created_at" title="Created Date"> {param.created_at}</span></div>
                                                <div className='fs-8'>Updated At: <span className="created_at" title="Created Date">{param.updated_at}</span></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md'>
                            <div className="card w-auto">
                                <div className="card-body ps-3 pe-5">
                                    <div className="card-content">
                                        <h6>Login Detail:</h6>

                                        {(param.username) ?
                                            <>
                                                <div className='row'>
                                                    <div className="col-sm">
                                                        <div className="d-flex">
                                                            <div className="fs-16 grey">Username:&nbsp;</div>
                                                            <div className="ps-1 fs-16">{param.username}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="d-flex">
                                                            <div className="fs-16 grey">Password:&nbsp;</div>
                                                            <div className="ps-1 fs-16">******</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h5 className='pt-2 fs-12'>Login attempts:</h5>

                                                <div className='row'>
                                                    <div className="col-sm-3">
                                                        <h5 className='grey fs-8'>Logged at {param.created_at}</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5 className='grey fs-8'>Logged at {param.created_at}</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5 className='grey fs-8'>Logged at {param.created_at}</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5 className='grey fs-8'>Logged at {param.created_at}</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5 className='grey fs-8'>Logged at {param.created_at}</h5>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <h5 className='grey fs-8'>Logged at {param.created_at}</h5>
                                                    </div>
                                                </div>

                                            </>
                                            :
                                            <h6 className='fs-14 grey pt-2'>Login Detail not Registered</h6>}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card w-auto mt-4">
                                <div className="card-body ps-3 pe-5">
                                    <div className="card-content">
                                        <h6>Order Detail:</h6>
                                        <div className='row'>
                                            <div className="col-sm pb-2">
                                                <div className="d-flex">
                                                    <div className="fs-14 grey">Total Orders:&nbsp;</div>
                                                    <div className="ps-1 fs-14">20</div>
                                                </div>

                                                <div className="d-flex">
                                                    <div className="fs-14 grey">Delivered Orders:&nbsp;</div>
                                                    <div className="ps-1 fs-14">20</div>
                                                </div>
                                            </div>
                                            <div className="col-sm pb-2">
                                                <div className="d-flex">
                                                    <div className="fs-14 grey">Pending Orders:&nbsp;</div>
                                                    <div className="ps-1 fs-14">20</div>
                                                </div>

                                                <div className="d-flex">
                                                    <div className="fs-14 grey">Cancelled Orders:&nbsp;</div>
                                                    <div className="ps-1 fs-14">20</div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <Link role="button" type="button" className="view__btn float-end">View Orders</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div >
                </div >
            </>
        )
    }
}



export default React.forwardRef((props, ref) =>
    <View
        innerRef={ref} {...props}
    />);


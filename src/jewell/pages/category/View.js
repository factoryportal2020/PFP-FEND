import React from 'react';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import { CardView } from '../../components/forms/CardView';
import validator from '../../components/forms/validate';

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
        console.log(param);
        let status = (param.status == 1) ? "Active" : "Deactive"


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
                                                <Link to={`/${this.state.states.listLink}/edit/${param.encrypt_id}`} role="button"
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
                                        <div className='row'>
                                            <div className='col-sm-6 '>
                                                <div className="form-group">
                                                    <h6><span className='grey'>Products:</span> {param.items_count}</h6>
                                                    <Link role="button" type="button"
                                                        onClick={(e) => this.props.clickItemDetail(param.id)}
                                                        to="/product/list"
                                                        className="view__btn mt-0">View Items</Link>
                                                </div>
                                            </div>
                                            <div className='col-sm-6 '>
                                                <div className="form-group">
                                                    <h6><span className='grey'>Tasks:</span> {param.tasks_count}</h6>
                                                    <Link role="button" type="button"
                                                        onClick={(e) => this.props.clickTaskDetail(param.id)}
                                                        to="/task/list"
                                                        className="view__btn mt-0">View Tasks</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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


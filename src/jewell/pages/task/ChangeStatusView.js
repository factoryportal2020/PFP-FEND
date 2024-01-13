import React from 'react';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';
import maleLogo from "../../theme/images/profile/male1.png";
import femaleLogo from "../../theme/images/profile/female.jpg";
import { TaskCardView } from './TaskCardView';
import { TaskCard } from './Card';
import { CardView } from '../../components/forms/CardView';
import { InputElement } from '../../components/forms/InputElement';
import { ValidateDisplay } from '../../components/forms/ValidateDisplay';
import FormImage from '../../components/forms/FormImage';
import { changeStatusEntities } from './Entity';
import taskService from '../../services/task.service';
import { Navigate } from 'react-router-dom';


class ChangeStatusView extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            states: props.states,
            entities: changeStatusEntities,
            currentStates: {
                title: "",
                listLink: "task",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }],
                params: {
                    encrypt_id: null,
                    comment: "",
                    status: "",
                },
                validations: {},
                validate: false
            },

            preLoading: props.preLoading,
            viewEncryptId: props.viewEncryptId,
        }
        this.changeStatusCall = this.changeStatusCall.bind(this);
    }

    componentWillReceiveProps(nextProps) {
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

    specialValidationforUpdate(fieldName, hasErr) {
        return hasErr;
    }

    async changeStatusCall(params) {
        this.setState({ preLoading: true });
        params.encrypt_id = this.state.viewEncryptId

        let callApi = taskService.updateStatus(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                this.child.current.setStatusMsg("success", data.message)
                setInterval(() => {
                    this.child.current.emptyStatusMsg(true);
                    let stateObj = { ...this.state };
                    stateObj.preLoading = false
                    this.setState({ ...stateObj }, () => {
                        console.log(this.props);
                        this.props.afterChangedStatusTrigger()
                    })
                }, 3000);
            }
        }).catch(e => {
            this.child.current.setStatusMsg("danger", "Something went wrong")
            this.setState({ preLoading: false });
        });
    }



    render() {
        return (
            <React.Fragment>
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
                            <div className="card w-auto mb-3">
                                <div className="card-body ps-3 pe-5 pb-3">
                                    <div className="card-content ">
                                        {/* {this.state.entities.map((element, i) => {

                                        let new_element = { ...element }
                                        let fieldName = `${element.name}`
                                        new_element.value = this.state.states.params[fieldName]


                                        return (
                                            <>
                                                <div className={`${new_element.colClass} show mt-2`}>
                                                    <InputElement key={i} element={new_element}
                                                        onChange={(newValue) => { this.props.onChange(newValue, fieldName, new_element) }}
                                                        onClick={(e) => { this.props.onClick(e, fieldName, new_element) }}
                                                    />
                                                    <ValidateDisplay state={this.state} new_element={new_element} fieldName={fieldName} />
                                                </div>

                                            </>
                                        )

                                    })} */}

                                        < FormImage
                                            entities={this.state.entities}
                                            states={this.state.currentStates}
                                            action={this.state.action}
                                            viewEncryptId={this.state.viewEncryptId}
                                            specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                            saveDataApiCall={(params) => this.changeStatusCall(params)}
                                            ref={this.child}
                                            preLoading={this.state.preLoading} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



export default React.forwardRef((props, ref) =>
    <ChangeStatusView
        innerRef={ref} {...props}
    />);


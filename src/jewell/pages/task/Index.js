import React from 'react';
import { formEntities, changeStatusEntities } from './Entity';
import FormImage from '../../components/forms/FormImage';
import taskService from '../../services/task.service';
import { Navigate } from 'react-router-dom';
import View from './View';
import ChangeStatusView from './ChangeStatusView'
import validator from '../../components/forms/validate';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            // form
            states: {
                title: "Task",
                listLink: "task",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }, { id: "images", tab: "Images" }],
                params: {
                    encrypt_id: null,
                    deleteImages: [], // Edit purpose
                    title: "",
                    description: "",
                    price: "",
                    quantity: "",
                    specification: "",
                    code: "",
                    category_id: "",
                    worker_id: "",
                    customer_id: "",
                    comment: "",
                    // start_date: new Date(),
                    // end_date: datetime.addDays(7),
                    start_date: "",
                    end_date: "",
                    task_image: [],
                    initial_image: [],
                    working_image: [],
                    completed_image: [],
                    delivered_image: [],

                    customer: {},
                    worker: {},

                    other_specifications: [{
                        id: "", item_id: "", label_name: "", value: "", type: "", hasValueError: true,
                        hasLabelNameError: true,
                        validate: false,
                    }],
                    price_breakdowns: [{
                        id: "", item_id: "", label_name: "", value: "", hasValueError: true,
                        hasLabelNameError: true,
                        validate: false,
                    }],
                    task_histories: [{
                        id: "", task_id: "", comment: "", status: "", updated_by: "", updated_at: ""
                    }],
                    delete_specifications_ids: [],
                    delete_pricebreakdowns_ids: [],
                    status: "",
                },
                validations: {
                    hasTitleRequired: true,
                    hasQuantityRequired: true,
                    hasCategory_idRequired: true,

                    //Inital false
                    hasTask_imageImage: false,
                    hasQuantityQuantity: false,
                },
                validate: false
            },
            entities: formEntities,
            changeStatusEntities: changeStatusEntities,
            action: props.action,
            viewEncryptId: (props.viewEncryptId) ? props.viewEncryptId : null,
            preLoading: true,
        }
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
        this.afterChangedStatusTrigger = this.afterChangedStatusTrigger.bind(this);
    }

    componentDidMount() {
        //Edit
        let selectCondition = "all"; //all (edit, view) = with out trashed, wt (add)  = with trashed 
        let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        if ((encrypt_id != null && this.state.action == "form")) {
            this.dataInit(encrypt_id);
        }
        //add
        if ((encrypt_id == null && this.state.action == "form")) {
            selectCondition = "wt";
            this.setState({ preLoading: false })
        }
        // View
        if ((this.state.viewEncryptId != null && this.state.action == "view")) {
            this.dataInit(this.state.viewEncryptId);
        }

        //status change
        if ((this.state.viewEncryptId != null && this.state.action == "changeStatus")) {
            this.dataInit(this.state.viewEncryptId);
        }

        this.getCategory(selectCondition);
        this.getWorker(selectCondition);
        this.getCustomer(selectCondition);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            console.log(nextProps.viewEncryptId);
            let stateObj = { ...this.state };
            stateObj.preLoading = true;
            stateObj.viewEncryptId = nextProps.viewEncryptId;
            this.setState({ ...stateObj }, () => { })
            this.dataInit(nextProps.viewEncryptId);
        }
    }

    componentWillUnmount() {
        this.disabledAllInputs(false);
    }

    dataInit(encrypt_id) {
        taskService.get(encrypt_id)
            .then(async (response) => {
                let responseData = response.data;
                let updateData = responseData.data;


                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.child.current.showServerErrorMsg(responseData.message);
                    return;
                }

                let taskData = updateData.task;
                let profile_imageData = updateData.task_image;
                let initial_imageData = updateData.initial_image;
                let working_imageData = updateData.working_image;
                let completed_imageData = updateData.completed_image;
                let delivered_imageData = updateData.delivered_image;


                let customerData = { customer: this.state.states.params.customer };
                let workerData = { worker: this.state.states.params.worker };

                let other_specificationsData = updateData.other_specifications;
                let price_breakdownsData = updateData.price_breakdowns;
                let task_historiesData = updateData.task_histories;


                let params = { ...this.state.states.params };
                params.other_specifications = []
                params.price_breakdowns = []
                params.task_histories = []

                if (other_specificationsData.length > 0) { params.other_specifications = [...other_specificationsData]; }
                else { params.other_specifications = this.state.states.params.other_specifications; }
                if (price_breakdownsData.length > 0) { params.price_breakdowns = [...price_breakdownsData]; }
                else { params.price_breakdowns = this.state.states.params.price_breakdowns; }
                if (task_historiesData.length > 0) { params.task_histories = [...task_historiesData]; }

                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    customerData.customer = updateData.task.customer;
                    workerData.worker = updateData.task.worker;
                }

                let updatedData = {
                    ...params, ...taskData,
                    ...profile_imageData, ...initial_imageData, ...working_imageData, ...completed_imageData, ...delivered_imageData,
                    ...customerData, ...workerData
                };

                // console.log(updatedData);
                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    entitiesObjects = this.getupdatedEntities();
                }
                stateObj.entities = entitiesObjects;

                stateObj.states.params = updatedData;
                stateObj.states.params.encrypt_id = encrypt_id;
                stateObj.preLoading = false;
                this.updateStates(stateObj);
            })
            .catch(e => {
                console.log(e);
                this.setState({ preLoading: false })
            });
    }

    getCategory(selectCondition) {
        taskService.getCategory(selectCondition)
            .then(async (response) => {
                let responseData = response.data.data;
                if (responseData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.entities;
                    stateObj.entities.map((element, i) => {
                        if (element.name == "category_id") {
                            let selectArr = [{ value: '', label: 'Select Category' }];
                            let arr = selectArr.concat(responseData);
                            entitiesObjects[i].options = arr.filter(validator.makeArrayUnique);
                        }
                    })
                    stateObj.entities = entitiesObjects;
                    this.updateStates(stateObj);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    getWorker(selectCondition) {
        taskService.getWorker(selectCondition)
            .then(async (response) => {
                let responseData = response.data.data;
                if (responseData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.entities;
                    stateObj.entities.map((element, i) => {
                        if (element.name == "worker_id") {
                            let selectArr = [{ value: '', label: 'Select Worker' }];
                            let arr = selectArr.concat(responseData);
                            entitiesObjects[i].options = arr.filter(validator.makeArrayUnique);;
                        }
                    })
                    stateObj.entities = entitiesObjects;
                    this.updateStates(stateObj);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCustomer(selectCondition) {
        taskService.getCustomer(selectCondition)
            .then(async (response) => {
                let responseData = response.data.data;
                if (responseData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.entities;
                    stateObj.entities.map((element, i) => {
                        if (element.name == "customer_id") {
                            let selectArr = [{ value: '', label: 'Select Customer' }];
                            let arr = selectArr.concat(responseData);
                            entitiesObjects[i].options = arr.filter(validator.makeArrayUnique);;
                        }
                    })
                    stateObj.entities = entitiesObjects;
                    this.updateStates(stateObj);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    getupdatedEntities() {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;

        stateObj.entities.map((element, i) => {
            this.updateStates(stateObj);
        })
        return entitiesObjects;
    }


    disabledAllInputs(disable = true) {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;
        let readOnly = "readonly";

        stateObj.entities.map((element, i) => {
            if (disable == true) {
                entitiesObjects[i].readonly = readOnly;
            }
            else if (element.name == "code") {
                entitiesObjects[i].readonly = readOnly;
            }
            else {
                entitiesObjects[i].readonly = "";

            }
        })
        return entitiesObjects;
    }

    updateStates(stateObj) {
        this.setState({ ...stateObj }, () => { })
    }

    specialValidationforUpdate(fieldName, hasErr) {
        return hasErr;
    }


    async saveDataApiCall(params) {

        this.setState({ preLoading: true });

        let callApi = (params.encrypt_id != null) ?
            taskService.update(params) :
            taskService.create(params);

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
                }, 3000);
            }
        }).catch(e => {
            this.child.current.setStatusMsg("danger", "Something went wrong")
            this.setState({ preLoading: false });
        });
    }


    afterChangedStatusTrigger() {
        console.log("afterChangedStatusTrigger1");
        this.props.afterChangedStatusTrigger()
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.state.states.submitted)
    //     console.log(nextState.states.submitted)
    //     return this.state.states.submitted == nextState.states.submitted;
    // }

    render() {
        return (
            <React.Fragment>
                <div>
                    {(this.state.states.submitted) ? <Navigate to={`/${this.state.states.listLink}/list`} /> : ""}
                </div>
                {
                    <>{
                        ((this.state.viewEncryptId != null && this.state.action == "view")) ?
                            <View
                                entities={this.state.entities}
                                states={this.state.states}
                                action={this.state.action}
                                viewEncryptId={this.state.viewEncryptId}
                                ref={this.child}
                                preLoading={this.state.preLoading}
                            />
                            :
                            ((this.state.viewEncryptId == null && this.state.action != "changeStatus" && this.state.action != "view")) ?
                                < FormImage
                                    entities={this.state.entities}
                                    states={this.state.states}
                                    action={this.state.action}
                                    viewEncryptId={this.state.viewEncryptId}
                                    specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                    saveDataApiCall={(params) => this.saveDataApiCall(params)}
                                    ref={this.child}
                                    preLoading={this.state.preLoading} /> : ""
                    }
                        {
                            ((this.state.viewEncryptId != null && this.state.action == "changeStatus")) ?
                                <ChangeStatusView
                                    states={this.state.states}
                                    entities={this.state.changeStatusEntities}
                                    viewEncryptId={this.state.viewEncryptId}
                                    ref={this.child}
                                    afterChangedStatusTrigger={() => this.afterChangedStatusTrigger()}
                                    preLoading={this.state.preLoading}
                                />
                                : ""
                        }
                    </>
                }
            </React.Fragment>
        )
    }
}
export default Index;

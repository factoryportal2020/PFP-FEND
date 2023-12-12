import React from 'react';
import { formEntities } from './Entity';
import FormImage from '../../components/forms/FormImage';
import taskService from '../../services/task.service';
import { Navigate } from 'react-router-dom';
import datetime from '../../components/forms/datetime';

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
                    // start_date: new Date(),
                    // end_date: datetime.addDays(7),
                    start_date: "",
                    end_date: "",
                    task_image: [],
                    initial_image: [],
                    working_image: [],
                    completed_image: [],
                    delivered_image: [],
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
                    delete_specifications_ids: [],
                    delete_pricebreakdowns_ids: [],
                    status: 1,
                },
                validations: {
                    hasTitleRequired: true,
                    hasQuantityRequired: true,
                    hasCategory_idRequired: true,
                    hasWorker_idRequired: true,

                    //Inital false
                    hasTask_imageImage: false,
                },
                validate: false
            },
            entities: formEntities,
            action: props.action,
            viewEncryptId: (props.viewEncryptId) ? props.viewEncryptId : null,
            preLoading: true,
        }
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
    }

    componentDidMount() {
        this.getCategory();
        this.getWorker();
        this.getCustomer();
        //Edit
        let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        if ((encrypt_id != null && this.state.action == "form")) {
            this.dataInit(encrypt_id);
        }
        //add
        if ((encrypt_id == null && this.state.action == "form")) { this.setState({ preLoading: false }) }
        // View
        if ((this.state.viewEncryptId != null && this.state.action == "view")) {
            this.dataInit(this.state.viewEncryptId);
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

                let other_specificationsData = updateData.other_specifications;
                let price_breakdownsData = updateData.price_breakdowns;


                let params = { ...this.state.states.params };
                if (other_specificationsData.length > 0) { params.other_specifications = [...other_specificationsData]; }
                if (price_breakdownsData.length > 0) { params.price_breakdowns = [...price_breakdownsData]; }

                let updatedData = {
                    ...params, ...taskData,
                    ...profile_imageData, ...initial_imageData, ...working_imageData, ...completed_imageData, ...delivered_imageData
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
            });
    }

    getCategory() {
        taskService.getCategory()
            .then(async (response) => {
                let responseData = response.data.data;
                if (responseData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.entities;
                    stateObj.entities.map((element, i) => {
                        if (element.name == "category_id") {
                            let selectArr = element.options;
                            let arr = selectArr.concat(responseData);
                            entitiesObjects[i].options = arr;
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

    getWorker() {
        taskService.getWorker()
            .then(async (response) => {
                let responseData = response.data.data;
                if (responseData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.entities;
                    stateObj.entities.map((element, i) => {
                        if (element.name == "worker_id") {
                            let selectArr = element.options;
                            let arr = selectArr.concat(responseData);
                            entitiesObjects[i].options = arr;
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

    getCustomer() {
        taskService.getCustomer()
            .then(async (response) => {
                let responseData = response.data.data;
                if (responseData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.entities;
                    stateObj.entities.map((element, i) => {
                        if (element.name == "customer_id") {
                            let selectArr = element.options;
                            let arr = selectArr.concat(responseData);
                            entitiesObjects[i].options = arr;
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


    render() {
        return (
            <React.Fragment>
                <div>
                    {(this.state.states.submitted) ? <Navigate to={`/${this.state.states.listLink}/list`} /> : ""}
                </div>
                {
                    <>
                        < FormImage
                            entities={this.state.entities}
                            states={this.state.states}
                            action={this.state.action}
                            viewEncryptId={this.state.viewEncryptId}
                            specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                            saveDataApiCall={(params) => this.saveDataApiCall(params)}
                            ref={this.child}
                            preLoading={this.state.preLoading} />
                    </>
                }
            </React.Fragment>
        )
    }
}
export default Index;

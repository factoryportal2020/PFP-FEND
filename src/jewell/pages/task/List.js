import React from 'react';
import { filterEntities, listStates } from './Entity';
import ListComponent from '../../components/forms/ListComponent';
import WorkerListComponent from './worker/ListComponent';
import taskService from '../../services/task.service';
import { connect } from 'react-redux';


class List extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.view);
        // console.log(this.props.location);
        this.child = React.createRef();

        this.state = {
            states: listStates,
            filterEntities: filterEntities,
            action: props.action,
            preLoading: true
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.startPreload = this.startPreload.bind(this);
        this.afterChangedStatusTrigger = this.afterChangedStatusTrigger.bind(this);
    }

    async componentDidMount() {
        // const { handle } = (this.props.match.params) ? this.props.match.params : "";
        // const { worker_id } = (this.props.location) ? this.props.location.state : "";
        // console.log(this.props);
        await this.updateFilterWorkerId(this.props.view.task_worker_id);
        await this.updateFilterCategoryId(this.props.view.task_category_id);

        let selectCondition = "all";
        await this.getCategory(selectCondition);
        await this.getWorker(selectCondition);
        await this.getCustomer(selectCondition);
        await this.listInit()
    }

    onChangeSearch() {
        this.listInit();
    }

    async afterChangedStatusTrigger() {
        this.startPreload(true)
        await this.listInit()
    }

    startPreload(loading = false) {
        let stateObj = { ...this.state };
        stateObj.preLoading = loading
        this.setState({ ...stateObj }, () => { });
    }

    async updateFilterWorkerId(worker_id) {
        let stateObj = { ...this.state };
        stateObj.states.params.worker_id = worker_id
        this.setState({ ...stateObj }, () => { console.log(this.state.states.params.worker_id) });
    }

    async updateFilterCategoryId(category_id) {
        let stateObj = { ...this.state };
        stateObj.states.params.category_id = category_id
        this.setState({ ...stateObj }, () => { console.log(this.state.states.params.category_id) });
    }

    async listInit() {
        let params = this.state.states.params;
        let offset = (params.currentPage - 1) * params.itemPerPage;
        params.offset = offset;
        await taskService.list(params)
            .then(async (response) => {
                console.log(response.data)
                if (response.data.status) {
                    let responseData = response.data.data
                    let stateObj = { ...this.state };
                    stateObj.states.datas = responseData;
                    stateObj.preLoading = false;
                    this.updateStates(stateObj);
                }
                this.startPreload()
            })
            .catch(e => {
                console.log(e);
                this.startPreload(false)
            });
    }

    deleteRecord(deleteEncryptId, deleteEncryptTitle) {
        this.startPreload(true)

        let callApi = taskService.delete(deleteEncryptId);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                let msg = "Something went wrong";
                this.child.current.setStatusMsg("danger", msg)
                this.startPreload(false)
            } else { // success
                let msg = deleteEncryptTitle + " Successfully Deleted!";
                this.child.current.setStatusMsg("success", msg)
                this.startPreload(false)
                this.listInit();
            }
        }).catch(e => {
            let msg = "Something went wrong";
            this.child.current.setStatusMsg("danger", msg)
            this.startPreload()
        });
    }

    async getCategory(selectCondition) {
        taskService.getCategory(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data;
                if (categoryData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.filterEntities;
                    stateObj.filterEntities.map((element, i) => {
                        if (element.name == "category_id") {
                            let selectArr = [{ value: '', label: 'Select Category' }];
                            let arr = selectArr.concat(categoryData);
                            entitiesObjects[i].options = arr;
                        }
                    })
                    stateObj.filterEntities = entitiesObjects;
                    this.updateStates(stateObj);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    async getWorker(selectCondition) {
        taskService.getWorker(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let workerData = responseData.data;
                if (workerData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.filterEntities;
                    stateObj.filterEntities.map((element, i) => {
                        if (element.name == "worker_id") {
                            let selectArr = [{ value: '', label: 'Select Worker' }];
                            let arr = selectArr.concat(workerData);
                            entitiesObjects[i].options = arr;
                        }
                    })
                    stateObj.filterEntities = entitiesObjects;
                    this.updateStates(stateObj);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    async getCustomer(selectCondition) {
        taskService.getCustomer(selectCondition)
            .then(async (response) => {
                let responseData = response.data;
                let customerData = responseData.data;
                if (customerData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.filterEntities;
                    stateObj.filterEntities.map((element, i) => {
                        if (element.name == "customer_id") {
                            let selectArr = [{ value: '', label: 'Select Customer' }];
                            let arr = selectArr.concat(customerData);
                            entitiesObjects[i].options = arr;
                        }
                    })
                    stateObj.filterEntities = entitiesObjects;
                    this.updateStates(stateObj);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStates(stateObj) {
        this.setState({ ...stateObj }, () => { console.log(stateObj); })
    }


    render() {
        return (
            <React.Fragment>
                < ListComponent
                    filterEntities={filterEntities}
                    states={this.state.states}
                    onChangeSearch={() => this.onChangeSearch()}
                    startPreload={(loading) => this.startPreload(loading)}
                    ref={this.child}
                    afterChangedStatusTrigger={() => this.afterChangedStatusTrigger()}
                    preLoading={this.state.preLoading}
                    deleteRecord={(encrypt_id, title) => this.deleteRecord(encrypt_id, title)}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, "")(List);

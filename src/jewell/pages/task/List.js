import React from 'react';
import { filterEntities, listStates } from './Entity';
import ListComponent from '../../components/forms/ListComponent';
import taskService from '../../services/task.service';
import { connect } from 'react-redux';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            states: listStates,
            filterEntities: filterEntities,
            action: props.action,
            preLoading: true,
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.startPreload = this.startPreload.bind(this);
    }

    async componentDidMount() {
        await this.getCategory();
        await this.getWorker();
        await this.getCustomer();
        await this.listInit()
    }


    onChangeSearch() {
        this.listInit();
    }

    startPreload(loading = false) {
        let stateObj = { ...this.state };
        stateObj.preLoading = loading
        this.setState({ ...stateObj }, () => { });
    }

    async listInit() {
        let params = this.state.states.params;
        let offset = (params.currentPage - 1) * params.itemPerPage;
        params.offset = offset;
        await taskService.list(params)
            .then(async (response) => {
                let responseData = response.data.data
                let stateObj = { ...this.state };
                stateObj.states.datas = responseData;
                stateObj.preLoading = false;
                this.updateStates(stateObj);
                this.startPreload()
            })
            .catch(e => {
                console.log(e);
            });
    }

    async getCategory() {
        taskService.getCategory()
            .then(async (response) => {
                let responseData = response.data;
                let categoryData = responseData.data;
                if (categoryData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.filterEntities;
                    stateObj.filterEntities.map((element, i) => {
                        if (element.name == "category_id") {
                            let selectArr = element.options;
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

    async getWorker() {
        taskService.getWorker()
            .then(async (response) => {
                let responseData = response.data;
                let workerData = responseData.data;
                if (workerData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.filterEntities;
                    stateObj.filterEntities.map((element, i) => {
                        if (element.name == "worker_id") {
                            let selectArr = element.options;
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

    async getCustomer() {
        taskService.getCustomer()
            .then(async (response) => {
                let responseData = response.data;
                let customerData = responseData.data;
                if (customerData.length > 0) {
                    let stateObj = { ...this.state };
                    let entitiesObjects = stateObj.filterEntities;
                    stateObj.filterEntities.map((element, i) => {
                        if (element.name == "customer_id") {
                            let selectArr = element.options;
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
                {
                    < ListComponent
                        filterEntities={filterEntities}
                        states={this.state.states}
                        onChangeSearch={() => this.onChangeSearch()}
                        startPreload={(loading) => this.startPreload(loading)}
                        ref={this.child}
                        preLoading={this.state.preLoading} />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, "")(List);

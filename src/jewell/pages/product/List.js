import React from 'react';
import { filterEntities, listStates } from './Entity';
import ListComponent from '../../components/forms/ListComponent';
import productService from '../../services/product.service';
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
        await this.updateFilterCategoryId(this.props.view.item_category_id);

        let selectCondition = "all";
        this.getCategory(selectCondition);
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

    async updateFilterCategoryId(category_id) {
        let stateObj = { ...this.state };
        stateObj.states.params.category_id = category_id
        this.setState({ ...stateObj }, () => { console.log(this.state.states.params.category_id) });
    }

    async listInit() {
        let params = this.state.states.params;
        let offset = (params.currentPage - 1) * params.itemPerPage;
        params.offset = offset;
        await productService.list(params)
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

    deleteRecord(deleteEncryptId, deleteEncryptTitle) {
        this.startPreload(true)

        let callApi = productService.delete(deleteEncryptId);

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

    getCategory(selectCondition) {
        productService.getCategory(selectCondition)
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
                        preLoading={this.state.preLoading}
                        deleteRecord={(encrypt_id, title) => this.deleteRecord(encrypt_id, title)}
                    />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, "")(List);

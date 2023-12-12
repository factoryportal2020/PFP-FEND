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
        this.getCategory();
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

    getCategory() {
        productService.getCategory()
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

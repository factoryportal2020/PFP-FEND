import React from 'react';
import { listStates, filterEntities } from './Entity';
import ListComponent from '../../components/forms/ListComponent';
import customerService from '../../services/customer.service';
import { customerApi } from '../../app/services/auth/customerService';
import { connect } from 'react-redux';
import { store } from '../../app/store';
import { RootState } from '../../app/store';


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
        await customerService.list(params)
            .then(async (response) => {
                let responseData = response.data.data
                let stateObj = { ...this.state };

                stateObj.states.datas = responseData;
                stateObj.preLoading=false;

                this.updateStates(stateObj);
                this.startPreload()
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
                        filterEntities={this.state.filterEntities}
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

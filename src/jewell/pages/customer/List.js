import React from 'react';
import { filterEntities, listStates } from './Entity';
import ListComponent from '../../components/forms/ListComponent';
import customerService from '../../services/customer.service';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            states: listStates,
            filterEntities: filterEntities,
            action: props.action,
            preLoading: false,
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        this.listInit()
    }

    onChangeSearch() {
        this.listInit();
    }

    listInit() {
        this.setState({ preLoading: true });

        let params = this.state.states.params;
        let offset = (params.currentPage - 1) * params.itemPerPage;
        params.offset = offset;
        customerService.list(params)
            .then(async (response) => {
                let responseData = response.data.data
                console.log(response.data);
                let stateObj = { ...this.state };
                console.log(stateObj);

                stateObj.states.datas = responseData;

                this.updateStates(stateObj);

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
                        ref={this.child}
                        preLoading={this.state.preLoading} />
                }
            </React.Fragment>
        )
    }
}
export default List;

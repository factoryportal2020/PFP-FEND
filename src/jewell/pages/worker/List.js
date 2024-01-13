import React from 'react';
import { filterEntities, listStates } from './Entity';
import ListComponent from '../../components/forms/ListComponent';
import workerService from '../../services/worker.service';
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
        await workerService.list(params)
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

        let callApi = workerService.delete(deleteEncryptId);

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

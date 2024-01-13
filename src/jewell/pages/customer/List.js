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
                console.log(response.data);
                if (response.data.status) {
                    let responseData = response.data.data
                    let stateObj = { ...this.state };

                    stateObj.states.datas = responseData;
                    stateObj.preLoading = false;

                    this.updateStates(stateObj);
                    this.startPreload()
                }else{
                    this.startPreload(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteRecord(deleteEncryptId, deleteEncryptTitle) {
        this.startPreload(true)

        let callApi = customerService.delete(deleteEncryptId);

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
                        filterEntities={this.state.filterEntities}
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

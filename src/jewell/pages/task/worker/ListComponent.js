import React from 'react';
import { filterEntities } from './Entity';
import { TaskCard } from './Card';
import Filter from '../../../components/forms/Filter';
import StatusBar from '../../../components/layouts/StatusBar';
import Preloader from '../../../components/layouts/Preloader';
import ViewModal from '../../../modals/ViewModal';
import DeleteConfirm from '../../../modals/DeleteConfirm';
import ChangeStatusModal from '../../../modals/ChangeStatusModal';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: props.states,
            filterEntities: filterEntities,
            viewModalTrigger: "fade",
            viewEncryptId: "",

            changeStatusModalTrigger: "fade",
            changeStatusModalEncryptId: "",

            deleteModalTrigger: "fade",
            deleteEncryptId: "",
            deleteTitle: "",
            preLoading: props.preLoading,
            encrypt_ids: []
        }

        this.props.innerRef.current = this;
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.viewModalTriggerClick = this.viewModalTriggerClick.bind(this);
        this.deleteModalTriggerClick = this.deleteModalTriggerClick.bind(this);
        this.changeStatusModalTriggerClick = this.changeStatusModalTriggerClick.bind(this);
        this.closeChangeStatusModal = this.closeChangeStatusModal.bind(this);
        this.afterChangedStatusTrigger = this.afterChangedStatusTrigger.bind(this);


        this.deleteRecord = this.deleteRecord.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);


        this.onStatusClose = this.onStatusClose.bind(this);
        this.emptyStatusMsg = this.emptyStatusMsg.bind(this);
        this.startPreload = this.startPreload.bind(this);

    }


    componentWillReceiveProps(nextProps) {
        let stateObj = { ...this.state };
        if (this.state.states != nextProps.states) {
            stateObj.states = nextProps.states;
            // this.formEncrypts();
            // if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            //     stateObj.viewEncryptId = nextProps.viewEncryptId;
            // }
        }

        if (this.state.preLoading != nextProps.preLoading) {
            stateObj.preLoading = nextProps.preLoading;
        }

        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            stateObj.viewEncryptId = nextProps.viewEncryptId;
        }
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
    }

    getEncryptIds() {
        let encrypt_ids = [];
        this.state.states.datas.data.map((e, i) => {
            encrypt_ids.push(e.encrypt_id);
        })
        return encrypt_ids;
        // let stateObj = { ...this.state };
        // stateObj.encrypt_ids = encrypt_ids;
        // this.setState({ ...stateObj }, () => { console.log(stateObj) });

    }

    emptyStatusMsg(submitted = false) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: false, type: 'success', msg: '' }
        stateObj.states.submitted = submitted;
        this.setState({ ...stateObj }, () => {
        });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    startPreload(loading) {
        this.props.startPreload(loading);
    }

    setStatusMsg(type, msg) {
        let stateObj = { ...this.state };
        stateObj.states.status = { show: true, type: type, msg: msg };
        this.setState({ ...stateObj }, () => { });
        setInterval(() => {
            this.emptyStatusMsg();
        }, 3000);

    }

    viewModalTriggerClick(event) {
        let viewEncryptId = event.target.id;

        let stateObj = { ...this.state };
        stateObj.viewModalTrigger = "d-block";
        stateObj.viewEncryptId = viewEncryptId;
        stateObj.encrypt_ids = this.getEncryptIds();
        this.setState({ ...stateObj }, () => {
            // console.log(stateObj) 
        });
    }

    changeStatusModalTriggerClick(event) {
        let changeStatusModalEncryptId = event.target.id;

        let stateObj = { ...this.state };
        stateObj.changeStatusModalTrigger = "d-block";
        stateObj.changeStatusModalEncryptId = changeStatusModalEncryptId;
        this.setState({ ...stateObj }, () => {
            // console.log(stateObj) 
        });
    }

    deleteRecord() {
        let deleteEncryptId = this.state.deleteEncryptId;
        let deleteTitle = this.state.deleteTitle;

        let stateObj = { ...this.state };
        stateObj.deleteModalTrigger = "";
        stateObj.deleteEncryptId = "";
        stateObj.deleteTitle = "";
        this.setState({ ...stateObj }, () => { this.props.deleteRecord(deleteEncryptId, deleteTitle); });
    }

    deleteModalTriggerClick(event) {
        let deleteEncryptId = event.target.id;
        let deleteTitle = event.target.dataset.title;
        let stateObj = { ...this.state };
        stateObj.deleteModalTrigger = "d-block";
        stateObj.deleteEncryptId = deleteEncryptId;
        stateObj.deleteTitle = deleteTitle;
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
    }

    async closeDeleteModal() {
        let stateObj = { ...this.state };
        stateObj.deleteModalTrigger = "";
        stateObj.deleteEncryptId = "";
        stateObj.deleteTitle = "";
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
    }

    onChangeSearch() {
        this.props.onChangeSearch();
    }

    closeViewModal() {
        let stateObj = { ...this.state };
        stateObj.viewModalTrigger = "";
        stateObj.viewEncryptId = "";
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
    }

    closeChangeStatusModal() {
        let stateObj = { ...this.state };
        stateObj.changeStatusModalTrigger = "";
        stateObj.changeStatusModalEncryptId = "";
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
    }

    afterChangedStatusTrigger() {
        let stateObj = { ...this.state };
        stateObj.changeStatusModalTrigger = "fade";
        stateObj.changeStatusModalEncryptId = "";
        this.setState({ ...stateObj }, () => {
            this.props.afterChangedStatusTrigger()
        });
    }

    render() {
        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />
                    {this.state.preLoading ? <Preloader /> : ""}

                    <Filter filterEntities={this.state.filterEntities}
                        states={this.state.states}
                        totalCount={this.state.states.datas.totalCount}
                        onChangeSearch={() => this.onChangeSearch()}
                        startPreload={(loading) => this.startPreload(loading)}
                    />

                    <div className='row'>
                        {
                            (this.state.states.datas.totalCount == 0) ?

                                <div className='fs-20 text-center mt-5'>No Records found</div> :

                                this.state.states.datas.data.map((element, i) => {
                                    return (
                                        <div className='col-xl-4 mb-4'>
                                            <TaskCard key={i} element={element}
                                                title={this.state.states.title}
                                                addLink={this.state.states.addLink}
                                                viewModalTriggerClick={(event) => this.viewModalTriggerClick(event)}
                                                deleteModalTriggerClick={(event) => this.deleteModalTriggerClick(event)}
                                                changeStatusModalTriggerClick={(event) => this.changeStatusModalTriggerClick(event)}
                                            />
                                        </div>
                                    )
                                })
                        }
                        <ViewModal
                            title={this.state.states.addLink}
                            viewModalTrigger={this.state.viewModalTrigger}
                            viewEncryptId={this.state.viewEncryptId}
                            encrypt_ids={this.state.encrypt_ids}
                            viewModalTriggerClick={(event) => this.viewModalTriggerClick(event)}
                            closeViewModal={() => this.closeViewModal()}
                        />
                        <ChangeStatusModal
                            title={this.state.states.addLink}
                            changeStatusModalTrigger={this.state.changeStatusModalTrigger}
                            changeStatusModalEncryptId={this.state.changeStatusModalEncryptId}
                            closeChangeStatusModal={() => this.closeChangeStatusModal()}
                            afterChangedStatusTrigger={() => this.afterChangedStatusTrigger()}
                        />
                        <DeleteConfirm deleteModalTrigger={this.state.deleteModalTrigger} deleteEncryptId={this.state.deleteEncryptId}
                            closeDeleteModal={() => this.closeDeleteModal()} title={this.state.deleteTitle}
                            deleteRecord={() => this.deleteRecord()} />

                    </div>
                </div>
            </>
        )
    }
}



export default React.forwardRef((props, ref) => <ListComponent
    innerRef={ref} {...props}
/>);           
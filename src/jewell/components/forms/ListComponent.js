import React from 'react';
import { Card } from './Card';
import {TaskCard} from '../../pages/task/Card';
import Filter from './Filter';
import StatusBar from '../layouts/StatusBar';
import Preloader from '../layouts/Preloader';
import ViewModal from '../../modals/ViewModal';
import DeleteConfirm from '../../modals/DeleteConfirm';
import { connect } from 'react-redux';
import { startPreloading } from '../../features/auth/authSlice';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: props.states,
            filterEntities: props.filterEntities,
            viewModalTrigger: "fade",
            viewEncryptId: "",
            deleteModalTrigger: "fade",
            deleteEncryptId: "",
            deleteTitle: "",
            preLoading: props.preLoading
        }
        this.props.innerRef.current = this;
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.viewModalTriggerClick = this.viewModalTriggerClick.bind(this);
        this.deleteModalTriggerClick = this.deleteModalTriggerClick.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);


        this.onStatusClose = this.onStatusClose.bind(this);
        this.emptyStatusMsg = this.emptyStatusMsg.bind(this);
        this.startPreload = this.startPreload.bind(this);

    }


    componentWillReceiveProps(nextProps) {
        let stateObj = { ...this.state };
        if (this.state.states != nextProps.states) {
            stateObj.states = nextProps.states;

            // if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            //     stateObj.viewEncryptId = nextProps.viewEncryptId;
            // }
        }

        if (this.state.preLoading != nextProps.preLoading) {
            stateObj.preLoading = nextProps.preLoading;
        }
        this.setState({ ...stateObj }, () => { console.log(stateObj) });


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
        console.log(event)
        let viewEncryptId = event.target.id;
        console.log(viewEncryptId)

        let stateObj = { ...this.state };
        stateObj.viewModalTrigger = "d-block";
        stateObj.viewEncryptId = viewEncryptId;
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
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

    deleteRecord() {
        console.log(this.state.deleteEncryptId);
        let msg = this.state.deleteTitle + " Successfully Deleted!";
        this.setStatusMsg("success", msg)
        this.closeDeleteModal();
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

    closeDeleteModal() {
        let stateObj = { ...this.state };
        stateObj.deleteModalTrigger = "";
        stateObj.deleteEncryptId = "";
        this.setState({ ...stateObj }, () => { console.log(stateObj) });
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
                                            {(this.state.states.addLink == "task") ?
                                                <TaskCard key={i} element={element}
                                                    title={this.state.states.title}
                                                    addLink={this.state.states.addLink}
                                                    viewModalTriggerClick={(event) => this.viewModalTriggerClick(event)}
                                                    deleteModalTriggerClick={(event) => this.deleteModalTriggerClick(event)}
                                                /> :
                                                <Card key={i} element={element}
                                                    title={this.state.states.title}
                                                    addLink={this.state.states.addLink}
                                                    viewModalTriggerClick={(event) => this.viewModalTriggerClick(event)}
                                                    deleteModalTriggerClick={(event) => this.deleteModalTriggerClick(event)}
                                                />
                                            }
                                        </div>
                                    )
                                })
                        }
                        <ViewModal viewModalTrigger={this.state.viewModalTrigger} viewEncryptId={this.state.viewEncryptId}
                            closeViewModal={() => this.closeViewModal()}
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
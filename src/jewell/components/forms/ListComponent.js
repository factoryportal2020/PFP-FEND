import React from 'react';
import { Card } from './Card';
import Filter from './Filter';
import StatusBar from '../layouts/StatusBar';
import Preloader from '../layouts/Preloader';
import ViewModal from '../../modals/ViewModal';
import DeleteConfirm from '../../modals/DeleteConfirm';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            states: props.states,
            filterEntities: props.filterEntities,
            viewModalTrigger: "fade",
            viewEncryptId: "",
            deleteModalTrigger: "fade",
            deleteEncryptId: "",
            deleteTitle: "",
        }
        this.props.innerRef.current = this;
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.viewModalTriggerClick = this.viewModalTriggerClick.bind(this);
        this.deleteModalTriggerClick = this.deleteModalTriggerClick.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);


        this.onStatusClose = this.onStatusClose.bind(this);
        this.emptyStatusMsg = this.emptyStatusMsg.bind(this);

    }


    componentWillReceiveProps(nextProps) {
        if (this.state.states != nextProps.states) {
            let stateObj = { ...this.state };
            stateObj.states = nextProps.states;
            if (this.state.preLoading != nextProps.preLoading) {
                stateObj.preLoading = nextProps.preLoading;
            }
            // if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            //     stateObj.viewEncryptId = nextProps.viewEncryptId;
            // }
            this.setState({ ...stateObj }, () => { console.log(stateObj) });
        }


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
        console.log(event)
        let deleteEncryptId = event.target.id;
        let deleteTitle = event.target.dataset.title;
        console.log(deleteEncryptId)
        console.log(deleteTitle)

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
                    />

                    <div className='row'>
                        {
                            (this.state.states.datas.totalCount == 0) ?

                                <div className='fs-20 text-center mt-5'>No Records found</div> :

                                this.state.states.datas.data.map((element, i) => {
                                    return (
                                        <div className='col-xl-4 mb-4'>
                                            <Card key={i} element={element}
                                                title={this.state.states.title}
                                                addLink={this.state.states.addLink}
                                                viewModalTriggerClick={(event) => this.viewModalTriggerClick(event)}
                                                deleteModalTriggerClick={(event) => this.deleteModalTriggerClick(event)}
                                            />
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
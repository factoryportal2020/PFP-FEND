import React from 'react';
import { Input } from '../components/forms/Input';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            states: { ...props.states },
            entities: [...props.filterEntities],
            modalTrigger: props.modalTrigger,
            applyFilterBtn: false,
        }
        this.clickClose = this.clickClose.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }


    handleChangeTextValue(event, fieldName, new_element) {
        let value = event;
        let stateObj = { ...this.state };

        (async () => {
            stateObj.states.params[`${fieldName}`] = value;
            this.setState({ ...stateObj }, () => { this.checkNotEmptyValues() });
        })();
    }

    checkNotEmptyValues() {
        let notEmptyValues = [];
        var params = { ...this.state.states.params };
        Object.keys(params).forEach(function (key) {
            if (params[key] != "") {
                notEmptyValues.push(true);
            }
        });
        if (notEmptyValues.length != 0) {
            this.setState({ applyFilterBtn: true });
        } else {
            this.setState({ applyFilterBtn: false });
        }
    }


    applyFilter() {
        this.props.applyFilter(this.state.states.params)
    }

    clearFilter() {
        let stateObj = { ...this.state };
        var params = { ...stateObj.states.params };
        Object.keys(params).forEach(function (key) {
            params[key] = "";
        });
        stateObj.states.params = params;
        this.setState({ ...stateObj }, () => {
            console.log("clearFilter")
            console.log(this.state.states.params)
            this.state.applyFilterBtn = false;
        });

        this.props.clearFilter(this.state.states.params)
    }

    componentWillReceiveProps(newProps) {
        this.setState({ modalTrigger: newProps.modalTrigger });
    }

    clickClose() {
        this.props.clickClose()
    }

    render() {
        return (
            <>
                <div className={`modal ${this.state.modalTrigger}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title brown">{this.state.states.title} Filter</h5>
                                <a href="#/">
                                    <i className="fa-solid fa-close fs-4" onClick={this.clickClose} />
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className='content-div'>
                                    {/* <form className="row g-3 brown border-1-brown border-radius-25"> */}
                                    <form className="row g-3 brown">
                                        {this.state.entities.map((element, i) => {
                                            let new_element = { ...element }
                                            let fieldName = `${element.name}`
                                            // console.log(this.state.states.params);
                                            new_element.value = this.state.states.params[fieldName]
                                            return (
                                                <>
                                                    <div className={`fw-normal ${new_element.colClass}`}>
                                                        <Input key={i} element={new_element}
                                                            onChange={(newValue) => { this.handleChangeTextValue(newValue, fieldName, new_element) }}
                                                            onClick={(e) => { }}></Input>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </form >
                                </div >
                            </div>
                            <div className="modal-footer">
                                {
                                    (this.state.applyFilterBtn) ?
                                        <>< button type="button" className="btn btn-secondary" data-dismiss="modal"
                                            onClick={this.clearFilter}>Clear Filter</button>
                                            <button type="button" className="btn btn-light jewell-bg-color brown float-end"
                                                onClick={this.applyFilter}>Apply filter</button></> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div >


            </>
        )
    }
}

export default Filter;
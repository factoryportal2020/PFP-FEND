import React from 'react';
import { InputElement } from '../components/forms/InputElement';
import validator from '../components/forms/validate';
import datetime from '../components/forms/datetime';

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
            console.log(params[key]);
            console.log(key);
            if (key != "itemPerPage" && key != "currentPage" && key != "offset") {
                params[key] = "";
            }
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
                                            if (element.name == "search_word") {
                                                return;
                                            }
                                            let new_element = { ...element }
                                            let fieldName = `${element.name}`
                                            // console.log(this.state.states.params);
                                            new_element.value = this.state.states.params[fieldName]
                                            return (
                                                <>
                                                    <div className={`fw-normal ${new_element.colClass}`}>
                                                        <InputElement key={i} element={new_element}
                                                            onChange={(newValue) => { this.handleChangeTextValue(newValue, fieldName, new_element) }}
                                                            onClick={(e) => { }}></InputElement>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </form >

                                    {
                                        (this.state.applyFilterBtn) ?
                                            <div className='d-flex fw-normal p-1 mt-2'>
                                                <div className='me-1 p-1 fs-14'>Applied:</div>
                                                {this.state.entities.map((element, i) => {
                                                    if (element.name == "search_word") {
                                                        return;
                                                    }
                                                    var elementVal = this.state.states.params[`${element.name}`];
                                                    if (elementVal == "") {
                                                        return;
                                                    }
                                                    if (element.type == "select") {
                                                        var elementValArr = element.options.filter(obj => {
                                                            return obj.value == elementVal
                                                        })
                                                        elementVal = elementValArr[0].label;
                                                    }

                                                    if (element.type == "datetime") {
                                                        elementVal = datetime.getDateTimeFromObject(this.state.states.params[`${element.name}`]);
                                                    }

                                                    var label = validator.replaceUnderscore(element.name)
                                                    label = validator.toCapitalize(label);
                                                    return (
                                                        <>
                                                            <div className='border-1-brown fs-14 p-2 black ms-1'>
                                                                <span className="silver fs-12">{label}</span> : {elementVal}
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            : ""
                                    }
                                </div >
                            </div>
                            <div className="modal-footer">
                                <>
                                    < button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        onClick={this.clearFilter}>Clear Filter</button>
                                    {(this.state.applyFilterBtn) ?

                                        <button type="button" className="btn btn-light jewell-bg-color brown float-end"
                                            onClick={this.applyFilter}>Apply filter</button> : ""}
                                </>                            </div>
                        </div>
                    </div>
                </div >


            </>
        )
    }
}

export default Filter;
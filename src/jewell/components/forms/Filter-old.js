import React from 'react';
import { InputElement } from './InputElement';
import Preloader from '../layouts/Preloader';
import customerService from '../../services/customer.service';
import FilterModal from '../../modals/FilterModal';
import validator from './validate';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: props.states,
            entities: props.filterEntities,
            modalTrigger: "fade",
            appliedFilter: false,
            perPageSelectEntity: {
                name: "perpage", type: "select", colClass: '',
                className: "fs-12 p-0 h-0", htmlFor: "", value: "10", label: "", placeholder: "10",
                validate: false,
                options: [
                    { value: "10", label: "10" },
                    { value: "20", label: "20" },
                    { value: "50", label: "50" },
                    { value: "100", label: "100" }
                ]
            },
            itemPerStartPage: 1,
            itemPerPage: 10,
            totalCount: 100,
            currentPage: 1,
            // prevPage: this.state.currentPage - 1,
            // nextPage: parseInt(this.state.currentPage) + 1,
        }
        this.filterClick = this.filterClick.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
        this.pgChildClick = this.pgChildClick.bind(this);
    }

    filterClick() {
        this.setState({ "modalTrigger": "d-block" })
    }

    applyFilter(newValue) {
        this.statesUpdate(newValue, true);
    }

    clearFilter(newValue) {
        this.statesUpdate(newValue, false);
    }

    statesUpdate(newValue, appliedFilter) {
        let stateObj = { ...this.state };
        stateObj.states.params = { ...newValue }
        stateObj.appliedFilter = appliedFilter;
        this.setState({ ...stateObj }, () => { console.log(this.state.states.params) });
        this.setState({ "modalTrigger": "fade" })
    }

    clickClose() {
        this.setState({ "modalTrigger": "" })
    }

    handleChangePerPage(event, fieldName, new_element) {
        let val = event;
        let stateObj = { ...this.state };
        stateObj.perPageSelectEntity.value = val;
        stateObj.itemPerPage = val;
        stateObj.currentPage = 1;
        (async () => {
            this.setState({ ...stateObj }, () => { console.log(this.state) });
        })();
    }

    pagination(currentPage, limit, totalItems) {
        currentPage = parseInt(currentPage);
        limit = parseInt(limit);
        totalItems = parseInt(totalItems);
        var totalItemsArray = [];
        var totalItemsSplitLimit = [];
        let range = [];
        let all = [];
        let finalArray = [];

        for (let i = 1; i <= totalItems; i += 1) {
            totalItemsArray.push(i);
        }
        var chunk = "";
        for (let i = 0; i < totalItemsArray.length; i += limit) {
            chunk = totalItemsArray.slice(i, i + limit);
            totalItemsSplitLimit.push(chunk);
        }
        for (let i = 1; i <= totalItemsSplitLimit.length; i += 1) {
            range.push(i);
        }

        const chunkSize = 7;
        for (let i = 0; i < range.length; i += chunkSize) {
            chunk = range.slice(i, i + chunkSize);
            all.push(chunk);
        }
        for (let i = 0; i < all.length; i += 1) {

            let totalArrayLength = all.length;

            let firstArray = all[0];
            let currentArray = all[i];
            let currentArraylength = all[i].length;
            let lastArray = all[all.length - 1];

            let lastArrayIndex = all.length - 1;
            var lastArrayCount = all[all.length - 1].length;
            var lastValue = all[all.length - 1].slice(-1)[0];

            lastValue = parseInt(lastValue);

            let currenPageIndexFun = (element) => element == currentPage;
            let currenPageIndex = all[i].findIndex(currenPageIndexFun);

            let firstPageSet = [1, 2, 3, 4, 5, "...", lastValue];
            let currentPageSet = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastValue];
            let lastPageSet = [1, "...", lastValue - 4, lastValue - 3, lastValue - 2, lastValue - 1, lastValue];
            let nextArrayCount = "";
            if (i == 0 && firstArray.includes(currentPage)) {
                if (totalArrayLength > 1) {
                    if (currenPageIndex == 0 || currenPageIndex == 1 || currenPageIndex == 2) {
                        finalArray = firstPageSet;
                    }
                    else if (currenPageIndex == 5 || currenPageIndex == 6) {
                        finalArray = currentPageSet;
                        let nextArray = all[1];
                        if ((nextArray.length < 3 && currenPageIndex == 6) || nextArray.length < 2) {
                            finalArray = lastPageSet;
                        }
                    }
                    else {
                        finalArray = currentPageSet;
                    }
                } else {
                    finalArray = firstArray;
                }
            } else if (i == lastArrayIndex && lastArray.includes(currentPage)) {
                finalArray = lastPageSet;
                if (currentArraylength == 7) {
                    if (currenPageIndex == 0 || currenPageIndex == 1 || currenPageIndex == 2 || currenPageIndex == 3) {
                        finalArray = currentPageSet;
                    }
                }
                if (currentArraylength == 6) {
                    if (currenPageIndex == 0 || currenPageIndex == 1 || currenPageIndex == 2) {
                        finalArray = currentPageSet;
                    }
                }
                if (currentArraylength == 5) {
                    if (currenPageIndex == 0 || currenPageIndex == 1) {
                        finalArray = currentPageSet;
                    }
                }
                if (currentArraylength == 4) {
                    if (currenPageIndex == 0) {
                        finalArray = currentPageSet;
                    }
                }
            } else if (i != 0 && i != lastArrayIndex && currentArray.includes(currentPage)) {
                finalArray = currentPageSet;
                let nextArray = all[i + 1];
                nextArrayCount = nextArray.length;
                if (nextArrayCount == 2) {
                    if (currenPageIndex == 6) {
                        finalArray = lastPageSet;
                    }
                }
                if (nextArrayCount == 1) {
                    if (currenPageIndex == 5 || currenPageIndex == 6) {
                        finalArray = lastPageSet;
                    }
                }
            }
        }
        return finalArray;
    }

    pgChildClick(e) {
        var clickedPgId = e.currentTarget.id;
        if (clickedPgId == "..." || clickedPgId == this.state.currentPage) {
            console.log("not received");
            return;
        }
        console.log(clickedPgId);
        this.setState({ currentPage: clickedPgId })
    }

    render() {

        let currentPage = this.state.currentPage;
        let prevPage = this.state.currentPage - 1;
        let nextPage = parseInt(currentPage) + 1;
        let totalPage = Math.ceil(this.state.totalCount / this.state.itemPerPage);
        let startBtnDisabled = (currentPage == 1) ? "disabled" : "";
        let lastBtnDisabled = ((totalPage == currentPage) || this.state.totalCount == 0) ? "disabled" : "";
        let pages = this.pagination(currentPage, this.state.itemPerPage, this.state.totalCount);


        return (
            <>
                <div className='content-div pt-0'>
                    {/* <form className="row g-3 brown border-1-brown border-radius-25"> */}
                    <div className="row g-3 brown">

                        {/* Item Per Page */}

                        <div className="col-sm">
                            <div className='d-flex fs-10 brown fw-normal'>
                                <div className='me-1 p-1 fs-14'>{this.state.states.title} per page:</div>
                                <Input element={this.state.perPageSelectEntity}
                                    // onChange={() => {}}
                                    onChange={(newValue) => { this.handleChangePerPage(newValue, "perPageSelectEntity", this.state.perPageSelectEntity) }}
                                    onClick={() => { }}
                                // onClick={(e) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                ></Input>
                                <div className='ms-2 p-1 fs-14'>
                                    {this.state.itemPerStartPage}&nbsp;-&nbsp;{this.state.itemPerPage}
                                    &nbsp;of&nbsp;{this.state.totalCount}&nbsp;{this.state.states.title}
                                </div>
                            </div>
                        </div>


                        {/* Pagination */}
                        <div className="col-sm">
                            <div id="pagination" >
                                <div className="pg-three-bounce">
                                    <button className="pg-child" disabled={startBtnDisabled}
                                        id={prevPage}
                                        onClick={(e) => this.pgChildClick(e)}>
                                        <i title="left" className="fa-solid fa-angle-left grey me-2"></i>
                                    </button>
                                    {pages.map((val, i) => {
                                        var currentPageClass = (currentPage == val) ? "bg-clicked" : "";
                                        var dotClass = (val == "...") ? "bg-white" : "";
                                        var disabled = "";
                                        if (val == "..." || (currentPage == val)) {
                                            var disabled = "disabled";
                                        }
                                        return (
                                            <>
                                                <a className={`pg-child ${currentPageClass} ${dotClass}`}
                                                    disabled={disabled}
                                                    id={val}
                                                    onClick={(e) => this.pgChildClick(e)}>
                                                    <span>{val}</span>
                                                </a>
                                            </>
                                        )
                                    })}


                                    <button className="pg-child" disabled={lastBtnDisabled}
                                        id={nextPage}
                                        onClick={(e) => this.pgChildClick(e)}>
                                        <i title="right" className="fa-solid fa-angle-right grey me-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Filter */}

                        <div className="col-sm">
                            <div className="d-flex float-end">

                                {
                                    (this.state.appliedFilter) ?
                                        <div>
                                            <div className='d-flex fw-normal p-1'>
                                                <div className='me-1 p-1 fs-14'>Filters:</div>
                                                {this.state.entities.map((element, i) => {
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
                                                    var label = validator.replaceUnderscore(element.name)
                                                    label = validator.toCapitalize(label);
                                                    return (
                                                        <>
                                                            <div className='border-1-brown fs-14 p-1 black ms-1'>
                                                                <span className="silver fs-12">{label}</span> : {elementVal}
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        : ""
                                }

                                <div className='ms-2 p-0'>
                                    <button type="button"
                                        onClick={this.filterClick}
                                        className="btn btn-light jewell-bg-color brown">Filter
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div >
                </div >

                <FilterModal
                    filterEntities={this.state.entities}
                    states={this.state.states}
                    modalTrigger={this.state.modalTrigger}
                    clickClose={this.clickClose}
                    applyFilter={(newValue) => { this.applyFilter(newValue) }}
                    clearFilter={(newValue) => { this.clearFilter(newValue) }} />
            </>
        )
    }
}

export default React.forwardRef((props, ref) => <Filter
    innerRef={ref} {...props}
/>);

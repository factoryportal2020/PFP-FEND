import React from 'react';
import { InputElement } from './InputElement';
import FilterModal from '../../modals/FilterModal';
import { Link } from 'react-router-dom';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        let itemPerPage = props.states.params.itemPerPage;
        let perPageSelectEntity = props.perPageSelectEntity;
        this.state = {
            states: props.states,
            entities: props.filterEntities,
            modalTrigger: "fade",
            appliedFilter: false,
            perPageSelectEntity: (perPageSelectEntity) ? perPageSelectEntity : {
                name: "perpage", type: "select", colClass: '',
                className: "fs-12 p-0 h-0", htmlFor: "", value: itemPerPage, label: "", placeholder: "10",
                validate: false,
                options: [
                    { value: "10", label: "10" },
                    { value: "20", label: "20" },
                    { value: "50", label: "50" },
                    { value: "100", label: "100" }
                ]
            },
            totalCount: props.totalCount,
            itemPerPage: itemPerPage,
            currentPage: props.states.params.currentPage,
            // prevPage: this.state.currentPage - 1,
            // nextPage: parseInt(this.state.currentPage) + 1,
        }
        this.filterClick = this.filterClick.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.pgChildClick = this.pgChildClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.totalCount != nextProps.totalCount) {
            let stateObj = { ...this.state };
            stateObj.totalCount = nextProps.totalCount;
            if (this.state.states.params != nextProps.states.params) {
                stateObj.states.params = nextProps.states.params;
            }
            this.setState({ ...stateObj }, () => { console.log(stateObj) });
        }
    }

    filterClick() {
        this.setState({ "modalTrigger": "d-block" })
    }

    viewModalTriggerClick() {
        this.setState({ "viewModalTrigger": "d-block" })
    }

    applyFilter(newValue) {
        this.props.startPreload(true);
        this.statesUpdate(newValue, true);
    }

    clearFilter(newValue) {
        this.props.startPreload(true);
        this.statesUpdate(newValue, false);
    }

    statesUpdate(newValue, appliedFilter) {
        let stateObj = { ...this.state };
        stateObj.states.params = { ...newValue }
        stateObj.appliedFilter = appliedFilter;
        this.setState({ ...stateObj }, () => { this.props.onChangeSearch(); });
        this.setState({ "modalTrigger": "fade" })
    }

    clickClose() {
        this.setState({ "modalTrigger": "" })
    }

    handleChangePerPage(event, fieldName, new_element) {
        this.props.startPreload(true);

        let val = event;
        let stateObj = { ...this.state };
        stateObj.perPageSelectEntity.value = val;
        stateObj.states.params.itemPerPage = val;
        stateObj.states.params.currentPage = 1;
        (async () => {
            this.setState({ ...stateObj }, () => {
                this.props.onChangeSearch();
            });
        })();
    }

    handleChangeSearch(newValue, fieldName, new_element) {
        this.props.startPreload(true);
        let stateObj = { ...this.state };
        stateObj.states.params.search_word = newValue;
        this.setState({ ...stateObj }, () => {
            this.props.onChangeSearch();
        });
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
        if (this.state.totalCount <= this.state.states.params.itemPerPage) {
            return;
        }
        this.props.startPreload(true);

        var clickedPgId = e.currentTarget.id;
        if (clickedPgId == "..." || clickedPgId == this.state.states.params.currentPage) {
            return;
        }

        let stateObj = { ...this.state };
        stateObj.states.params.currentPage = clickedPgId
        this.setState({ ...stateObj }, () => {
            this.props.onChangeSearch()
        })
    }

    render() {

        let currentPage = this.state.states.params.currentPage;
        let prevPage = this.state.states.params.currentPage - 1;
        let nextPage = parseInt(currentPage) + 1;
        let totalPage = Math.ceil(this.state.totalCount / this.state.states.params.itemPerPage);
        let startBtnDisabled = (currentPage == 1) ? "disabled" : "";
        let lastBtnDisabled = ((totalPage == currentPage) || this.state.totalCount == 0) ? "disabled" : "";
        let pages = this.pagination(currentPage, this.state.states.params.itemPerPage, this.state.totalCount);
        let FilterCap = (this.state.appliedFilter) ? "Filter Applied" : "Filter";


        return (
            <>
                <div className='pt-0 pb-3 filter-div'>
                    {/* <form className="row g-3 brown border-1-brown border-radius-25"> */}
                    <div className="row g-3 brown">

                        {/* Item Per Page */}

                        <div className="col-sm">
                            <div className='d-flex fs-10 theme-yellow fw-normal justify-content-between'>
                                <div className='me-1 p-1 fs-22 fw-600'>{this.state.states.title} </div>
                                <InputElement element={this.state.perPageSelectEntity}
                                    // onChange={() => {}}
                                    onChange={(newValue) => { this.handleChangePerPage(newValue, "perPageSelectEntity", this.state.perPageSelectEntity) }}
                                    onClick={() => { }}
                                // onClick={(e) => { this.handleDeleteImage(e, fieldName, new_element) }}
                                ></InputElement>
                                <div className=' pt-2 fs-14'>
                                    {this.state.states.params.currentPage}&nbsp;-&nbsp;{this.state.states.params.itemPerPage}
                                    &nbsp;of&nbsp;<span className='fs-16 green'>{this.state.totalCount}</span>
                                    {/* &nbsp;{this.state.states.title} */}
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
                                                <a className={`pg-child ${currentPageClass} ${dotClass} ${disabled}`}
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
                            {(this.state.entities.length > 0) ?
                                <div className="d-flex float-end">
                                    <div>
                                        <div className='d-flex fw-normal'>
                                            {this.state.entities.map((element, i) => {
                                                let new_element = { ...element }
                                                let fieldName = `${element.name}`
                                                new_element.value = this.state.states.params[fieldName]
                                                if (element.name != "search_word") {
                                                    return;
                                                }
                                                return (
                                                    <>
                                                        <InputElement key={i} element={new_element}
                                                            onChange={(newValue) => { this.handleChangeSearch(newValue, fieldName, new_element) }}
                                                            onClick={() => { }}></InputElement>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className='ms-2 p-0'>
                                        <button type="button"
                                            onClick={this.filterClick}
                                            className="normal__btn">{FilterCap}</button>
                                    </div>

                                    <div className='ms-2 p-0'>
                                        {/* <Link type="button" to={`/${this.state.states.addLink}/add`}
                                            className="normal__btn">Add {this.state.states.addLink}</Link> */}
                                            <Link type="button" to={`/${this.state.states.addLink}/add`}
                                            className="normal__btn">Add&nbsp;New</Link>
                                    </div>

                                </div> : ""}
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

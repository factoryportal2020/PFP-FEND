import React from "react";

export const Tab = React.forwardRef((props, ref) => {
    var state = props.state;

    return (
        <div className='navbar-expand-lg navbar-light mx-auto'>
            <div className="navbar-collapse" id="navbarSupportedContent">
                <ul className='navbar-nav ms-0 mr-auto'>
                    {
                        state.states.tabs.map((element, i) => {
                            var selectedTabClass = (state.clickedTabId == i) ? "tab__btn-active" : "";
                            return (
                                <>
                                    <li className='nav-item tabLabel' key={i} id={element.id}>
                                        <a
                                            className={`tab__btn ${selectedTabClass}`}
                                            onClick={(e) => props.onClick(e)} id={i}>
                                            {/* <span className="numberCircle">{i + 1}</span>&nbsp;&nbsp; */}
                                            {element.tab}
                                        </a>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
})
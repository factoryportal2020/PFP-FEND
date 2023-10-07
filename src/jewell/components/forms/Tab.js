import React from "react";

export const Tab = React.forwardRef((props, ref) => {
    var state = props.state;

    return (
        <div className='navbar-expand-lg navbar-light mx-auto'>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className='navbar-nav ms-0 mr-auto'>
                    {
                        state.states.tabs.map((element, i) => {
                            var selectedTabClass = (state.clickedTabId == i) ? "border-2-brown" : "";
                            return (
                                <>
                                    <li className='nav-item tabLabel' key={i} id={element.id}>
                                        <a
                                            className={`btn btn-light fs-12 bg-color6 brown tabLink border-radius-25 mx-2 ${selectedTabClass}`}
                                            onClick={(e) => props.onClick(e)} id={i}>
                                            <span className="numberCircle">{i + 1}</span>&nbsp;&nbsp;
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
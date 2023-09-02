import React from 'react';
import classnames from 'classnames';

export default class StatusBar extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
    }

    onStatusClose() {
        this.props.onStatusClose()
    }

    render() {
        let type = this.props.status.type;
        let classType = (type == "error") ? "danger" : type;
        let show = this.props.status.show;
        let msg = this.props.status.msg;
        return (
            (show) ?
                <div id="statusloader">
                    <div className={classnames("alert ", `alert-${classType}`, "noborder")
                    }>
                        {msg}
                        <i className="fa-solid fa-close ps-5 pt-1 fs-5" onClick={this.onStatusClose}></i>
                    </div>
                </div> : ""
        )
    }
}


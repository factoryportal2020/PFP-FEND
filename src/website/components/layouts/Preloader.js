import React from 'react';

export default class Preloader extends React.Component {
    render() {
        return (
            <div id="preloader" >
                <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                    <div className="sk-child sk-bounce4"></div>
                    <div className="sk-child sk-bounce5"></div>
                </div>
            </div>
        )
    }
}


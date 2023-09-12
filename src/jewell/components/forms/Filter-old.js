import React from 'react';
import { Input } from './Input';
import Preloader from '../layouts/Preloader';
import customerService from '../../services/customer.service';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { states: { ...props.states }, entities: [...props.filterEntities] }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log("submit");
    }



    render() {
        return (
            <>
                <div className='content-div'>
                    {/* <form className="row g-3 brown border-1-brown border-radius-25"> */}
                    <form className="row g-3 brown">
                        {this.state.entities.map((element, i) => {
                            let new_element = { ...element }
                            let fieldName = `${element.name}`
                            new_element.value = this.state.states.params[fieldName]
                            return (
                                <>
                                    <div className={`fw-normal ${new_element.colClass}`}>
                                        <Input key={i} element={new_element}
                                            onChange={(newValue) => { }}
                                            onClick={(e) => { }}></Input>
                                    </div>

                                </>
                            )
                        })}
                        <div className="col-sm">
                            <button type="button"
                                onClick={(e) => { this.handleSubmit(e) }}
                                className="btn btn-light jewell-bg-color brown float-end">Filter
                            </button>
                        </div>
                    </form >
                </div >
            </>
        )
    }
}

export default React.forwardRef((props, ref) => <Filter
    innerRef={ref} {...props}
/>);

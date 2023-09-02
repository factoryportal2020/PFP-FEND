import React from 'react';
import { Input } from '../../components/forms/Input';
import { customerEntities, customerStates } from './Entity';
import { customerDatas } from '../../testing/customers';
import Form from './Form';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.inputDatas = React.createRef();
        // this.states = customerStates;
        this.states = customerDatas.current;
    }

    componentWillReceiveProps() {
        if (this.inputDatas.current != null) {
            // console.log(this.inputDatas);
        }
    }

    render() {
        return (
            <Form
                entities={customerEntities}
                states={this.states}
                ref={this.inputDatas} />
        )
    }
}
export default Index;

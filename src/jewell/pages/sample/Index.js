import React from 'react';
import { formEntities, formStates } from './Entity';
import { customerDatas, listDatas } from '../../testing/customers';
import Form from '../../components/forms/Form';
import List from '../../components/forms/ListComponent';

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.inputDatas = React.createRef();
        this.state = {
            // states: formStates,
            states: customerDatas.current,
            listDatas: listDatas.current.datas,
            action: props.action,
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    (this.state.action == "form") ?
                        < Form
                            entities={formEntities}
                            states={this.state.states}
                            ref={this.inputDatas} /> :
                        < List
                            datas={this.state.listDatas}
                            ref={this.inputDatas} />
                }
            </React.Fragment>
        )
    }
}
export default Index;

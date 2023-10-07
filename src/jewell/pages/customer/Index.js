import React from 'react';
import { formEntities, formStates, filterEntities, listStates } from './Entity';
import { customerDatas, listDatas } from '../../testing/customers';
import Form from '../../components/forms/Form';
import List from '../../components/forms/List';

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.inputDatas = React.createRef();
        this.state = {
            // form
            states: formStates,
            // states: customerDatas.current,
            
            // list 
            listStates: listStates,
            listDatas: listDatas.current,
            filterEntities: filterEntities,
            
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
                            filterEntities={filterEntities}
                            datas={this.state.listDatas}
                            states={this.state.listStates}
                            ref={this.inputDatas} />
                }
            </React.Fragment>
        )
    }
}
export default Index;

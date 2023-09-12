import React from 'react';
import { Card } from './Card';
import Filter from './Filter';

class List extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            states: props.states,
            title: props.datas.title,
            datas: [...props.datas.datas],
            filterEntities: props.filterEntities
        }
    }


    render() {
        return (
            <>
                <div className='content-div'>
                    <Filter filterEntities={this.state.filterEntities} states={this.state.states} />
                    <div className='row'>
                        {
                            this.state.datas.map((element, i) => {
                                return (
                                    <div className='col-xl-4 mb-4'>
                                        <Card key={i} element={element} title={this.state.title} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default React.forwardRef((props, ref) => <List
    innerRef={ref} {...props}
/>);           
import React, { useState, useEffect } from 'react';
import { specificationEntities } from './Entity';
import validator from '../../components/forms/validate';
import { Field } from '../../components/forms/Field';

export const SpecificationComponent = React.forwardRef((props, ref) => {

    const [itemsArray, setHandleChangeItem] = useState(props.specifications);
    const [deletedIds, setSelectChangeDeletedIds] = useState(props.deletedIds);

    useEffect(() => {
        setHandleChangeItem(props.specifications);
        ref.current = props.specifications;
        ref.current.deletedIds = [];
    }, [props.specifications]);


    function addItemComponent(e) {
        let keyIndex = e.target.id;
        let curArray = { ...itemsArray[keyIndex] };
        if (!curArray.hasValueError && !curArray.hasLabelNameError) {
            setHandleChangeItem((itemsArray) => [...itemsArray,
            {
                id: "", item_id: "", label_name: "", value: "", type: "",
                hasValueError: true, hasLabelNameError: true, validate: false
            }]);
        } else {
            curArray.validate = true;
            itemsArray[keyIndex] = curArray;
            setHandleChangeItem(() => [...itemsArray]);
        }
    }

    function deleteItemComponent(e) {
        let splt = e.target.id.split('-');
        let keyIndex = splt[0];
        let item_id = splt[1] != "" ? splt[1] : null;
        if (keyIndex > -1) { itemsArray.splice(keyIndex, 1); }
        setHandleChangeItem(() => [...itemsArray]);
        if (item_id) {
            deletedIds.push(parseInt(item_id));
            setSelectChangeDeletedIds(() => [...deletedIds]);
            ref.current.deletedIds = deletedIds;
        }
        ref.current = itemsArray;
    }


    function handleChangeValue(newValue, keyIndex, fieldName) {
        let curArray = { ...itemsArray[keyIndex] };
        curArray[[`${fieldName}`]] = newValue;
        let hasErrName = "";
        if (fieldName == "label_name") {
            hasErrName = "hasLabelNameError";
        }
        else if (fieldName == "value") {
            hasErrName = "hasValueError";
        }

        curArray[[`${hasErrName}`]] = (validator.empty(newValue)) ? true : false;
        curArray.validate = (validator.empty(newValue)) ? true : false;
        itemsArray[keyIndex] = curArray;
        setHandleChangeItem(() => [...itemsArray]);
        console.log(itemsArray);
        ref.current = itemsArray;
    }

    return (
        itemsArray.map((element, key) => {
            // console.log(element);

            let id = element.id;
            let item_id = element.item_id;
            // let params = { id: element.id, item_id: element.item_id, label_name: element.label_name, value: element.value, type: element.type };
            let params = { label_name: element.label_name, value: element.value };
            let states = { params: params };
            let state = {};
            state.states = { ...states };
            state.entities = [...specificationEntities];
            let tab = [];
            // console.log(state);
            return (
                <fieldset key={key} className="fieldSet pb-2">
                    <div className='row'>

                        <Field
                            state={state}
                            tab={tab}
                            isFile={false}
                            onChange={(newValue, fieldName, new_element) => { handleChangeValue(newValue, key, fieldName) }}
                        // onClick={(e, fieldName, new_element) => { this.handleDeleteImage(e, fieldName, new_element) }}
                        // ref={this.fileImage}
                        />



                        <div className="col-sm" style={{ justifyContent: "flex-end" }}>
                            <div className="form-group" style={{ paddingTop: "32px" }}>
                                <div style={{ display: "inline" }}>
                                    < button id={key} onClick={(e) => addItemComponent(e)} type="button" className="normal__btn">Add Item</button >
                                    {/* < button onClick={addItemComponent} type="button" className="btn btn-secondary">Add Item</button > */}
                                    {key != 0 ?
                                        < button id={key + "-" + id}
                                            onClick={(e) => deleteItemComponent(e)}
                                            style={{ marginLeft: "10px" }}
                                            type="button"
                                            className="normal__btn">Delete</button >
                                        : ""}
                                </div>
                            </div>
                            {element.validate ? <span className="react-inputs-validation__error">Please enter * fileds</span> : ""}
                        </div>
                    </div >
                </fieldset >
            );

        })
    );
})

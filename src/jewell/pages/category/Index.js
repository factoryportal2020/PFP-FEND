import React from 'react';
import { formEntities } from './Entity';
import FormImage from '../../components/forms/FormImage';
import categoryService from '../../services/category.service';
import { Navigate } from 'react-router-dom';
import View from './View';
import { changeNavMenu } from '../../features/auth/authSlice';
import { categoryItemCategoryId, categoryTaskCategoryId } from '../../features/auth/viewSlice';
import { connect } from 'react-redux';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            // form
            states: {
                title: "Category",
                listLink: "category",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }],
                params: {
                    encrypt_id: null,
                    deleteImages: [], // Edit purpose
                    name: "",
                    description: "",
                    code: "",
                    category_image: [],
                    status: 1,
                    items_count: 0,
                    tasks_count: 0,
                },
                validations: {
                    hasNameRequired: true,

                    //Inital false
                    hasCategory_imageImage: false,
                },
                validate: false
            },
            entities: formEntities,
            action: props.action,
            viewEncryptId: (props.viewEncryptId) ? props.viewEncryptId : null,
            preLoading: true,
        }
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
    }

    componentDidMount() {
        //Edit
        let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        if ((encrypt_id != null && this.state.action == "form")) {
            this.dataInit(encrypt_id);
        }
        //add
        if ((encrypt_id == null && this.state.action == "form")) { this.setState({ preLoading: false }) }
        // View
        if ((this.state.viewEncryptId != null && this.state.action == "view")) {
            this.dataInit(this.state.viewEncryptId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            let stateObj = { ...this.state };
            stateObj.preLoading = true;
            stateObj.viewEncryptId = nextProps.viewEncryptId;
            this.setState({ ...stateObj }, () => { })
            this.dataInit(nextProps.viewEncryptId);
        }
    }

    componentWillUnmount() {
        this.disabledAllInputs(false);
    }

    categoryTaskCategoryId(category_id) {
        let menuName = "Task";
        this.props.categoryTaskCategoryId(category_id);
        this.props.changeNavMenu(menuName)
    }

    categoryItemCategoryId(category_id) {
        let menuName = "Product";
        this.props.categoryItemCategoryId(category_id);
        this.props.changeNavMenu(menuName)
    }

    dataInit(encrypt_id) {
        categoryService.get(encrypt_id)
            .then(async (response) => {
                let responseData = response.data;
                let updateData = responseData.data;


                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.child.current.showServerErrorMsg(responseData.message);
                    return;
                }

                let categoryData = updateData.category;
                let profile_imageData = updateData.category_image;

                let params = { ...this.state.states.params };

                let updatedData = { ...params, ...categoryData, ...profile_imageData };

                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    entitiesObjects = this.getupdatedEntities();
                }
                stateObj.entities = entitiesObjects;

                stateObj.states.params = updatedData;
                stateObj.states.params.encrypt_id = encrypt_id;
                stateObj.preLoading = false;
                this.updateStates(stateObj);

            })
            .catch(e => {
                console.log(e);
            });
    }


    getupdatedEntities() {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;

        stateObj.entities.map((element, i) => {
            this.updateStates(stateObj);
        })
        return entitiesObjects;
    }


    disabledAllInputs(disable = true) {
        let stateObj = { ...this.state };
        let entitiesObjects = stateObj.entities;
        let readOnly = "readonly";

        stateObj.entities.map((element, i) => {
            if (disable == true) {
                entitiesObjects[i].readonly = readOnly;
            }
            else if (element.name == "code") {
                entitiesObjects[i].readonly = readOnly;
            }
            else {
                entitiesObjects[i].readonly = "";

            }
        })
        return entitiesObjects;
    }

    updateStates(stateObj) {
        this.setState({ ...stateObj }, () => { })
    }

    specialValidationforUpdate(fieldName, hasErr) {
        return hasErr;
    }


    async saveDataApiCall(params) {

        this.setState({ preLoading: true });

        let callApi = (params.encrypt_id != null) ?
            categoryService.update(params) :
            categoryService.create(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                this.child.current.setStatusMsg("success", data.message)
                setInterval(() => {
                    this.child.current.emptyStatusMsg(true);
                    let stateObj = { ...this.state };
                    stateObj.states.submitted = true
                    this.setState({ ...stateObj }, () => { })
                }, 3000);
            }
        }).catch(e => {
            this.child.current.setStatusMsg("danger", "Something went wrong")
            this.setState({ preLoading: false });
        });
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    {(this.state.states.submitted) ? <Navigate to={`/${this.state.states.listLink}/list`} /> : ""}
                </div>
                {
                    <>{
                        ((this.state.viewEncryptId != null && this.state.action == "view")) ?
                            <View
                                entities={this.state.entities}
                                states={this.state.states}
                                action={this.state.action}
                                viewEncryptId={this.state.viewEncryptId}
                                clickTaskDetail={(category_id) => this.categoryTaskCategoryId(category_id)}
                                clickItemDetail={(category_id) => this.categoryItemCategoryId(category_id)}
                                ref={this.child}
                                preLoading={this.state.preLoading}
                            />
                            :
                            < FormImage
                                entities={this.state.entities}
                                states={this.state.states}
                                action={this.state.action}
                                viewEncryptId={this.state.viewEncryptId}
                                specialValidationforUpdate={(fieldName, hasErr) => this.specialValidationforUpdate(fieldName, hasErr)}
                                saveDataApiCall={(params) => this.saveDataApiCall(params)}
                                ref={this.child}
                                preLoading={this.state.preLoading} />
                    }
                    </>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    categoryTaskCategoryId: (payload) => dispatch(categoryTaskCategoryId(payload)),
    categoryItemCategoryId: (payload) => dispatch(categoryItemCategoryId(payload)),
    changeNavMenu: (payload) => dispatch(changeNavMenu(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Index);

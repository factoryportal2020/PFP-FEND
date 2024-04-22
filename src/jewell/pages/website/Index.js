import React from 'react';
import { formEntities } from './Entity';
import FormImage from '../../components/forms/FormImage';
import websiteService from '../../services/website.service';
import { Navigate } from 'react-router-dom';
import View from './View';
import SweetAlertLayout from '../../components/layouts/SweetAlertLayout';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            // form
            states: {
                title: "Website",
                listLink: "website",
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                clickedTabId: 0,
                errorsModalTrigger: "fade",
                errors: [],
                // tabs: [{ id: "details", tab: "Details" }, { id: "banner", tab: "Banners" }, { id: "about", tab: "About" }, { id: "feature", tab: "Feature Images" }],
                tabs: [{ id: "details", tab: "Details" }, { id: "banner", tab: "Banners" }, { id: "about", tab: "About" }],
                params: {
                    deleteImages: [], // Edit purpose
                    encrypt_id: null,
                    website_encrypt_id: null,
                    company_name: "",
                    site_url: "",
                    oldsite_url: "",
                    email: "",
                    phone_no: "",
                    landline_no: "",
                    whatsapp_no: "",
                    address: "",
                    instagram_link: "",
                    facebook_link: "",
                    twitter_link: "",
                    status: 0,
                    logo_image: [],
                    about_image: [],
                    banner_image1: [],
                    banner_title1: "",
                    banner_caption1: "",
                    banner_image2: [],
                    banner_title2: "",
                    banner_caption2: "",
                    banner_image3: [],
                    banner_title3: "",
                    banner_caption3: "",
                    // feature_image1: [],
                    // feature_image2: [],
                    // feature_image3: [],
                    defaultBanners: [],
                    defaultAbouts: [],
                    defaultFeatures: [],
                },
                validations: {
                    hasCompany_nameRequired: true,
                    hasSite_urlRequired: true,
                    hasSite_urlString_numeric: true,
                    hasEmailRequired: true,
                    hasEmailEmail: true,
                    hasPhone_noRequired: true,
                    hasPhone_noPhone_no: false,
                    hasLandline_noLandline_no: false,
                    //Inital false
                    hasLogo_imageImage: false,
                    hasAbout_imageImage: false,
                    hasBanner_image1Image: false,
                    hasBanner_image2Image: false,
                    hasBanner_image3Image: false,
                    hasFeature_image1Image: false,
                    hasFeature_image2Image: false,
                    hasFeature_image3Image: false,

                },
                validate: false
            },
            entities: formEntities,
            action: props.action,
            viewEncryptId: (props.viewEncryptId) ? props.viewEncryptId : null,
            preLoading: true,

            launchNotification: false,
        }
        this.specialValidationforUpdate = this.specialValidationforUpdate.bind(this);
    }

    componentDidMount() {
        // //Edit
        // let encrypt_id = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
        // if ((encrypt_id != null && this.state.action == "form")) {
        //     this.dataInit(encrypt_id);
        // }
        //add
        // if ((encrypt_id == null && this.state.action == "form")) {
        this.dataInit();
        // this.setState({ preLoading: false })
        // }
        // // View
        // if ((this.state.viewEncryptId != null && this.state.action == "view")) {
        //     this.dataInit(this.state.viewEncryptId);
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            console.log(nextProps.viewEncryptId);
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

    dataInit() {
        console.log("updateData");

        websiteService.get()
            .then(async (response) => {
                let responseData = response.data;
                let updateData = responseData.data;
                console.log(updateData);

                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.child.current.showServerErrorMsg(responseData.message);
                    return;
                }

                let itemData = updateData.website;
                let about_imageData = updateData.about_image;
                let logo_imageData = updateData.logo_image;
                let banner_image1Data = updateData.banner_image1;
                let banner_image2Data = updateData.banner_image2;
                let banner_image3Data = updateData.banner_image3;
                let feature_image1Data = updateData.feature_image1;
                let feature_image2Data = updateData.feature_image2;
                let feature_image3Data = updateData.feature_image3;
                let defaultBannersData = updateData.defaultBanners;
                let defaultAboutsData = updateData.defaultAbouts;
                let defaultFeaturesData = updateData.defaultFeatures;


                let params = { ...this.state.states.params };

                let updatedData = {
                    ...params, ...itemData, ...logo_imageData, ...about_imageData,
                    ...banner_image1Data, ...banner_image2Data, ...banner_image3Data,
                    ...feature_image1Data, ...feature_image2Data, ...feature_image3Data,
                    ...defaultBannersData, ...defaultAboutsData, ...defaultFeaturesData
                };
                console.log(updatedData);
                let stateObj = { ...this.state };

                let entitiesObjects = stateObj.entities;
                if (this.state.viewEncryptId != null && this.state.action == "view") {
                    entitiesObjects = this.disabledAllInputs();
                } else {
                    entitiesObjects = this.getupdatedEntities();
                }
                stateObj.entities = entitiesObjects;

                stateObj.states.params = updatedData;
                stateObj.states.params.deleteImages = []
                stateObj.preLoading = false;
                stateObj.launchNotification = (itemData.launch_at == null || itemData.launch_at == "" || itemData.launch_at == "NULL") ? true : false;
                this.updateStates(stateObj);

            })
            .catch(e => {
                console.log(e);
                this.setState({ preLoading: false })

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

    closeNotification() {
        let stateObj = { ...this.state };
        stateObj.launchNotification = false;
        this.setState({ ...stateObj }, () => { })
    }

    async saveDataApiCall(params) {
        delete params["defaultAbouts"];
        delete params["defaultBanners"];
        delete params["defaultFeatures"];
        this.setState({ preLoading: true });
        console.log(params.encrypt_id);
        let callApi = (params.encrypt_id != null) ?
            websiteService.update(params) :
            websiteService.create(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                this.child.current.setStatusMsg("success", data.message)
                this.dataInit();
                setInterval(() => {
                    this.child.current.emptyStatusMsg(true);
                }, 5000);

            }
        }).catch(e => {
            this.child.current.setStatusMsg("danger", "Something went wrong")
            this.setState({ preLoading: false });
        });
    }


    async handleLaunch() {
        this.setState({ preLoading: true });
        let params = {
            encrypt_id: this.state.states.params.encrypt_id,
            website_encrypt_id: this.state.states.params.website_encrypt_id
        }

        let callApi = websiteService.updateLaunchAt(params);

        callApi.then(response => {
            let data = response.data;
            if (!data.status) { // errors
                (async () => {
                    await this.child.current.showServerErrorMsg(data.message);
                    this.setState({ preLoading: false });
                })();
            } else { // success
                this.child.current.setStatusMsg("success", data.message)
                this.dataInit();
                setInterval(() => {
                    this.child.current.emptyStatusMsg(true);
                }, 6000);

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
                    {(this.state.states.submitted) ? <Navigate to={`/${this.state.states.listLink}`} /> : ""}
                    {(this.state.launchNotification) ? <SweetAlertLayout title="Launch your Website"
                        message="Add your contact details and Banner images to your website and launch it!... "
                        closeNotification={() => this.closeNotification()} /> : ""}
                </div>
                {
                    <>
                        {
                            ((this.state.viewEncryptId != null && this.state.action == "view")) ?
                                <View
                                    entities={this.state.entities}
                                    states={this.state.states}
                                    action={this.state.action}
                                    viewEncryptId={this.state.viewEncryptId}
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
                                    handlePreview={(params) => this.handlePreview(params)}
                                    handleLaunch={(params) => this.handleLaunch(params)}
                                    ref={this.child}
                                    preLoading={this.state.preLoading} />
                        }
                    </>
                }
            </React.Fragment>
        )
    }
}
export default Index;

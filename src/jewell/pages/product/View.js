import React from 'react';
import StatusBar from '../../components/layouts/StatusBar';
import Preloader from '../../components/layouts/Preloader';
import { Link } from 'react-router-dom';
import maleLogo from "../../theme/images/profile/male1.png";
import NewProductLogo from "../../theme/images/profile/no-image.jpg";



class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: { ...props.states },
            entities: [...props.entities],
            preLoading: props.preLoading,
            action: props.action,
            viewEncryptId: props.viewEncryptId,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.viewEncryptId);
        let stateObj = { ...this.state };
        stateObj.states = nextProps.states;

        if (this.state.viewEncryptId != nextProps.viewEncryptId) {
            stateObj.viewEncryptId = nextProps.viewEncryptId;
        }
        stateObj.preLoading = nextProps.preLoading;
        this.setState({ ...stateObj }, () => { });

        if (this.state.preLoading != nextProps.preLoading) {
            this.setState({ preLoading: nextProps.preLoading }, () => { });
        }
    }

    render() {
        const param = this.state.states.params
        console.log(param);

        let status = (param.status == 1) ? "Active" : "Deactive"

        let price = (param.price) ? "$" + param.price : "-"

        let profileImage = NewProductLogo;

        let otherImages = param.other_image;

        if (param.item_image.length > 0 && param.item_image[0].url != "") {
            profileImage = param.item_image[0].url;
        }


        return (
            <>
                <div className='content-div'>
                    <StatusBar status={this.state.states.status} onStatusClose={this.onStatusClose} />
                    {this.state.preLoading ? <Preloader /> : ""}

                    {/* <!--- content --> */}
                    <section className="py-1">
                        <div className="container">
                            <div className="row gx-5">
                                <aside className="col-lg-6">
                                    <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                        <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href={profileImage}>
                                            <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} width="350px" height="350px" className="rounded-4 fit" src={profileImage} alt={`${param.listLink} image cap`} />
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">

                                        {
                                            (otherImages.length > 0) ?
                                                otherImages.map(function (element, i) {
                                                    return (

                                                        <a data-fslightbox="mygalley" data-type="image" className="border mx-1 rounded-2 item-thumb" target="_blank" href={element.url}>
                                                            <img width="60" height="60" className="rounded-2" src={element.url} alt="thump images" />
                                                        </a>

                                                    )
                                                }) : ""
                                        }
                                    </div>
                                    {/* <!--- thumbs-wrap.// --> */}
                                    {/* <!--- gallery-wrap .end// --> */}
                                </aside>
                                <main className="col-lg-6 brown">
                                    <div className="ps-lg-3">
                                        <h4 className="title">
                                            <span className="h3">{param.name}</span><br></br>
                                            <span className="h6 green">{param.category_name}</span> - <span className="h5 grey">{param.note}</span>
                                        </h4>

                                        <div className="mb-3 mt-2">
                                            <span className="h6 grey text-medium">Price</span><br></br>
                                            <span className="h4">{price}</span>
                                        </div>

                                        <div className="mb-1 mt-2">
                                            <span className="h7 grey">Style Code:&nbsp;</span>
                                            <span className="h6">{param.code}</span>
                                        </div>

                                        <p>
                                            <span className="h6 black fw-normal"> {param.specification}</span>
                                        </p>



                                        <div className="row ">
                                            <h6 className='grey'>Other Descriptions:</h6>

                                            {
                                                (param.other_specifications.length > 0) ?
                                                    param.other_specifications.map(function (element, i) {
                                                        return (
                                                            <>
                                                                <dt className="col-6 pb-1 fw-normal">{element.label_name}:</dt>
                                                                <dd className="col-6 pb-1 fw-normal">{element.value}</dd>
                                                            </>
                                                        )
                                                    }) : ""
                                            }
                                        </div>

                                        <div className="row mt-2 fw-normal">

                                            <h6 className='grey'>Price breakdown:</h6>
                                            {
                                                (param.price_breakdowns.length > 0) ?
                                                    param.price_breakdowns.map(function (element, i) {
                                                        return (
                                                            <>
                                                                <dt className="col-6 pb-1 fw-normal">{element.label_name}:</dt>
                                                                <dd className="col-6 pb-1 fw-normal">{element.value}</dd>
                                                            </>
                                                        )
                                                    }) : ""
                                            }
                                        </div>

                                        {/* <a href="/#" className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </a>
                                        <a href="/#" className="btn btn-light border border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg"></i> Save </a> */}
                                    </div>
                                </main>
                                <main className="col-lg-12 brown">

                                    <p className="mt-3">
                                        <span className="h6 black fw-normal"> {param.description}</span>
                                    </p>

                                    <hr />


                                    <a href="/#" className="view__btn float-end"> Place Order </a>
                                </main>

                            </div>
                        </div >
                    </section >
                    {/* <!--- content --> */}
                </div >
            </>
        )
    }
}



export default React.forwardRef((props, ref) =>
    <View
        innerRef={ref} {...props}
    />);


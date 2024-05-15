import React from 'react';
import iconClose2 from "../../../theme/images/icons/icon-close2.png";
import Enquiry from '../../../pages/Enquiry';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FavouriteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enquiryTrigger: false,
            modalTrigger: (props.showModalTrigger) ? "show-header-cart" : "",
            adminInfo: { ...props.adminAuth.adminInfo },
            userInfo: { ...props.websiteAuth.userInfo }
        }
        this.clickClose = this.clickClose.bind(this);
        console.log(this.state.adminInfo);
    }

    componentDidMount() {
        this.setState({
            enquiryTrigger: true
        });
    }


    componentWillReceiveProps(newProps) {
        // console.log(newProps);
        this.setState({
            adminInfo: { ...newProps.adminAuth.adminInfo },
            userInfo: { ...newProps.websiteAuth.userInfo },
            modalTrigger: (newProps.showModalTrigger) ? "show-header-cart" : ""
        });
    }

    clickClose() {
        this.props.clickShowModalClose()
    }


    render() {
        return (
            <>
                <div className={`wrap-header-cart js-panel-cart ${this.state.modalTrigger}`}>
                    <div class="s-full js-hide-cart"></div>

                    <div class="header-cart flex-col-l p-l-20 p-r-5">
                        <div class="header-cart-title flex-w flex-sb-m p-b-8">
                            <span class="mtext-103 cl2">
                                Your Enquiry
                            </span>

                            <div class="fs-35 lh-10 cl2 p-l-40 pointer hov-cl1 trans-04 js-hide-cart" alt="CLOSE" onClick={this.clickClose}>
                                <i class="zmdi zmdi-close"></i>
                            </div>
                        </div>

                        <div class="header-cart-content flex-w js-pscroll">
                            {(this.state.enquiryTrigger) ?
                                <Enquiry pagination={true} /> : ""}

                            <div class="w-full">
                                <div class="header-cart-buttons flex-w w-full">
                                    <Link to={`/${this.state.adminInfo?.site_url}/enquiry`} params={{ pagination: false }}
                                        class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                                        onClick={this.clickClose}>
                                        Load More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, null)(FavouriteModal);
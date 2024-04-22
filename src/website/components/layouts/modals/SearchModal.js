import React from 'react';
import iconClose2 from "../../../theme/images/icons/icon-close2.png";
import FormImage from '../../../../jewell/components/forms/FormImage';

class SearchModal extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            modalTrigger: (props.showModalTrigger) ? "show-modal-search" : "",
            states: {
                submitted: false,
                submitDisabled: "",
                status: { show: false, type: 'success', msg: '' },
                errorsModalTrigger: "fade",
                errors: [],
                tabs: [{ id: "details", tab: "Details" }],
                params: {
                    search_word: "",
                },
                validations: {
                    hasSearch_wordRequired: true,
                },
                validate: false
            },
            entities: [
                {
                    name: "search_word", type: "text", colClass: '', className: "noborder", htmlFor: "Search", value: "",
                    label: "", placeholder: "Product Search",
                    validate: true,
                    tab: "details",
                    maxLength: 15,
                    validateOptions: [
                        {
                            rule: "required",
                            msg: "Search word is Required"
                        }]
                }
            ],
        }
        this.clickClose = this.clickClose.bind(this);
        this.clickSearchKey = this.clickSearchKey.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps);
        this.setState({
            modalTrigger: (newProps.showModalTrigger) ? "show-modal-search" : ""
        });
    }

    clickClose() {
        this.props.clickShowModalClose()
    }

    clickSearchKey() {
        let search_word = this.child.current.state.states.params.search_word;
        console.log(search_word);
        this.props.clickSearchKey(search_word)
    }

    render() {
        return (
            <>
                <div className={`modal-search-header flex-c-m trans-04 js-hide-modal-search ${this.state.modalTrigger}`}>
                    <div class="container-search-header">
                        <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                            <img src={iconClose2} alt="CLOSE" onClick={this.clickClose} />
                        </button>

                        <form class="wrap-search-header flex-w p-l-15">
                            <button class="flex-c-m trans-04"  onClick={this.clickSearchKey}>
                                <i class="zmdi zmdi-search"></i>
                            </button>
                            {/* <input class="plh3" type="text" name="search" placeholder="Search..." /> */}
                            < FormImage
                                entities={this.state.entities}
                                states={this.state.states}
                                action="form"
                                viewEncryptId=""
                                saveDataApiCall={(params) => this.clickSearchKey(params)}
                                ref={this.child}
                                preLoading={this.state.preLoading}
                                forSearchModel={true}
                            />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}


export default SearchModal;
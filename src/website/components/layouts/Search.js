const Search = () => {

    return (
        <>
            <div className="prod-search-head">
                <div className="form-div">
                    <div className="dis-flex form-control bg-white">
                        <button className="">
                            <i className="zmdi zmdi-search"></i>
                        </button>
                        <input className="bg-white ps-3"
                            type="text"
                            name="search_word"
                            // value={productParams.search_word}
                            // onChange={(newValue) => { handlesearch_word(newValue); }}
                            placeholder="Search" />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Search
